"use client";

import { useEffect, useState } from "react";

export type ThemeSetting = "light" | "dark" | "system";
type Effective = "light" | "dark";

function readSetting(): ThemeSetting {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return "system";
}

function readEffective(setting: ThemeSetting): Effective {
  if (setting === "system") {
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }
  return setting;
}

export function useTheme() {
  const [setting, setSetting] = useState<ThemeSetting>("system");
  const [effective, setEffective] = useState<Effective>("light");

  useEffect(() => {
    const s = readSetting();
    setSetting(s);
    setEffective(readEffective(s));
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const obs = new MutationObserver(() => {
      const s = readSetting();
      setSetting(s);
      setEffective(readEffective(s));
    });

    obs.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (setting !== "system") return;
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;

    const onChange = () => setEffective(mq.matches ? "dark" : "light");
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [setting]);

  const isDark = effective === "dark";

  return { setting, effective, isDark };
}
