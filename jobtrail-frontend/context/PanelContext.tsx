"use client";
import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from "react";
import { Application } from "@/types";
import { emptyApplication } from "@/lib/utils";
// import { MOCK_APPS } from "@/constants";

interface PanelCtx {
  apps: Application[];
  setApps: (apps: Application[]) => void;
  openNew: () => void;
  openEdit: (app: Application) => void;
  panelOpen: boolean;
  draft: Application | null;
  setDraft: (fn: (p: Application) => Application) => void;
  isNew: boolean;
  saveApp: () => void;
  deleteApp: (id: number) => void;
  closePanel: () => void;
  cmdOpen: boolean;
  setCmdOpen: (v: boolean) => void;
  triggerUpload: (type: "cv" | "cover" | "other") => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
}

const Ctx = createContext<PanelCtx>(null!);
export const usePanelCtx = () => useContext(Ctx);

export function PanelProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<Application[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [draft, setDraftRaw] = useState<Application | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [uploadingFor, setUploadFor] = useState<"cv"|"cover"|"other"|null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdOpen(v => !v); }
      if (e.key === "Escape") { setCmdOpen(false); setPanelOpen(false); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const openNew = useCallback(() => { setDraftRaw(emptyApplication()); setIsNew(true); setPanelOpen(true); }, []);
  const openEdit = useCallback((app: Application) => { setDraftRaw({ ...app }); setIsNew(false); setPanelOpen(true); }, []);
  const closePanel = () => { setPanelOpen(false); setTimeout(() => setDraftRaw(null), 300); };
  const setDraft = (fn: (p: Application) => Application) => setDraftRaw(p => p ? fn(p) : p);

  const saveApp = () => {
    if (!draft?.company.trim()) return;
    const now = new Date().toISOString().slice(0, 10);
    if (isNew) {
      const newApp = { ...draft, id: Date.now(), timeline: [{ date: now, event: "Application added", type: "applied" as const }] };
      setApps(prev => [newApp, ...prev]);
    } else {
      setApps(prev => prev.map(a => a.id === draft.id ? draft : a));
    }
    closePanel();
  };

  const deleteApp = (id: number) => { setApps(prev => prev.filter(a => a.id !== id)); closePanel(); };

  const triggerUpload = (type: "cv"|"cover"|"other") => { setUploadFor(type); setTimeout(() => fileRef.current?.click(), 50); };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingFor) return;
    const att = { name: file.name, type: uploadingFor, size: `${Math.round(file.size / 1024)} KB` };
    setDraft(prev => ({
      ...prev,
      attachments: uploadingFor === "other"
        ? [...prev.attachments, att]
        : [...prev.attachments.filter(a => a.type !== uploadingFor), att],
    }));
    e.target.value = "";
  };

  return (
    <Ctx.Provider value={{ apps, setApps, openNew, openEdit, panelOpen, draft, setDraft, isNew, saveApp, deleteApp, closePanel, cmdOpen, setCmdOpen, triggerUpload, fileRef }}>
      {children}
      <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={handleFile} />
    </Ctx.Provider>
  );
}
