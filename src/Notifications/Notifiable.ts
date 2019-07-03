export enum UrgencyLevel {
  LOW = "low",
  NORMAL = "normal",
  CRITICAL = "critical"
}

export interface Notifiable {
  summary?: string;
  body: string;

  notify(summary: string, body: string, spawner?: any): void;
}
