import { getToken } from "./auth";
import { Application, AuthResponse } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? "Request failed");
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const authApi = {
  login: (email: string, password: string) =>
    request<AuthResponse>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (name: string, email: string, password: string) =>
    request<AuthResponse>("/api/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),
};

export const applicationsApi = {
  getAll:   ()                          => request<Application[]>("/api/applications"),
  getById:  (id: number)                => request<Application>(`/api/applications/${id}`),
  create:   (data: Partial<Application>)=> request<Application>("/api/applications", { method: "POST", body: JSON.stringify(data) }),
  update:   (id: number, data: Partial<Application>) => request<Application>(`/api/applications/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete:   (id: number)                => request<void>(`/api/applications/${id}`, { method: "DELETE" }),
  uploadAttachment: (id: number, file: File, type: string) => {
    const token = getToken();
    const form = new FormData();
    form.append("file", file);
    form.append("type", type);
    return fetch(`${BASE}/api/applications/${id}/attachments`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    }).then((r) => r.json());
  },
};
