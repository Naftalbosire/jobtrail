import React from "react";

export const T = {
  bg:       "#0D0D0F",
  surface:  "#141416",
  card:     "#1A1A1E",
  elevated: "#202026",
  border:   "rgba(255,255,255,0.07)",
  borderMd: "rgba(255,255,255,0.13)",
  text:     "#EAEAEA",
  muted:    "#8A8A95",
  hint:     "#55555F",
  accent:   "#6366F1",
  accentBg: "rgba(99,102,241,0.15)",
  radius:   8,
  radiusLg: 12,
} as const;

export const inputStyle: React.CSSProperties = {
  width: "100%",
  border: `0.5px solid ${T.border}`,
  borderRadius: T.radius,
  background: T.elevated,
  color: T.text,
  fontSize: 13,
  padding: "8px 11px",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};
