"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { ChevronDown, CircleHelp, Globe, LogOut, Moon, PanelLeftClose, PanelLeftOpen, PenLine, Search, Sun } from "lucide-react";
import { useApp } from "@/components/providers";
import { demoUser, signTasks } from "@/lib/mock-data";
import { languageNames } from "@/lib/i18n";
import { Amount, KeyHint } from "@/components/ui";
import type { Lang } from "@/lib/types";

export function Topbar({ onOpenPalette, onOpenHelp, onToggleNavigation, navigationExpanded, toggleRef }: {
  onOpenPalette: () => void;
  onOpenHelp: () => void;
  onToggleNavigation: () => void;
  navigationExpanded: boolean;
  toggleRef: RefObject<HTMLButtonElement | null>;
}) {
  const { t, lang, setLang, theme, toggleTheme, setAuthed } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<"profile" | "sign" | null>(null);
  useEffect(() => setOpen(null), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return <header className="app-topbar">
    <button ref={toggleRef} onClick={onToggleNavigation} className="icon-button navigation-toggle" aria-label={navigationExpanded ? "Replier la navigation" : "Déplier la navigation"} aria-expanded={navigationExpanded} aria-controls="secondary-navigation" title={navigationExpanded ? "Replier la navigation" : "Déplier la navigation"}>{navigationExpanded ? <PanelLeftClose size={21} /> : <PanelLeftOpen size={21} />}</button>
    <div className="topbar-actions">
      <button onClick={onOpenPalette} className="global-search" aria-label="Aller à une page, un budget ou une dépense"><Search size={16} /><span>{t("top.goto")}</span><KeyHint>⌘ K</KeyHint></button>
      <button onClick={onOpenHelp} className="icon-button" aria-label="Aide de cette page" title="Aide de cette page"><CircleHelp size={19} /></button>
      <div className="relative">
        <button onClick={() => setOpen(open === "sign" ? null : "sign")} aria-expanded={open === "sign"} aria-label={`${t("top.sign")} : ${signTasks.length} tâches`} className="topbar-sign"><PenLine size={17} /><span className="sign-label">{t("top.sign")}</span><span className="topbar-count num">{signTasks.length}</span></button>
        {open === "sign" ? <Dropdown onClose={() => setOpen(null)} label="Signatures en attente">
          <div className="dropdown-heading">Tâches que vous pouvez signer</div>
          {signTasks.map((task) => <Link key={task.id} href={task.href} onClick={() => setOpen(null)} className="signature-preview"><div className="flex flex-wrap items-baseline justify-between gap-2"><span className="font-semibold">{task.kind}</span>{task.amount ? <Amount value={task.amount} currency={task.currency ?? "USD"} size="sm" /> : null}</div><div className="meta mt-1">{task.sub}</div></Link>)}
          <Link href="/budget/signatures" onClick={() => setOpen(null)} className="dropdown-footer">Voir toutes les signatures</Link>
        </Dropdown> : null}
      </div>
      <div className="relative">
        <button className="profile-trigger" onClick={() => setOpen(open === "profile" ? null : "profile")} aria-label="Ouvrir les préférences du compte" aria-expanded={open === "profile"}><span className="profile-avatar">AN</span><ChevronDown size={13} /></button>
        {open === "profile" ? <Dropdown onClose={() => setOpen(null)} label="Compte et préférences">
          <div className="dropdown-heading"><strong className="block">{demoUser.name}</strong><span className="meta mt-1 block">{demoUser.jobTitle}</span></div>
          <div className="profile-language"><span className="flex items-center gap-2"><Globe size={16} />Langue</span><div className="flex gap-1">{(Object.keys(languageNames) as Lang[]).map((l) => <button key={l} onClick={() => { setLang(l); }} aria-pressed={lang === l} title={languageNames[l]} className={`language-option${lang === l ? " is-active" : ""}`}>{l.toUpperCase()}</button>)}</div></div>
          <button onClick={toggleTheme} className="dropdown-action">{theme === "light" ? <Moon size={16} /> : <Sun size={16} />}Thème {theme === "light" ? "sombre" : "clair"}</button>
          <button onClick={() => { setAuthed(false); router.replace("/login"); }} className="dropdown-action"><LogOut size={16} />{t("top.logout")}</button>
        </Dropdown> : null}
      </div>
    </div>
  </header>;
}

function Dropdown({ children, onClose, label }: { children: ReactNode; onClose: () => void; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => previous?.focus();
  }, []);
  return <><div className="dropdown-backdrop" onClick={onClose} /><div ref={ref} className="topbar-dropdown fade-in" role="region" aria-label={label}>{children}</div></>;
}
