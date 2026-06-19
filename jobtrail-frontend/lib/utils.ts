import { STATUSES } from "@/constants";
import { StatusId, Application } from "@/types";

export function statusById(id: StatusId) {
  return STATUSES.find((s) => s.id === id) ?? STATUSES[0];
}

export function isOverdue(dateStr: string): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

export function emptyApplication(): Application {
  return {
    id: 0,
    company: "", position: "", industry: "",
    dateApplied: new Date().toISOString().slice(0, 10),
    status: "applied",
    method: "LinkedIn", url: "", contact: "",
    followUp: "", location: "", salary: "", notes: "",
    attachments: [], timeline: [],
  };
}
