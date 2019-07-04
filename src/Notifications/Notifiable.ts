export enum UrgencyLevel {
  LOW = "low",
  NORMAL = "normal",
  CRITICAL = "critical"
}

export interface Notifiable {
  notify(summary: string, body: string): void;
}
