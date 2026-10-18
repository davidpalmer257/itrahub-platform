"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "@/lib/types";
import { translate } from "@/lib/i18n";

type Theme = "light" | "dark";

interface AppContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  theme: Theme;
  toggleTheme: () => void;
  authed: boolean;
  setAuthed: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  const [theme, setTheme] = useState<Theme>("light");
  const [authed, setAuthedState] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("itrahub.lang") as Lang | null;
    const storedTheme = localStorage.getItem("itrahub.theme") as Theme | null;
    const storedAuth = sessionStorage.getItem("itrahub.authed");
    if (storedLang) setLangState(storedLang);
    if (storedTheme) setTheme(storedTheme);
    if (storedAuth === "1") setAuthedState(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("itrahub.theme", theme);
  }, [theme]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("itrahub.lang", l);
    document.documentElement.lang = l;
  };

  const setAuthed = (v: boolean) => {
    setAuthedState(v);
    if (v) sessionStorage.setItem("itrahub.authed", "1");
    else sessionStorage.removeItem("itrahub.authed");
  };

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const t = (key: string) => translate(lang, key);

  return (
    <AppContext.Provider
      value={{ lang, setLang, t, theme, toggleTheme, authed, setAuthed }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
