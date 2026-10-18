"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useApp } from "@/components/providers";
import { SidebarContent } from "@/components/sidebar";
import { CollapsedRail } from "@/components/collapsed-rail";
import { Topbar } from "@/components/topbar";
import { MobileNav } from "@/components/mobile-nav";
import { CommandPalette } from "@/components/command-palette";
import { LoadingState } from "@/components/page-state";

const NAV_PREFERENCE = "itrahub.navigation.collapsed";

export function AppShell({ children }: { children: ReactNode }) {
  const { authed } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [compact, setCompact] = useState(false);
  const [ready, setReady] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!authed && sessionStorage.getItem("itrahub.authed") !== "1") router.replace("/login");
    else {
      setCollapsed(localStorage.getItem(NAV_PREFERENCE) === "1");
      setReady(true);
    }
  }, [authed, router]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => {
      setCompact(media.matches);
      if (!media.matches) setMobileNavOpen(false);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
    mainRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  const closeNavigation = useCallback(() => {
    setMobileNavOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMobileNavOpen(false);
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") {
        if (mobileNavOpen) closeNavigation();
        setHelpOpen(false);
        setPaletteOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileNavOpen, closeNavigation]);

  useEffect(() => {
    if (!compact || !mobileNavOpen) return;
    const panel = navRef.current;
    const focusable = () => Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]') ?? []).filter((element) => element.getClientRects().length > 0);
    focusable()?.[0]?.focus();
    function trap(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const items = focusable();
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    panel?.addEventListener("keydown", trap);
    return () => panel?.removeEventListener("keydown", trap);
  }, [compact, mobileNavOpen]);

  function toggleNavigation() {
    if (compact) setMobileNavOpen((v) => !v);
    else setCollapsed((value) => {
      localStorage.setItem(NAV_PREFERENCE, value ? "0" : "1");
      return !value;
    });
  }

  if (!ready) return <div className="app-loading"><LoadingState label="Chargement d’ITRAHUB…" /></div>;

  return (
    <div className={`app-shell${collapsed ? " nav-collapsed" : ""}${mobileNavOpen ? " nav-open" : ""}`}>
      <a href="#workspace" className="skip-link">Aller au contenu</a>
      {mobileNavOpen && compact ? <button className="nav-backdrop" onClick={closeNavigation} aria-label="Fermer la navigation" tabIndex={-1} /> : null}
      {collapsed && !compact ? <CollapsedRail onExpand={toggleNavigation} /> : null}
      <aside id="secondary-navigation" ref={navRef} className="secondary-navigation" aria-label="Navigation Finance" role={compact && mobileNavOpen ? "dialog" : undefined} aria-modal={compact && mobileNavOpen ? true : undefined} inert={compact ? !mobileNavOpen : collapsed}>
        <button className="drawer-close icon-button" onClick={closeNavigation} aria-label="Fermer la navigation"><X size={20} /></button>
        <SidebarContent onNavigate={() => setMobileNavOpen(false)} />
      </aside>
      <div className="app-main" inert={compact && mobileNavOpen}>
        <Topbar toggleRef={toggleRef} navigationExpanded={compact ? mobileNavOpen : !collapsed} onToggleNavigation={toggleNavigation} onOpenPalette={() => setPaletteOpen(true)} onOpenHelp={() => setHelpOpen(true)} />
        <main id="workspace" ref={mainRef} tabIndex={-1} className="workspace"><div className="workspace-body">{children}</div></main>
        <MobileNav onMore={toggleNavigation} expanded={mobileNavOpen} />
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      {helpOpen ? <HelpDialog onClose={() => setHelpOpen(false)} /> : null}
    </div>
  );
}

function HelpDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    return () => previous?.focus();
  }, []);
  return <div className="app-modal-backdrop" onClick={onClose}>
    <div ref={ref} tabIndex={-1} className="app-help-dialog" role="dialog" aria-modal="true" aria-labelledby="help-title" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => {
      if (e.key === "Tab") { e.preventDefault(); ref.current?.querySelector<HTMLButtonElement>("button")?.focus(); }
    }}>
      <div className="flex items-center justify-between gap-4 border-b pb-4"><h2 id="help-title" className="h01">Bienvenue dans ITRAHUB</h2><button className="icon-button" onClick={onClose} aria-label="Fermer l’aide"><X size={20} /></button></div>
      <div className="space-y-4 py-5 text-[14px] leading-6">
        <p>Le département Finances réunit Prévision, Budget et Exécution. Tous les parcours budgétaires disponibles se trouvent dans Budget.</p>
        <p>Utilisez la recherche <strong>Aller à…</strong> ou <kbd>Ctrl K</kbd> (⌘ K sur Mac) pour ouvrir une page, un budget ou une dépense.</p>
        <p>Le bouton à gauche de l’en-tête permet de replier ou de rouvrir le menu. Sur téléphone et tablette, Échap ferme le panneau.</p>
        <p className="meta">Les données et les circuits affichés sont ceux de la démonstration existante.</p>
      </div>
    </div>
  </div>;
}
