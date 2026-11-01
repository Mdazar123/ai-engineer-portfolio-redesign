# Azhar Mohammad — AI Engineer

Portfolio site for Azhar Mohammad, an AI Engineer Intern and Python backend engineer. It presents LLM applications, agentic workflows, RAG systems, and the projects built around them.

Live site: [ai-engineer-portfolio-mdazhar.vercel.app](https://ai-engineer-portfolio-mdazhar.vercel.app)

## Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS
- Deployed on Vercel

## Run locally

Requires Node.js and pnpm 12.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build
pnpm start
```

## Contact form

The contact form posts to `/api/contact`, which forwards the message through [FormSubmit](https://formsubmit.co) to azharmohammad2026@gmail.com. No environment variables are required.

The first submission from a new domain needs a one-time activation. FormSubmit emails an **Activate Form** link. After that link is opened, later messages are delivered. **Email me** opens a Gmail compose window as a fallback.

## Deploy

The site is a Next.js app on Vercel, connected to this repository. Pushing to `main` starts a new deployment. The contact route is a server function, so the project must stay on Vercel’s Next.js runtime rather than a static export.
