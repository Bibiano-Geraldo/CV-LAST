import type { SVGProps, ReactNode } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  w?: number;
  d?: string;
  children?: ReactNode;
};

export function Icon({ d, size = 18, w = 1.6, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {d ? <path d={d} /> : children}
    </svg>
  );
}

export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 3.5h9.5L19 8v12.5a0 0 0 0 1 0 0H5a0 0 0 0 1 0 0V3.5Z" fill="var(--brand)" />
      <path d="M14.5 3.5V8H19" fill="var(--lime)" />
      <path d="M8 12.5h8M8 15.5h5.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

type P = Omit<IconProps, "d" | "children">;

export const I = {
  Logo: LogoMark,
  Menu:        (p: P) => <Icon {...p}><path d="M4 7h16M4 12h16M4 17h10" /></Icon>,
  PanelLeft:   (p: P) => <Icon {...p}><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M9 4v16" /></Icon>,
  Plus:        (p: P) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>,
  Minus:       (p: P) => <Icon {...p}><path d="M5 12h14" /></Icon>,
  Search:      (p: P) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>,
  Send:        (p: P) => <Icon {...p}><path d="M5 12 19 5l-3 14-4-6-7-1Z" /></Icon>,
  ArrowUp:     (p: P) => <Icon {...p}><path d="M12 19V5M5 12l7-7 7 7" /></Icon>,
  Paperclip:   (p: P) => <Icon {...p}><path d="M21 10.5 12.5 19a5 5 0 1 1-7-7l9-9a3.5 3.5 0 1 1 5 5L11.5 16a2 2 0 1 1-3-3l7.5-7.5" /></Icon>,
  Image:       (p: P) => <Icon {...p}><rect x="3" y="4" width="18" height="16" rx="2.5" /><circle cx="9" cy="10" r="1.8" /><path d="m4 17 4.5-4.5 5 5L17 14l3 3" /></Icon>,
  FileText:    (p: P) => <Icon {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></Icon>,
  Briefcase:   (p: P) => <Icon {...p}><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7M3 13h18" /></Icon>,
  User:        (p: P) => <Icon {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" /></Icon>,
  Settings:    (p: P) => <Icon {...p}><circle cx="12" cy="12" r="2.6" /><path d="M19.4 14.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></Icon>,
  Sun:         (p: P) => <Icon {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Icon>,
  Moon:        (p: P) => <Icon {...p}><path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10Z" /></Icon>,
  Bell:        (p: P) => <Icon {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9ZM10 21a2 2 0 0 0 4 0" /></Icon>,
  Help:        (p: P) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5v.7M12 17h.01" /></Icon>,
  LogOut:      (p: P) => <Icon {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></Icon>,
  Sparkle:     (p: P) => <Icon {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></Icon>,
  Sparkles:    (p: P) => <Icon {...p}><path d="M9 3v3M9 14v3M3 8.5h3M12 8.5h3M5 5l2 2M11 12l2 2M5 12l2-2M11 5l2-2M18 14l1.2 2.6L22 18l-2.8 1.4L18 22l-1.2-2.6L14 18l2.8-1.4L18 14Z" /></Icon>,
  Download:    (p: P) => <Icon {...p}><path d="M12 4v12M6 12l6 6 6-6M4 20h16" /></Icon>,
  Share:       (p: P) => <Icon {...p}><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8 11 8-4.5M8 13l8 4.5" /></Icon>,
  Link:        (p: P) => <Icon {...p}><path d="M10 13a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 11a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></Icon>,
  Copy:        (p: P) => <Icon {...p}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" /></Icon>,
  Check:       (p: P) => <Icon {...p}><path d="m5 12 4.5 4.5L19 7" /></Icon>,
  Close:       (p: P) => <Icon {...p}><path d="M6 6l12 12M18 6 6 18" /></Icon>,
  ChevronDown: (p: P) => <Icon {...p}><path d="m6 9 6 6 6-6" /></Icon>,
  ChevronRight:(p: P) => <Icon {...p}><path d="m9 6 6 6-6 6" /></Icon>,
  ChevronUp:   (p: P) => <Icon {...p}><path d="m6 15 6-6 6 6" /></Icon>,
  Dots:        (p: P) => <Icon {...p}><circle cx="5" cy="12" r="1.4" fill="currentColor" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /><circle cx="19" cy="12" r="1.4" fill="currentColor" /></Icon>,
  Pencil:      (p: P) => <Icon {...p}><path d="m4 20 4-1 11-11a2.5 2.5 0 0 0-3.5-3.5L4.5 15.5 4 20Z" /></Icon>,
  Trash:       (p: P) => <Icon {...p}><path d="M4 7h16M10 7V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13M10 11v6M14 11v6" /></Icon>,
  Globe:       (p: P) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></Icon>,
  Target:      (p: P) => <Icon {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></Icon>,
  Gauge:       (p: P) => <Icon {...p}><path d="M12 14V7M12 14l5-2.5M3.5 14a9 9 0 1 1 17 0" /></Icon>,
  Layers:      (p: P) => <Icon {...p}><path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 18l9 5 9-5" /></Icon>,
  Palette:     (p: P) => <Icon {...p}><path d="M12 3a9 9 0 1 0 0 18 2.5 2.5 0 0 0 1.8-4.2 1.5 1.5 0 0 1 1-2.5h2.2A4 4 0 0 0 21 10.4 9 9 0 0 0 12 3Z" /><circle cx="7.5" cy="11" r="1" fill="currentColor" /><circle cx="9.5" cy="7" r="1" fill="currentColor" /><circle cx="14.5" cy="7" r="1" fill="currentColor" /></Icon>,
  Type:        (p: P) => <Icon {...p}><path d="M5 7V5h14v2M9 5v14M9 19h6" /></Icon>,
  Eye:         (p: P) => <Icon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></Icon>,
  History:     (p: P) => <Icon {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 8v4l3 2" /></Icon>,
  MessageCircle:(p: P)=> <Icon {...p}><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z" /></Icon>,
  Folder:      (p: P) => <Icon {...p}><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /></Icon>,
  Star:        (p: P) => <Icon {...p}><path d="m12 3 2.8 6.1L21 10l-4.7 4.3L17.6 21 12 17.7 6.4 21l1.3-6.7L3 10l6.2-.9L12 3Z" /></Icon>,
  Wand:        (p: P) => <Icon {...p}><path d="M15 4v3M19 6h3M17 9v3M21 11h3M3 21l9-9M12 12l2-2 4 4-2 2-4-4Z" /></Icon>,
  Languages:   (p: P) => <Icon {...p}><path d="M3 5h10M8 3v2c0 5-2.5 8-5 9.5M5 9c0 3 3 5.5 7 6.5M14 21l4-10 4 10M16 16h4" /></Icon>,
  Stop:        (p: P) => <Icon {...p}><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" /></Icon>,
  Mic:         (p: P) => <Icon {...p}><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></Icon>,
  RotateCw:    (p: P) => <Icon {...p}><path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" /></Icon>,
  Refresh:     (p: P) => <Icon {...p}><path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" /></Icon>,
  ThumbsUp:    (p: P) => <Icon {...p}><path d="M7 10v10H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3ZM7 10l4-7a2 2 0 0 1 2 2v4h5a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 16.8 19H7" /></Icon>,
  ThumbsDown:  (p: P) => <Icon {...p}><path d="M17 14V4h3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-3ZM17 14l-4 7a2 2 0 0 1-2-2v-4H6a2 2 0 0 1-2-2.3l1.2-6A2 2 0 0 1 7.2 5H17" /></Icon>,
  Camera:      (p: P) => <Icon {...p}><path d="M3 7.5h3l2-2.5h8l2 2.5h3v12H3v-12Z" /><circle cx="12" cy="13.5" r="3.5" /></Icon>,
  AtSign:      (p: P) => <Icon {...p}><circle cx="12" cy="12" r="4" /><path d="M16 8v5a2 2 0 0 0 4 0v-1a8 8 0 1 0-3 6.2" /></Icon>,
  Phone:       (p: P) => <Icon {...p}><path d="M5 4h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" /></Icon>,
  MapPin:      (p: P) => <Icon {...p}><path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13Z" /><circle cx="12" cy="9" r="3" /></Icon>,
  Linkedin:    (p: P) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></Icon>,
  ExternalLink:(p: P) => <Icon {...p}><path d="M14 4h6v6M10 14 20 4M19 13v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></Icon>,
  Clock:       (p: P) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></Icon>,
  Maximize:    (p: P) => <Icon {...p}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></Icon>,
  Minimize:    (p: P) => <Icon {...p}><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /></Icon>,
  Mail:        (p: P) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Icon>,
  ArrowLeft:   (p: P) => <Icon {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></Icon>,
  Edit:        (p: P) => <Icon {...p}><path d="M4 20h4l10-10-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></Icon>,
  ArrowsUpDown:(p: P) => <Icon {...p}><path d="M7 4v16M7 4l-3 3M7 4l3 3M17 20V4M17 20l3-3M17 20l-3-3" /></Icon>,
} as const;

export type IconName = keyof typeof I;
