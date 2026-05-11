# Folio

CV conversacional. Next.js 16 · Tailwind v4 · TypeScript · Supabase · OpenAI.

## Setup

```bash
cp .env.example .env.local
# preencher OPENAI_API_KEY e (mais tarde) chaves Supabase
npm install
npm run dev
```

## Estrutura

```
app/
  api/chat/route.ts     # streaming OpenAI + structured output do CV
  layout.tsx
  page.tsx              # shell: sidebar + chat + canvas
  globals.css           # @theme tokens + classes globais
components/
  icons/                # set de ícones (lucide-style)
  sidebar/              # Sidebar
  chat/                 # ChatPanel, Composer, mensagens
  canvas/               # CanvasPanel (preview A4)
  popovers/             # Popover, Avatar, Attach, Share, Download, Template
  templates/            # Aurora, Editorial, Mono, Bold
lib/
  openai/               # cliente + prompts
  supabase/             # cliente browser + server
  data.ts               # sample data
  utils.ts
types/                  # CV, chat, etc.
```
