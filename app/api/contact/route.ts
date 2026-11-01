import { NextResponse } from 'next/server'

const TO = 'azharmohammad2026@gmail.com'
const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5
const recentHits = new Map<string, number[]>()

function text(value: unknown, max: number) {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/\s+/g, ' ').slice(0, max)
}

function messageText(value: unknown) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, 4000)
}

function limited(ip: string) {
  const now = Date.now()
  const hits = (recentHits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS)
  if (hits.length >= LIMIT) {
    recentHits.set(ip, hits)
    return true
  }
  hits.push(now)
  recentHits.set(ip, hits)
  return false
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Send a valid message.' }, { status: 400 })
  }

  const data = (body ?? {}) as Record<string, unknown>
  if (text(data.company, 80)) return NextResponse.json({ ok: true })

  const name = text(data.name, 80)
  const email = text(data.email, 120)
  const subject = text(data.subject, 140)
  const message = messageText(data.message)
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (!name || !subject || message.length < 2 || !emailOk) {
    return NextResponse.json(
      { error: 'Add your name, a real email, a subject, and a message.' },
      { status: 400 },
    )
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (limited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages just now. Try again in a few minutes.' },
      { status: 429 },
    )
  }

  const origin = request.headers.get('origin') || new URL(request.url).origin
  let payload: { success?: boolean | string; message?: string } | null = null
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TO)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: origin,
        Referer: `${origin}/`,
      },
      body: JSON.stringify({
        name,
        email,
        message: `${message}\n\n— ${name} <${email}>`,
        _subject: `Portfolio: ${subject}`,
        _replyto: email,
        _template: 'box',
        _captcha: 'false',
      }),
    })
    payload = await response.json()
  } catch {
    payload = null
  }

  const delivered = payload?.success === true || payload?.success === 'true'
  if (!delivered) {
    return NextResponse.json(
      { error: 'The message could not be delivered. Use Email me to write from Gmail instead.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
