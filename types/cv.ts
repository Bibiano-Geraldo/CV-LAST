export type CVExperience = {
  role: string;
  company: string;
  location: string;
  from: string;
  to: string;
  bullets: string[];
};

export type CVEducation = {
  degree: string;
  school: string;
  year: string;
};

export type CVLanguage = {
  name: string;
  level: string;
};

export type CVAward = { title: string; body: string };
export type CVProject = { name: string; body: string };

export type CV = {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  photo: string | null;
  summary: string;
  skills: string[];
  experience: CVExperience[];
  education: CVEducation[];
  languages: CVLanguage[];
  extras: {
    awards: CVAward[];
    projects: CVProject[];
  };
};

export type TemplateId = "aurora" | "editorial" | "mono" | "bold";
