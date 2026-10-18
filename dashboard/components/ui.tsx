"use client";

import Link from "next/link";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { useApp } from "@/components/providers";
import { formatAmount } from "@/lib/format";
import type { BadgeTone } from "@/lib/labels";
import type { Currency } from "@/lib/types";

/* ------------------------------------------------------------------ */
/* Badges et pastilles d'état                                          */
/* ------------------------------------------------------------------ */

const toneStyles: Record<BadgeTone, { bg: string; color: string; border: string }> = {
  neutral: { bg: "var(--surface)", color: "var(--slate)", border: "var(--line)" },
  info: { bg: "var(--info-soft)", color: "var(--slate)", border: "var(--line)" },
  success: {
    bg: "var(--success-soft)",
    color: "var(--success)",
    border: "color-mix(in srgb, var(--success) 28%, transparent)",
  },
  warning: {
    bg: "var(--warning-soft)",
    color: "var(--warning)",
    border: "color-mix(in srgb, var(--warning) 28%, transparent)",
  },
  danger: {
    bg: "var(--danger-soft)",
    color: "var(--danger)",
    border: "color-mix(in srgb, var(--danger) 28%, transparent)",
  },
};

export function toneColor(tone: BadgeTone = "neutral"): string {
  switch (tone) {
    case "success":
      return "var(--success)";
    case "warning":
      return "var(--warning)";
    case "danger":
      return "var(--danger)";
    case "info":
      return "var(--slate)";
    default:
      return "var(--muted)";
  }
}

export function Badge({
  tone = "neutral",
  children,
  dot,
}: {
  tone?: BadgeTone;
  children: ReactNode;
  dot?: boolean;
}) {
  const s = toneStyles[tone];
  return (
    <span
      className="ui-badge inline-flex max-w-full items-center gap-1.5 rounded px-2 py-[3px] text-[12.5px] font-medium leading-[18px]"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {dot ? <Dot tone={tone} /> : null}
      <span>{children}</span>
    </span>
  );
}

export function Dot({ tone = "neutral" }: { tone?: BadgeTone }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ background: toneColor(tone) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Panneaux                                                            */
/* ------------------------------------------------------------------ */

export function Panel({
  children,
  className = "",
  padded = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  style?: CSSProperties;
}) {
  return (
    <section
      className={`ui-panel min-w-0 overflow-hidden rounded-[4px] border ${padded ? "p-4 sm:p-6" : ""} ${className}`}
      style={{ background: "var(--panel)", borderColor: "var(--line)", ...style }}
    >
      {children}
    </section>
  );
}

/** En-tête de panneau : titre à gauche, compléments et actions à droite. */
export function PanelHeader({
  title,
  hint,
  actions,
}: {
  title: ReactNode;
  hint?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div
      className="ui-panel-header flex min-h-[56px] flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b px-4 py-3 sm:px-6"
      style={{ borderColor: "var(--line)" }}
    >
      <h2 className="min-w-0 text-[15px] font-semibold leading-[22px]" style={{ color: "var(--ink)" }}>
        {title}
      </h2>
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        {hint ? <span className="meta">{hint}</span> : null}
        {actions}
      </div>
    </div>
  );
}

export function PanelFooter({ children }: { children: ReactNode }) {
  return (
    <div
      className="ui-panel-footer flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 sm:px-6"
      style={{ borderColor: "var(--line)", background: "var(--panel)" }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* En-tête de page : fil d'Ariane, titre, barre de commandes           */
/* ------------------------------------------------------------------ */

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-1">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <span key={`${c.label}-${i}`} className="flex items-center gap-1">
            {c.href && !last ? (
              <Link
                href={c.href}
                className="meta rounded px-0.5 transition hover:underline"
                style={{ color: "var(--slate)" }}
              >
                {c.label}
              </Link>
            ) : (
              <span className="meta" aria-current={last ? "page" : undefined} style={{ color: "var(--slate)" }}>
                {c.label}
              </span>
            )}
            {!last ? <ChevronRight size={12} style={{ color: "var(--muted)" }} /> : null}
          </span>
        );
      })}
    </nav>
  );
}

/**
 * En-tête de page. Une seule action principale (NFR-UX-02) ;
 * les actions secondaires restent au second plan.
 */
export function PageHeader({
  breadcrumb,
  title,
  subtitle,
  status,
  primary,
  secondary,
  meta,
}: {
  breadcrumb?: Crumb[];
  title: string;
  subtitle?: ReactNode;
  status?: ReactNode;
  primary?: ReactNode;
  secondary?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className="ui-page-header mb-6">
      {breadcrumb ? (
        <div className="mb-2">
          <Breadcrumb items={breadcrumb} />
        </div>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="ui-page-heading min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="h01 min-w-0" style={{ color: "var(--ink)" }}>
              {title}
            </h1>
            {status}
          </div>
          {subtitle ? (
            <p className="mt-1.5 max-w-3xl text-[14px] leading-[21px]" style={{ color: "var(--slate)" }}>
              {subtitle}
            </p>
          ) : null}
        </div>
        {primary || secondary ? (
          <div className="ui-page-actions flex max-w-full flex-wrap items-center gap-2">
            {secondary}
            {primary}
          </div>
        ) : null}
      </div>
      {meta ? <div className="mt-3">{meta}</div> : null}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Boutons et contrôles                                                */
/* ------------------------------------------------------------------ */

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled,
  href,
  className = "",
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  href?: string;
  className?: string;
  title?: string;
}) {
  const cls = `ui-control ui-button-primary touch-target inline-flex min-h-[36px] max-w-full items-center justify-center gap-2 rounded-[4px] px-3 py-[7px] text-[14px] font-medium leading-5 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40 ${className}`;
  const style = { background: "var(--accent)", color: "var(--on-accent)" };
  if (href && !disabled) {
    return (
      <Link href={href} className={cls} style={style} title={title}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} style={style} title={title}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  href,
  disabled,
  className = "",
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  title?: string;
}) {
  const cls = `ui-control ui-button-secondary touch-target inline-flex min-h-[36px] max-w-full items-center justify-center gap-2 rounded-[4px] border px-3 py-[7px] text-[14px] font-medium leading-5 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40 ${className}`;
  const style = { borderColor: "var(--line)", color: "var(--slate)", background: "var(--panel)" };
  if (href && !disabled) {
    return (
      <Link href={href} className={cls} style={style} title={title}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls} style={style} title={title}>
      {children}
    </button>
  );
}

/** Contrôle segmenté — remplace les suites de puces pour les filtres d'état. */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  size = "md",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; count?: number }[];
  size?: "sm" | "md";
}) {
  return (
    <div
      className="ui-segmented inline-flex max-w-full flex-wrap items-center gap-1"
      role="group"
      aria-label="Filtrer les résultats"
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`touch-target inline-flex min-h-[36px] items-center gap-1.5 rounded-[4px] font-medium transition hover:bg-[var(--hover)] ${
              size === "sm" ? "px-2.5 py-1.5 text-[13px]" : "px-3 py-2 text-[14px]"
            }`}
            style={{
              background: active ? "var(--selected)" : "transparent",
              color: active ? "var(--accent)" : "var(--slate)",
            }}
          >
            {o.label}
            {o.count !== undefined ? (
              <span className="num text-[12px]" style={{ color: active ? "var(--accent)" : "var(--slate)" }}>
                {o.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/** Onglets de dossier — séparent les facettes d'un même enregistrement. */
function navigateTabs(event: KeyboardEvent<HTMLDivElement>) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const index = tabs.indexOf(document.activeElement as HTMLButtonElement);
  if (index < 0 || tabs.length === 0) return;
  event.preventDefault();
  const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 :
    (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
  tabs[next].focus();
  tabs[next].click();
}

export function Tabs<T extends string>({
  value,
  onChange,
  items,
}: {
  value: T;
  onChange: (v: T) => void;
  items: { value: T; label: string; count?: number }[];
}) {
  return (
    <div
      className="ui-tabs flex min-w-0 gap-2 overflow-x-auto border-b px-4 py-3 sm:px-6"
      style={{ borderColor: "var(--line)" }}
      role="tablist"
      aria-label="Sections du dossier"
      onKeyDown={navigateTabs}
    >
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(it.value)}
            className="touch-target relative min-h-[36px] shrink-0 whitespace-nowrap rounded-[4px] px-3 py-2 text-[14px] font-medium transition"
            style={{ background: active ? "var(--selected)" : "transparent", color: active ? "var(--accent)" : "var(--slate)" }}
          >
            <span className="flex items-center gap-1.5">
              {it.label}
              {it.count !== undefined ? (
                <span
                  className="num rounded px-1 text-[12px]"
                  style={{ color: active ? "var(--accent)" : "var(--slate)" }}
                >
                  {it.count}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  icon,
  className = "",
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={`ui-search inline-flex min-w-0 items-center gap-2 rounded-[4px] border px-3 transition focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)] ${className}`}
      style={{ borderColor: "var(--line)", background: "var(--panel)" }}
    >
      {icon ? <span className="shrink-0" aria-hidden="true" style={{ color: "var(--slate)" }}>{icon}</span> : null}
      <input
        type="search"
        aria-label={label ?? placeholder ?? "Rechercher"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[36px] w-full min-w-0 bg-transparent text-[14px] outline-none"
        style={{ color: "var(--ink)" }}
      />
    </span>
  );
}

export function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label?: string;
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="ui-control h-[38px] max-w-full rounded-[4px] border px-3 text-[14px]"
      style={{ borderColor: "var(--line)", background: "var(--panel)", color: "var(--slate)" }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

/** Barre de filtres et d'outils au-dessus d'une liste. */
export function Toolbar({ children, right }: { children?: ReactNode; right?: ReactNode }) {
  return (
    <div className="ui-toolbar mb-5 flex min-w-0 flex-wrap items-center gap-2.5">
      {children}
      {right ? <div className="ml-auto flex max-w-full flex-wrap items-center gap-2">{right}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Montants                                                            */
/* ------------------------------------------------------------------ */

/** Montant aligné : chiffres tabulaires, devise distincte (NFR-UX-04). */
export function Amount({
  value,
  currency,
  tone = "default",
  size = "md",
}: {
  value: number;
  currency: Currency;
  tone?: "default" | "muted" | "danger" | "warning" | "success";
  size?: "sm" | "md" | "lg";
}) {
  const { lang } = useApp();
  const formatted = formatAmount(value, currency, lang);
  const idx = formatted.lastIndexOf(" ");
  const number = idx > 0 ? formatted.slice(0, idx) : formatted;
  const color =
    tone === "muted"
      ? "var(--slate)"
      : tone === "danger"
        ? "var(--danger)"
        : tone === "warning"
          ? "var(--warning)"
          : tone === "success"
            ? "var(--success)"
            : "var(--ink)";
  const fs = size === "sm" ? "13.5px" : size === "lg" ? "18px" : "14px";
  return (
    <span className="ui-amount num inline-block whitespace-nowrap text-right" style={{ color, fontSize: fs, fontWeight: size === "lg" ? 600 : 400 }}>
      {number}{" "}
      <span
        className="font-medium"
        style={{ color: tone === "default" ? "var(--slate)" : "inherit", fontSize: "12.5px" }}
      >
        {currency}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Synthèses discrètes                                                 */
/* ------------------------------------------------------------------ */

/** Indicateur inline : libellé au-dessus, valeur alignée. Pas de grande carte. */
export function Metric({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "default" | "warning" | "danger";
}) {
  const color = tone === "warning" ? "var(--warning)" : tone === "danger" ? "var(--danger)" : "var(--ink)";
  return (
    <div className="ui-metric min-w-0 px-4 py-3 sm:px-6">
      <div className="text-[13px] leading-[19px]" style={{ color: "var(--slate)" }}>{label}</div>
      <div className="num mt-1 text-[17px] font-semibold leading-6" style={{ color }}>
        {value}
      </div>
      {hint ? <div className="meta mt-1">{hint}</div> : null}
    </div>
  );
}

/** Barre d'avancement fine : un repère, pas une illustration. */
export function Progress({
  value,
  max,
  tone = "default",
}: {
  value: number;
  max: number;
  tone?: "default" | "warning" | "danger" | "success";
}) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const color =
    tone === "warning"
      ? "var(--warning)"
      : tone === "danger"
        ? "var(--danger)"
        : tone === "success"
          ? "var(--success)"
          : "var(--slate)";
  return (
    <div
      className="h-[4px] w-full overflow-hidden rounded-full"
      style={{ background: "var(--line)" }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

/** Paire libellé / valeur pour les panneaux de détail. */
export function KeyValue({
  label,
  children,
  align = "between",
}: {
  label: string;
  children: ReactNode;
  align?: "between" | "stack";
}) {
  if (align === "stack") {
    return (
      <div className="min-w-0">
        <div className="text-[13px] leading-[19px]" style={{ color: "var(--slate)" }}>{label}</div>
        <div className="mt-0.5 text-[14px]" style={{ color: "var(--ink)" }}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 py-1">
      <span className="text-[13px] leading-[19px]" style={{ color: "var(--slate)" }}>{label}</span>
      <span className="min-w-0 text-right text-[14px]" style={{ color: "var(--ink)" }}>
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Formulaires                                                         */
/* ------------------------------------------------------------------ */

/** Regroupement de champs selon leur logique métier. */
export function FormSection({
  title,
  description,
  children,
  columns = 2,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  columns?: 1 | 2;
}) {
  return (
    <section className="ui-form-section border-b px-4 py-5 last:border-b-0 sm:px-6" style={{ borderColor: "var(--line)" }}>
      <div className="mb-3">
        <h3 className="lbl" style={{ color: "var(--ink)" }}>
          {title}
        </h3>
        {description ? <p className="meta mt-0.5">{description}</p> : null}
      </div>
      <div className={`grid gap-x-5 gap-y-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 flex items-center gap-1 text-[14px] font-medium" style={{ color: "var(--slate)" }}>
        {label}
        {required ? <span style={{ color: "var(--danger)" }}>*</span> : null}
      </span>
      {children}
      {hint ? <span className="meta mt-1 block">{hint}</span> : null}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  invalid?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className="ui-control h-[38px] w-full rounded-[4px] border px-3 text-[14px] outline-none transition disabled:cursor-not-allowed disabled:opacity-60"
      style={{
        borderColor: invalid ? "var(--danger)" : "var(--line)",
        background: disabled ? "var(--surface)" : "var(--panel)",
        color: "var(--ink)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* États vides, chargement, dépendances ouvertes                       */
/* ------------------------------------------------------------------ */

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="ui-empty-state flex min-h-[260px] flex-col items-center justify-center px-6 py-12 text-center">
      {icon ? (
        <span
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "var(--info-soft)", color: "var(--accent)" }}
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
      <p className="text-[15px] font-semibold leading-[22px]" style={{ color: "var(--ink)" }}>
        {title}
      </p>
      {description ? <p className="mt-1 max-w-sm text-[14px] leading-[21px]" style={{ color: "var(--slate)" }}>{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function SkeletonRows({ rows = 5 }: { rows?: number }) {
  return (
    <div className="divide-y" style={{ borderColor: "var(--line)" }} role="status" aria-label="Chargement en cours">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-4 sm:px-6" aria-hidden="true">
          <div className="skeleton h-3 flex-1" />
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-3 w-28" />
        </div>
      ))}
    </div>
  );
}

/** Dépendance ouverte (décision D-xx) — visible, jamais résolue en silence. */
export function OpenDecision({ code, children }: { code: string; children: ReactNode }) {
  return (
    <div
      className="flex items-start gap-2.5 rounded-[4px] border px-3 py-2.5"
      style={{
        borderColor: "color-mix(in srgb, var(--warning) 28%, transparent)",
        background: "var(--warning-soft)",
      }}
    >
      <span
        className="shrink-0 rounded px-1.5 py-[1px] text-[11px] font-semibold"
        style={{ background: "color-mix(in srgb, var(--warning) 16%, transparent)", color: "var(--warning)" }}
      >
        {code}
      </span>
      <span className="text-[13px] leading-[20px]" style={{ color: "var(--slate)" }}>
        {children}
      </span>
    </div>
  );
}

export function KeyHint({ children }: { children: ReactNode }) {
  return (
    <kbd
      className="rounded border px-1.5 py-[1px] text-[11px] font-medium"
      style={{ borderColor: "var(--line)", color: "var(--muted)", background: "var(--surface)" }}
    >
      {children}
    </kbd>
  );
}

/* ------------------------------------------------------------------ */
/* Frises de circuit                                                   */
/* ------------------------------------------------------------------ */

/** Frise des étapes d'un circuit signé (budgets, dépenses, consolidation). */
export function StepTrail({
  steps,
  currentIndex,
  orientation = "horizontal",
}: {
  steps: { label: string; caption?: string }[];
  currentIndex: number;
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "vertical") {
    return (
      <ol className="relative">
        {steps.map((s, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={s.label} className="flex gap-3 pb-3 last:pb-0">
              <span className="flex flex-col items-center">
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                  style={{
                    background: done || active ? "var(--accent)" : "var(--panel)",
                    color: done || active ? "var(--on-accent)" : "var(--muted)",
                    border: `1px solid ${done || active ? "var(--accent)" : "var(--line)"}`,
                  }}
                >
                  {i + 1}
                </span>
                {i < steps.length - 1 ? (
                  <span className="mt-1 w-px flex-1" style={{ background: "var(--line)" }} />
                ) : null}
              </span>
              <span className="min-w-0 flex-1 pb-1">
                <span
                  className="block text-[13.5px]"
                  style={{ color: active ? "var(--ink)" : "var(--slate)", fontWeight: active ? 500 : 400 }}
                >
                  {s.label}
                </span>
                {s.caption ? <span className="meta block">{s.caption}</span> : null}
              </span>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className="flex items-stretch overflow-x-auto">
      {steps.map((s, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li
            key={s.label}
            className="flex min-w-0 flex-1 flex-col gap-1.5 border-r px-3 py-2.5 last:border-r-0"
            style={{ borderColor: "var(--line)", background: active ? "var(--surface)" : "transparent" }}
          >
            <span
              className="h-[3px] w-full rounded-full"
              style={{ background: done ? "var(--slate)" : active ? "var(--ink)" : "var(--line)" }}
            />
            <span
              className="truncate text-[12.5px]"
              style={{
                color: active ? "var(--ink)" : done ? "var(--slate)" : "var(--muted)",
                fontWeight: active ? 600 : 400,
              }}
              title={s.label}
            >
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
