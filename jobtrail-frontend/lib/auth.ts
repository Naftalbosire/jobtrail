export function saveToken(token: string) { localStorage.setItem("jt_token", token); }
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("jt_token");
}
export function removeToken() { localStorage.removeItem("jt_token"); localStorage.removeItem("jt_user"); }
export function isAuthenticated(): boolean { return !!getToken(); }
export function saveUser(user: object) { localStorage.setItem("jt_user", JSON.stringify(user)); }
export function getUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("jt_user");
  return raw ? JSON.parse(raw) : null;
}
