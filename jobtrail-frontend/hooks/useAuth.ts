"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken, saveUser, removeToken } from "@/lib/auth";
import { authApi } from "@/lib/api";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true); setError(null);
    try {
      const res = await authApi.login(email, password);
      saveToken(res.token); saveUser(res.user);
      router.push("/dashboard");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally { setLoading(false); }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true); setError(null);
    try {
      const res = await authApi.register(name, email, password);
      saveToken(res.token); saveUser(res.user);
      router.push("/dashboard");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Registration failed");
    } finally { setLoading(false); }
  };

  const logout = () => { removeToken(); router.push("/login"); };
  return { login, register, logout, loading, error };
}
