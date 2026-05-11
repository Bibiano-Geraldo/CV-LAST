import type { CV, TemplateId } from "@/types/cv";
import type { Message, RecentChat } from "@/types/chat";

export type SavedCV = {
  id: string;
  name: string;
  template: TemplateId;
  accent: string;
  updatedAt: string;
  pages: number;
  starred?: boolean;
  tag?: string;
};

export const SAMPLE_CVS: SavedCV[] = [
  { id: "cv1", name: "CV — Lead Designer @ Linear",   template: "aurora",    accent: "#1A6D75", updatedAt: "Há 2 minutos",   pages: 2, starred: true,  tag: "Adaptado · Linear" },
  { id: "cv2", name: "CV principal · Português",       template: "editorial", accent: "#1A6D75", updatedAt: "Ontem",           pages: 2, starred: true },
  { id: "cv3", name: "CV — English version",           template: "mono",      accent: "#3B4A6B", updatedAt: "Há 3 dias",       pages: 2, tag: "Traduzido · EN" },
  { id: "cv4", name: "Adaptação Glovo PM",             template: "bold",      accent: "#7A4F22", updatedAt: "Há 4 dias",       pages: 2 },
  { id: "cv5", name: "Versão executiva (1 página)",    template: "mono",      accent: "#1a1816", updatedAt: "Semana passada",  pages: 1 },
  { id: "cv6", name: "CV académico — Fulbright",       template: "editorial", accent: "#9A3B3B", updatedAt: "Há 12 dias",      pages: 3 },
];

export const SAMPLE_CV: CV = {
  name: "Aïcha Mondlane",
  role: "Senior Product Designer",
  email: "aicha.mondlane@proton.me",
  phone: "+258 84 612 0394",
  location: "Maputo, Moçambique",
  linkedin: "linkedin.com/in/amondlane",
  website: "aicha.work",
  photo: null,
  summary:
    "Designer de produto com 8 anos a desenhar sistemas financeiros e ferramentas internas. Especialista em traduzir investigação em interfaces que reduzem fricção em fluxos complexos. Lidero por exemplo — entrego, documento e instalo nas equipas.",
  skills: [
    "Design Systems", "Figma", "Prototipagem", "Pesquisa qualitativa",
    "Workshops de descoberta", "Web (React/Tailwind)", "Acessibilidade WCAG",
    "Mentoria", "Inglês fluente", "Português nativo",
  ],
  experience: [
    {
      role: "Senior Product Designer",
      company: "Standard Bank — Digital Channels",
      location: "Joanesburgo (remoto)",
      from: "2022", to: "Presente",
      bullets: [
        "Liderou o redesign do app de PME — adopção +38% em 6 meses e NPS de 24 para 51.",
        "Estabeleceu o design system Compass — 84 componentes adoptados em 6 produtos.",
        "Mentora de 4 designers júnior; criou o programa de portfolios internos.",
      ],
    },
    {
      role: "Product Designer",
      company: "Moove (ex-Kovi)",
      location: "Lisboa",
      from: "2019", to: "2022",
      bullets: [
        "Desenhou o motor de aprovação de frota — tempo de decisão caiu de 4 dias para 9 horas.",
        "Conduziu 60+ entrevistas com motoristas em PT, BR e ZA; mapeou 3 personas centrais.",
        "Colaborou com engenharia para enviar 14 releases trimestrais sem regressões críticas.",
      ],
    },
    {
      role: "UX Designer",
      company: "Whitesmith",
      location: "Coimbra",
      from: "2017", to: "2019",
      bullets: [
        "Trabalhou em equipas de 3 com 9 clientes B2B SaaS em healthcare e logística.",
        "Definiu o processo de discovery interno — kit de 12 templates reutilizáveis.",
      ],
    },
  ],
  education: [
    { degree: "MA em Interaction Design", school: "Domus Academy, Milão", year: "2017" },
    { degree: "Licenciatura em Comunicação Visual", school: "FBAUL", year: "2015" },
  ],
  languages: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Fluente (C1)" },
    { name: "Italiano", level: "Profissional (B2)" },
  ],
  extras: {
    awards: [
      { title: "Designer do ano", body: "Standard Bank, 2023" },
      { title: "Workshop facilitator", body: "UX Lisbon 2022 — 80 participantes" },
    ],
    projects: [
      { name: "Folio kit", body: "Sistema de design open-source para fintech — 1.2k estrelas no GitHub." },
      { name: "Compass v2", body: "Repensou tokens semânticos e dark mode para 6 produtos internos." },
    ],
  },
};

export const RECENT_CHATS: RecentChat[] = [
  { id: "c1", title: "CV para Lead Designer @ Linear", when: "Há 2 minutos", pinned: true, active: true },
  { id: "c2", title: "Carta — Vercel Design Engineer", when: "Ontem", pinned: true },
  { id: "c3", title: "CV traduzido para inglês", when: "Há 3 dias" },
  { id: "c4", title: "Adaptação para Glovo PM", when: "Há 4 dias" },
  { id: "c5", title: "Versão executiva (1 página)", when: "Semana passada" },
  { id: "c6", title: "CV académico — bolsa Fulbright", when: "Há 12 dias" },
  { id: "c7", title: "Carta motivação MIT Media Lab", when: "Há 18 dias" },
  { id: "c8", title: "Primeiro rascunho", when: "Há 1 mês" },
];

export const QUICK_PROMPTS = [
  { icon: "FileText", label: "Criar um currículo do zero", hint: "começamos por uma conversa curta" },
  { icon: "Briefcase", label: "Adaptar o meu CV a uma vaga", hint: "cola o link ou o anúncio" },
  { icon: "Languages", label: "Traduzir CV para outro idioma", hint: "mantemos formatação e nuances" },
  { icon: "Wand", label: "Escrever uma carta de apresentação", hint: "tom à medida da empresa" },
] as const;

export const SAMPLE_THREAD: Message[] = [
  {
    role: "ai",
    body:
      "Olá Aïcha. Encontrei o anúncio que partilhaste — *Lead Product Designer* na Linear, equipa de plataforma. Vou começar a adaptar o teu currículo agora e digo-te onde precisamos de te focar.",
    meta: "há 4 minutos",
  },
  {
    role: "user",
    body: "Boa. Podes destacar o trabalho de design system que fiz no Standard Bank? Eles dão muito peso a isso.",
    attachments: [
      { kind: "pdf", name: "Linear — Job description.pdf", size: "204 KB" },
      { kind: "image", name: "headshot-2024.jpg", size: "1.2 MB" },
    ],
  },
  {
    role: "ai",
    body:
      "Feito. Reescrevi o bullet do Compass para liderar com **impacto** (84 componentes, 6 produtos) e movi-o para o topo da experiência. Também tirei a entrada da Whitesmith — para uma vaga sénior fica a poluir.",
    actions: [
      { label: "Ver alterações", icon: "Eye" },
      { label: "Reverter", icon: "RotateCw" },
    ],
  },
  {
    role: "ai-inline",
    kind: "ats",
    body: "Análise rápida vs descrição da vaga",
    score: 87,
    matched: ["Design system", "Componentes", "Sénior", "Mentoria", "Prototipagem", "Figma"],
    missing: ["TypeScript", "Linear app", "B2B SaaS"],
  },
  {
    role: "user",
    body: "Posso adicionar algo sobre o lado técnico? Trabalhei em React no Folio kit.",
  },
  {
    role: "ai",
    body:
      "Sim — sugiro um bullet curto em *Projects*: «Folio kit — design system open-source escrito em React + TypeScript, usado por 9 startups». Posso adicionar?",
    suggestions: ["Adiciona", "Reformula mais curto", "Não, deixa estar"],
  },
];
