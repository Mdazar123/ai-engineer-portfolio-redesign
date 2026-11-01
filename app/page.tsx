'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Mail, Menu, X } from 'lucide-react'

const projects = [
  {
    title: 'RepoMind',
    type: 'AI / GENAI',
    description: 'A multi-agent AI code debugger that analyzes repositories, surfaces likely issues, and supports structured debugging workflows.',
    stack: ['Python', 'FastAPI', 'LLMs', 'Multi-agent'],
    image: '/previews/repomind.svg',
    workflow: 'Repository Input → Code Analysis → Agent Reasoning → Findings → Suggested Fixes',
    links: [
      { label: 'View project', href: 'https://mdazar123.github.io/repomind/' },
      { label: 'Source', href: 'https://github.com/Mdazar123/repomind' },
    ],
  },
  {
    title: 'PixelPilot AI',
    type: 'AI / GENAI',
    description: 'An interactive computer vision and multimodal AI workbench combining OpenCV processing, detection, segmentation, OCR, VLM question answering, and structured LLM analysis.',
    stack: ['Python', 'FastAPI', 'OpenCV', 'PyTorch', 'Next.js', 'VLMs'],
    image: '/previews/pixelpilot.svg',
    workflow: 'Image Upload → OpenCV / Detection / OCR → Segmentation + VLM → LLM Report',
    links: [
      { label: 'View project', href: 'https://frontend-umber-eight-47.vercel.app' },
      { label: 'Source', href: 'https://github.com/Mdazar123/CV_Project_PixetPoiletAI' },
    ],
  },
  {
    title: 'AskRGUBot',
    type: 'AI / GENAI',
    description: 'A conversational university assistant connecting a React interface to a Python API and LLM workflow.',
    stack: ['React', 'FastAPI', 'LangChain', 'Groq'],
    image: '/previews/askrgu.svg',
    workflow: 'React UI → FastAPI → LangChain workflow → LLM provider',
    links: [{ label: 'View on GitHub', href: 'https://github.com/Mdazar123/AskRguBot' }],
  },
  {
    title: 'BillSplitr',
    type: 'FULL STACK',
    description: 'A real-time group expense tracker designed to make shared bills simple to record, understand, and settle.',
    stack: ['Next.js', 'Firebase', 'Tailwind'],
    image: '/previews/billsplitr.svg',
    workflow: 'Expense input → Shared balances → Settlement summary → User-facing experience',
    links: [
      { label: 'View demo', href: 'https://billsplitr.vercel.app/' },
      { label: 'Source', href: 'https://github.com/Mdazar123/billsplitr' },
    ],
  },
]

const skillGroups = [
  ['AI / LLM ENGINEERING', 'LLMs', 'Generative AI', 'RAG', 'AI Agents', 'Agentic Workflows', 'Prompt Engineering', 'Embeddings', 'Vector Search', 'NLP', 'Multimodal AI', 'Computer Vision'],
  ['AI TOOLS & PLATFORMS', 'LangChain', 'LangGraph', 'Hugging Face', 'OpenAI APIs', 'Groq', 'OpenCV', 'PyTorch', 'Pipecat', 'Simli'],
  ['BACKEND & APIs', 'Python', 'FastAPI', 'REST APIs', 'Pydantic', 'AsyncIO', 'API Integration'],
  ['DATA & SYSTEMS', 'MongoDB', 'SQL', 'Azure Cosmos DB', 'Firebase', 'Vector Search', 'Docker'],
  ['PRODUCT DEVELOPMENT', 'React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'Git', 'GitHub'],
]

const aiTools = [
  ['OA', 'OpenAI'],
  ['LC', 'LangChain'],
  ['LG', 'LangGraph'],
  ['HF', 'Hugging Face'],
  ['GQ', 'Groq'],
  ['PT', 'PyTorch'],
  ['CV', 'OpenCV'],
  ['FA', 'FastAPI'],
]

const inbox = 'azhar.md.dev@gmail.com'
const web3formsKey = 'd8d65973-d389-4b89-868a-e590a8229f07'

function gmailUrl(subject = '', body = '') {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: inbox })
  if (subject) params.set('su', subject)
  if (body) params.set('body', body.slice(0, 1800))
  return `https://mail.google.com/mail/?${params.toString()}`
}

const mapNodes = [
  { label: 'LLM', angle: -90 },
  { label: 'Retrieval', angle: -30 },
  { label: 'APIs', angle: 30 },
  { label: 'Automation', angle: 90 },
  { label: 'Data', angle: 150 },
  { label: 'Agents', angle: 210 },
]

function SystemsMap() {
  return (
    <div className="systems-map" aria-hidden="true">
      <div className="map-stage">
        <div className="map-ring" />
        <div className="map-ring ring-outer" />
        <svg className="map-lines" viewBox="0 0 100 100">
          {mapNodes.map((node) => {
            const radians = (node.angle * Math.PI) / 180
            const x = 50 + Math.cos(radians) * 38
            const y = 50 + Math.sin(radians) * 38
            return <line key={node.label} x1="50" y1="50" x2={x} y2={y} />
          })}
        </svg>
        <div className="map-core">
          <span className="mono">ORCHESTRATE</span>
          <strong>AI systems</strong>
        </div>
        {mapNodes.map((node) => {
          const radians = (node.angle * Math.PI) / 180
          const left = 50 + Math.cos(radians) * 40
          const top = 50 + Math.sin(radians) * 40
          return (
            <div key={node.label} className="map-node" style={{ left: `${left}%`, top: `${top}%` }}>
              <span>{node.label}</span>
            </div>
          )
        })}
      </div>
      <ul className="map-pills">
        {mapNodes.map((node) => (
          <li key={node.label}>{node.label}</li>
        ))}
      </ul>
    </div>
  )
}

function useReveal(dependency: string) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (reduce) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -32px 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [dependency])
}

function useScrollMotion() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    const header = document.querySelector('.site-header')
    const bar = document.querySelector<HTMLElement>('.scroll-progress')
    const timeline = document.querySelector<HTMLElement>('.timeline')
    let frame = 0

    const update = () => {
      const scrolled = window.scrollY
      const max = root.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0
      bar?.style.setProperty('transform', `scaleX(${progress})`)
      header?.classList.toggle('is-scrolled', scrolled > 8)

      if (reduce || !timeline) return
      const rect = timeline.getBoundingClientRect()
      const start = scrolled + rect.top - window.innerHeight * 0.75
      const end = scrolled + rect.bottom - window.innerHeight * 0.35
      const span = Math.max(end - start, 1)
      const line = Math.min(1, Math.max(0, (scrolled - start) / span))
      timeline.style.setProperty('--line-progress', line.toFixed(3))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('ALL')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formError, setFormError] = useState('')
  const visibleProjects = projects.filter((project) =>
    filter === 'ALL' ||
    (filter === 'BACKEND'
      ? project.stack.some((technology) => ['Python', 'FastAPI', 'MongoDB'].includes(technology))
      : project.type === filter),
  )
  const closeMenu = () => setMenuOpen(false)

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const subject = String(data.get('subject') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    setStatus('sending')
    setFormError('')
    if (String(data.get('company') ?? '').trim()) {
      setStatus('sent')
      return
    }
    data.delete('company')
    data.set('subject', subject ? `Portfolio: ${subject}` : 'Portfolio message')
    data.set('message', `${message}\n\n— ${name} <${email}>`)
    data.append('access_key', web3formsKey)
    data.append('from_name', 'Azhar Portfolio')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const payload = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null
      if (!payload?.success) {
        setStatus('error')
        setFormError(payload?.message || 'The message could not be delivered. Use Email me to write from Gmail instead.')
        return
      }
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
      setFormError('The message could not be delivered. Check your connection and try again.')
    }
  }

  useReveal(filter)
  useScrollMotion()

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="site-header">
        <a href="#top" className="brand" onClick={closeMenu}>
          <img src="/icon.svg" alt="" width={32} height={32} />
          <small>AI ENGINEER</small>
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav id="site-nav" className={menuOpen ? 'open' : ''}>
          {['About', 'Experience', 'Projects', 'Skills'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <section className="hero section-pad" id="top">
        <div className="hero-parallax">
        <div className="hero-copy">
          <div className="eyebrow"><span className="signal" />AI ENGINEERING <i>·</i> PYTHON <i>·</i> GENAI</div>
          <h1>Building intelligent<br /><em>systems</em> that solve<br />real problems.</h1>
          <p className="hero-text">I&apos;m Azhar Mohammad, an AI Engineer Intern and Python Backend Engineer building LLM-powered applications, agentic workflows, RAG systems, and enterprise automation.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore my work <ArrowDownRight size={17} /></a>
            <a className="button button-ghost" href="#contact">Contact me <ArrowUpRight size={15} /></a>
          </div>
          <div className="hero-meta">
            <span><b>Based in</b>Hyderabad, India</span>
            <span><b>Currently</b>AI Systems · Centific</span>
            <span><b>Focus</b>Backend + intelligent products</span>
          </div>
        </div>
        </div>
        <div className="map-parallax">
          <SystemsMap />
        </div>
      </section>

      <section className="tool-strip section-pad" aria-labelledby="ai-tools-label">
        <p id="ai-tools-label" className="mono">AI TOOLS</p>
        <ul>
          {aiTools.map(([mark, name]) => (
            <li key={name}>
              <span aria-hidden="true">{mark}</span>
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className="section-pad about-section" id="about">
        <div className="section-kicker" data-reveal><span>01</span> / ABOUT</div>
        <div className="about-grid">
          <div data-reveal="left"><h2>Engineer by mindset.<br /><em>Builder by habit.</em></h2></div>
          <div className="about-content" data-reveal="right">
            <p className="lead">I enjoy designing backend services, integrating AI capabilities, and turning complex workflows into software people can actually use.</p>
            <p>My work sits at the intersection of practical software engineering and Generative AI — from Python APIs and retrieval pipelines to agentic workflows and enterprise automation. I care about clear interfaces, dependable integrations, and understanding the trade-offs behind a system.</p>
            <div className="principles">
              <span className="mono">HOW I APPROACH ENGINEERING</span>
              <ol>
                <li>Understand the problem before choosing the technology.</li>
                <li>Make integrations reliable and observable.</li>
                <li>Consider security, latency, cost, and maintainability.</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="about-cards">
          <article data-reveal="up" style={{ ['--reveal-delay' as string]: '0ms' }}><span className="card-index">01</span><h3>AI Systems</h3><p>LLM applications, retrieval pipelines, and agentic workflows built around real use cases.</p></article>
          <article data-reveal="up" style={{ ['--reveal-delay' as string]: '80ms' }}><span className="card-index">02</span><h3>Backend Engineering</h3><p>APIs, asynchronous services, data workflows, and integrations that hold a product together.</p></article>
          <article data-reveal="up" style={{ ['--reveal-delay' as string]: '160ms' }}><span className="card-index">03</span><h3>Product Development</h3><p>Turning ideas into usable applications with modern web technologies and thoughtful UX.</p></article>
        </div>
      </section>

      <section className="section-pad experience-section" id="experience">
        <div className="section-kicker" data-reveal><span>02</span> / EXPERIENCE</div>
        <div className="section-heading-row" data-reveal>
          <h2>Where I&apos;ve been<br /><em>putting it to work.</em></h2>
          <p>Early-career experience across enterprise automation, backend development, and applied AI.</p>
        </div>
        <div className="timeline">
          <article className="timeline-item" data-reveal="left">
            <div className="timeline-date mono">JUN 2026 — PRESENT</div>
            <div className="timeline-marker"><span /></div>
            <div className="timeline-body">
              <div className="company-line"><h3>Centific</h3><span>Hyderabad, India</span></div>
              <h4>AI Engineer Intern <i>— AI Engineering</i></h4>
              <p>Building Python-based AI solutions and backend services for enterprise automation, retrieval, and conversational AI experiences.</p>
              <ul>
                <li>Built AI solutions using FastAPI, LLMs, and agentic workflows.</li>
                <li>Developed an automated Distribution List provisioning service for IT helpdesk workflows.</li>
                <li>Built conversational and avatar-based AI experiences with Pipecat and Simli.</li>
                <li>Developed RAG-based solutions using vector databases and Python architectures.</li>
              </ul>
              <div className="tags"><span>PYTHON</span><span>FASTAPI</span><span>LLMS</span><span>RAG</span></div>
            </div>
          </article>
          <article className="timeline-item" data-reveal="left">
            <div className="timeline-date mono">JAN 2026 — MAY 2026</div>
            <div className="timeline-marker"><span /></div>
            <div className="timeline-body">
              <div className="company-line"><h3>Provakil</h3><span>Pune, India</span></div>
              <h4>SDE Intern <i>— Backend Development</i></h4>
              <p>Worked on backend functionality and database-driven workflows for legal-tech applications.</p>
              <ul>
                <li>Developed backend functionality using Python and MongoDB.</li>
                <li>Worked on data handling and workflows for client case records.</li>
              </ul>
              <div className="tags"><span>PYTHON</span><span>MONGODB</span><span>BACKEND</span></div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-pad projects-section" id="projects">
        <div className="section-kicker" data-reveal><span>03</span> / SELECTED WORK</div>
        <div className="section-heading-row" data-reveal>
          <h2>Projects built<br /><em>beyond the tutorial.</em></h2>
          <div className="filter-row" role="group" aria-label="Filter projects">
            {['ALL', 'AI / GENAI', 'BACKEND', 'FULL STACK'].map((item) => (
              <button key={item} className={filter === item ? 'active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>
        </div>
        <div className="projects-grid">
          {visibleProjects.map((project, index) => (
            <article className="project-card" key={project.title} data-reveal="up" style={{ ['--reveal-delay' as string]: `${index * 70}ms` }}>
              <div className="project-preview">
                <img src={project.image} alt="" />
              </div>
              <div className="project-info">
                <div className="project-top"><span className="mono">0{index + 1} / {project.type}</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="project-links">
                  {project.links.map((link, linkIndex) => (
                    <a key={link.href} className={`button ${linkIndex === 0 ? 'button-primary' : 'button-ghost'}`} href={link.href} target="_blank" rel="noreferrer">
                      {link.label} <ArrowUpRight size={15} />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
                <button className="details-toggle" aria-expanded={expanded === project.title} onClick={() => setExpanded(expanded === project.title ? null : project.title)}>
                  {expanded === project.title ? 'Hide details' : 'View technical details'} <ChevronDown size={15} className={expanded === project.title ? 'rotated' : ''} />
                </button>
                {expanded === project.title && (
                  <div className="project-details">
                    <span className="mono">WORKFLOW</span>
                    <p>{project.workflow}</p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad skills-section" id="skills">
        <div className="section-kicker" data-reveal><span>04</span> / TECHNICAL TOOLKIT</div>
        <div className="skills-layout">
          <h2 data-reveal="left">The skills and tools I use to<br /><em>build useful AI products.</em></h2>
          <div className="skills-groups">
            {skillGroups.map((group, index) => (
              <div className="skill-group" key={group[0]} data-reveal="right" style={{ ['--reveal-delay' as string]: `${index * 60}ms` }}>
                <span className="mono">{group[0]}</span>
                <div>{group.slice(1).map((skill) => <span key={skill}>{skill}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad recognition-section">
        <div className="section-kicker" data-reveal><span>05</span> / RECOGNITION</div>
        <div className="recognition-grid">
          <div data-reveal="left">
            <h2>Curiosity is a<br /><em>competitive edge.</em></h2>
            <p>Proof points from building, learning, and showing up for hard problems.</p>
          </div>
          <div className="recognition-list">
            <article data-reveal="right">
              <span className="recognition-year mono">2026</span>
              <div>
                <h3>Centific Premier Hackathon 2.0</h3>
                <p>Winner — AI Engineering track. Recognized for innovation, problem-solving, and technical work during a 14-day national hackathon.</p>
              </div>
              <Check />
            </article>
            <article data-reveal="right">
              <span className="recognition-year mono">PROGRAM</span>
              <div>
                <h3>Aspire Leaders Program</h3>
                <p>Completed a leadership development program associated with Aspire Institute.</p>
              </div>
              <Check />
            </article>
            <article data-reveal="right">
              <span className="recognition-year mono">TRAINING</span>
              <div>
                <h3>Generative AI with LangChain &amp; Hugging Face</h3>
                <p>Training in building Generative AI applications using LangChain, LLMs, and Hugging Face APIs.</p>
              </div>
              <Check />
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad contact-section" id="contact">
        <div className="contact-panel">
          <div className="section-kicker"><span>06</span> / LET&apos;S CONNECT</div>
          <div className="contact-grid">
            <div>
              <h2>Have an interesting<br /><em>problem to solve?</em></h2>
              <p>I&apos;m interested in building useful AI systems, reliable backend services, and intelligent applications. If you&apos;re hiring or working on something interesting, I&apos;d be happy to connect.</p>
              <div className="contact-cta">
                <a className="button button-primary" href={gmailUrl()} target="_blank" rel="noreferrer">Email me <Mail size={16} /></a>
                <a className="button button-ghost" href="https://linkedin.com/in/Azharmohammad" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /><span className="sr-only"> (opens in a new tab)</span></a>
              </div>
              <div className="contact-links">
                <a href={gmailUrl()} target="_blank" rel="noreferrer"><Mail size={16} /> {inbox}</a>
                <a href="https://github.com/Mdazar123" target="_blank" rel="noreferrer"><span aria-hidden="true">GH</span> GitHub</a>
              </div>
            </div>
            <form onSubmit={sendMessage}>
              {status === 'sent' ? (
                <div className="success-state" role="status">
                  <Check size={32} />
                  <h3>Message sent.</h3>
                  <p>Thanks for writing. Your note was delivered to {inbox}.</p>
                </div>
              ) : (
                <>
                  <label>Name<input required name="name" autoComplete="name" placeholder="Your name" disabled={status === 'sending'} /></label>
                  <label>Email<input required type="email" name="email" autoComplete="email" placeholder="you@company.com" disabled={status === 'sending'} /></label>
                  <label>Subject<input required name="subject" placeholder="Let's build something useful" disabled={status === 'sending'} /></label>
                  <label>Message<textarea required name="message" placeholder="Tell me a little about the problem..." rows={4} disabled={status === 'sending'} /></label>
                  <label className="honey" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
                  {status === 'error' && <p className="form-error" role="alert">{formError}</p>}
                  <button className="button button-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send message'} <ArrowUpRight size={17} /></button>
                  <small className="form-note">This sends the message straight to Azhar&apos;s inbox.</small>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <a href="#top" className="brand"><img src="/icon.svg" alt="" width={32} height={32} /><small>AI ENGINEER</small></a>
        <p className="mono">DESIGNED &amp; BUILT BY AZHAR MOHAMMAD · 2026</p>
        <div>
          <a href="https://github.com/Mdazar123" target="_blank" rel="noreferrer">GitHub<span className="sr-only"> (opens in a new tab)</span></a>
          <a href="https://linkedin.com/in/Azharmohammad" target="_blank" rel="noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
        </div>
      </footer>
    </main>
  )
}
