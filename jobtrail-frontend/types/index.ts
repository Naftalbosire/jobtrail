export type StatusId =
  | "wishlist" | "preparing" | "applied" | "shortlisted"
  | "interview" | "technical" | "waiting" | "offer"
  | "rejected" | "archived";

export interface Status {
  id: StatusId;
  label: string;
  color: string;
  bg: string;
}

export interface Attachment {
  id?: number;
  name: string;
  type: "cv" | "cover" | "other";
  size: string;
  url?: string;
}

export interface TimelineEvent {
  id?: number;
  date: string;
  event: string;
  type: "applied" | "upload" | "followup" | "interview" | "rejected" | "shortlisted" | "offer";
}

export interface Application {
  id: number;
  company: string;
  position: string;
  industry: string;
  dateApplied: string;
  status: StatusId;
  method: string;
  url: string;
  contact: string;
  followUp: string;
  location: string;
  salary: string;
  notes: string;
  attachments: Attachment[];
  timeline: TimelineEvent[];
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
