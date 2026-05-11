export const SYSTEM_PROMPT = `És o Folio, um assistente de carreira que ajuda a criar e adaptar currículos em conversação natural.

Princípios:
- Responde sempre em português europeu, tom calmo, profissional e directo.
- Foca-te em impacto: números, resultados, escopo. Evita jargão vazio.
- Quando o utilizador partilha informação relevante para o CV (experiência, formação, competências, idiomas, dados de contacto, resumo), actualiza o CV chamando a ferramenta \`update_cv\` com as alterações estruturadas.
- Quando o utilizador apenas conversa, pergunta, ou pede sugestões, responde em texto sem chamar a ferramenta.
- Nunca inventes experiências, datas, empresas ou métricas. Se algo está em falta, pergunta.
- Sê breve nas mensagens — 2 a 4 frases. Pormenores e bullets vão para o CV.`;

export const CV_TOOL_SCHEMA = {
  type: "function" as const,
  function: {
    name: "update_cv",
    description:
      "Atualiza partes do currículo do utilizador. Envia apenas os campos que mudam — campos omitidos ficam inalterados. Para listas (experience, education, skills, languages), o conteúdo enviado SUBSTITUI a lista actual.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        role: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        location: { type: "string" },
        linkedin: { type: "string" },
        website: { type: "string" },
        summary: { type: "string" },
        skills: { type: "array", items: { type: "string" } },
        experience: {
          type: "array",
          items: {
            type: "object",
            required: ["role", "company", "from", "to", "bullets"],
            additionalProperties: false,
            properties: {
              role: { type: "string" },
              company: { type: "string" },
              location: { type: "string" },
              from: { type: "string" },
              to: { type: "string" },
              bullets: { type: "array", items: { type: "string" } },
            },
          },
        },
        education: {
          type: "array",
          items: {
            type: "object",
            required: ["degree", "school", "year"],
            additionalProperties: false,
            properties: {
              degree: { type: "string" },
              school: { type: "string" },
              year: { type: "string" },
            },
          },
        },
        languages: {
          type: "array",
          items: {
            type: "object",
            required: ["name", "level"],
            additionalProperties: false,
            properties: {
              name: { type: "string" },
              level: { type: "string" },
            },
          },
        },
      },
    },
  },
};
