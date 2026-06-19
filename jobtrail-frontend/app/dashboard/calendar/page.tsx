"use client";
import { usePanelCtx } from "@/context/PanelContext";
import { CalendarView } from "@/components/calendar/CalendarView";

export default function CalendarPage() {
  const { apps, openEdit } = usePanelCtx();
  return <CalendarView apps={apps} onOpenEdit={openEdit} />;
}
