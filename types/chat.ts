export type ChatAttachmentKind = "doc" | "photo" | "jd" | "linkedin";
export type MessageAttachmentKind = "pdf" | "image";

export type ChatAttachment = {
  kind: ChatAttachmentKind;
  name: string;
  size: string;
};

export type MessageAttachment = {
  kind: MessageAttachmentKind;
  name: string;
  size: string;
};

export type ChatAction = { label: string; icon: string };

export type Message =
  | {
      role: "user";
      body: string;
      attachments?: MessageAttachment[];
    }
  | {
      role: "ai";
      body: string;
      meta?: string;
      actions?: ChatAction[];
      suggestions?: string[];
    }
  | {
      role: "ai-inline";
      kind: "ats";
      body: string;
      score: number;
      matched: string[];
      missing: string[];
    };

export type RecentChat = {
  id: string;
  title: string;
  when: string;
  pinned?: boolean;
  active?: boolean;
};
