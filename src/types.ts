export interface KPIItem {
  id: string;
  label: string;
  value: string;
  tickColor: string; // Tailwind class name or custom color
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  actionCode: string;
}

export interface QueueItem {
  id: string;
  campaign: string;
  platform: "facebook" | "instagram" | "linkedin" | "twitter" | "tiktok" | "both";
  status: "active" | "completed" | "paused" | "failed";
  scheduledTime: string;
  reconciliationRate: string;
}

export interface CommentItem {
  order: number;
  delay: string;
  text: string;
}

export interface GeneratedContent {
  caption: string;
  comments: CommentItem[];
}

export interface Fanpage {
  id: string;
  name: string;
  platform: "facebook" | "instagram" | "both";
  pageId: string;
  status: "active" | "inactive";
  followers: string;
}
