"use client";

import { type PropsWithChildren, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type AppPortalProps = PropsWithChildren<{
  container?: HTMLElement | null;
  className?: string;
}>;

export const AppPortal = ({
  children,
  container,
  className,
}: AppPortalProps) => {
  const [mounted, setMounted] = useState(false);

  const host = useMemo(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElement("div");
    el.setAttribute("data-app-portal", "");
    el.className = ["app-portal", className].filter(Boolean).join(" ");
    return el;
  }, [className]);

  useEffect(() => {
    if (!host) return;
    const root = container ?? document.body;
    root.appendChild(host);
    setMounted(true);
    return () => {
      root.removeChild(host);
    };
  }, [host, container]);

  if (!mounted || !host) return null;
  return createPortal(children, host);
};
