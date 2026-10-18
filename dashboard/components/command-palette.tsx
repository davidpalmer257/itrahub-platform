"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search, X } from "lucide-react";
import { useApp } from "@/components/providers";
import { budgetNav } from "@/lib/nav";
import { KeyHint } from "@/components/ui";

interface Item {
  label: string;
  sub: string;
  href: string;
  group: string;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { t } = useApp();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  const listId = useId();
  const instructionsId = useId();
  const countId = useId();

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  const items = useMemo<Item[]>(
    () => [
      { label: t("nav.prevision"), sub: "Composant Finance", href: "/prevision", group: "Navigation" },
      ...budgetNav.map((n) => ({
        label: t(n.labelKey),
        sub: "Composant Budget",
        href: n.href,
        group: "Navigation",
      })),
      { label: t("nav.execution"), sub: "Composant Finance", href: "/execution", group: "Navigation" },
    ],
    [t],
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items.slice(0, 8);
    return items
      .filter((i) => i.label.toLowerCase().includes(term) || i.sub.toLowerCase().includes(term))
      .slice(0, 10);
  }, [q, items]);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQ("");
    setActive(0);
    const id = setTimeout(() => inputRef.current?.focus(), 10);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )).filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0 && !element.closest("[inert]"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const index = focusable.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && index <= 0) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (index < 0 || document.activeElement === last)) {
        event.preventDefault();
        first.focus();
      }
    }

    function keepFocusInside(event: FocusEvent) {
      if (event.target instanceof Node && !dialogRef.current?.contains(event.target)) inputRef.current?.focus();
    }

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("focusin", keepFocusInside);
    return () => {
      clearTimeout(id);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("focusin", keepFocusInside);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [open]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  function go(href: string) {
    router.push(href);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
      style={{ background: "rgb(15 23 42 / 0.4)" }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="fade-in w-full max-w-lg overflow-hidden rounded-[10px] border"
        role="dialog"
        aria-modal="true"
        aria-label={t("top.goto")}
        aria-describedby={instructionsId}
        tabIndex={-1}
        style={{
          background: "var(--panel)",
          borderColor: "var(--line)",
          boxShadow: "var(--shadow-overlay)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b px-3" style={{ borderColor: "var(--line)" }}>
          <Search size={15} style={{ color: "var(--slate)" }} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-label="Rechercher une page, un budget, une dépense ou une société"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls={listId}
            aria-activedescendant={filtered[active] ? `${listId}-${active}` : undefined}
            aria-describedby={`${instructionsId} ${countId}`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.max(0, Math.min(a + 1, filtered.length - 1)));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && filtered[active]) {
                e.preventDefault();
                go(filtered[active].href);
              }
            }}
            placeholder={t("top.goto")}
            className="h-[46px] w-full min-w-0 bg-transparent text-[14px]"
            style={{ color: "var(--ink)" }}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la recherche"
            className="touch-target flex min-h-[36px] min-w-[36px] shrink-0 items-center justify-center rounded hover:bg-[var(--hover)]"
            style={{ color: "var(--slate)" }}
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <p id={countId} role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {filtered.length === 0 ? "Aucun résultat" : `${filtered.length} résultat${filtered.length > 1 ? "s" : ""}`}
        </p>
        {filtered.length === 0 ? (
          <p className="px-4 py-8 text-center text-[14px]" style={{ color: "var(--slate)" }}>
            Aucun résultat pour « {q} »
          </p>
        ) : null}
        <div ref={listRef} id={listId} role="listbox" aria-label="Destinations et dossiers" className="max-h-[46vh] overflow-y-auto py-1">
          {filtered.map((item, i) => (
              <button
                key={`${item.href}-${item.label}`}
                id={`${listId}-${i}`}
                type="button"
                role="option"
                aria-selected={i === active}
                tabIndex={-1}
                data-active={i === active}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => go(item.href)}
                className="flex w-full items-center gap-3 px-3 py-2 text-left"
                style={{ background: i === active ? "var(--selected)" : "transparent" }}
              >
                <span
                  className="w-[74px] shrink-0 truncate rounded px-1.5 py-[2px] text-[11px] font-medium"
                  style={{ background: "var(--surface)", color: "var(--slate)" }}
                >
                  {item.group}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px]" style={{ color: "var(--ink)" }}>
                    {item.label}
                  </span>
                  <span className="meta block truncate">{item.sub}</span>
                </span>
                {i === active ? (
                  <CornerDownLeft size={13} className="shrink-0" style={{ color: "var(--slate)" }} aria-hidden="true" />
                ) : null}
              </button>
            ))}
        </div>

        <div
          id={instructionsId}
          className="flex items-center gap-3 border-t px-3 py-1.5"
          style={{ borderColor: "var(--line)", background: "var(--surface)" }}
        >
          <span className="meta flex items-center gap-1">
            <KeyHint>↑</KeyHint>
            <KeyHint>↓</KeyHint> parcourir
          </span>
          <span className="meta flex items-center gap-1">
            <KeyHint>↵</KeyHint> ouvrir
          </span>
          <span className="meta ml-auto flex items-center gap-1">
            <KeyHint>Esc</KeyHint> fermer
          </span>
        </div>
      </div>
    </div>
  );
}
