"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  /** Largeur fixe sur ordinateur ; la colonne sans largeur absorbe l'espace. */
  width?: number;
  align?: "left" | "right";
  cell: (row: T) => ReactNode;
  /**
   * Place de la colonne dans la ligne de consultation sur téléphone.
   * Les autres colonnes restent visibles avec leur libellé, même « hidden »
   * conservé pour la compatibilité des écrans existants.
   */
  mobile?: "title" | "subtitle" | "trailing" | "meta" | "hidden";
}

interface DataTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  getKey: (row: T) => string;
  /** Rend la ligne entière navigable, tout en gardant un lien accessible au clavier. */
  href?: (row: T) => string;
  selectedKey?: string;
  empty?: ReactNode;
  /** Ligne de totaux affichée sous le tableau. */
  footer?: ReactNode;
}

export function DataTable<T>({
  rows,
  columns,
  getKey,
  href,
  selectedKey,
  empty,
  footer,
}: DataTableProps<T>) {
  const router = useRouter();

  if (rows.length === 0 && empty) {
    return <>{empty}</>;
  }

  const titleCol = columns.find((c) => c.mobile === "title") ?? columns[0];
  const subtitleCol = columns.find((c) => c.mobile === "subtitle");
  const trailingCol = columns.find((c) => c.mobile === "trailing");
  const detailCols = columns.filter((c) => c !== titleCol && c !== subtitleCol && c !== trailingCol);
  const minimumWidth = columns.reduce((width, column) => width + (column.width ?? 240), href ? 36 : 0);

  return (
    <>
      {/* Tableau — ordinateur */}
      <div className="hidden min-w-0 md:block">
        <div
          className="ui-data-table-scroll max-w-full overflow-auto overscroll-contain"
          style={{ maxHeight: "min(68vh, 720px)" }}
          role="region"
          aria-label="Tableau des résultats, défilement horizontal et vertical"
          tabIndex={0}
        >
        <table className="w-full table-fixed border-collapse" style={{ minWidth: minimumWidth }}>
          <colgroup>
            {columns.map((c) => (
              <col key={c.key} style={c.width ? { width: c.width } : undefined} />
            ))}
            {href ? <col style={{ width: 36 }} /> : null}
          </colgroup>
          <thead className="sticky top-0 z-10" style={{ background: "var(--panel)" }}>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={`border-b px-4 py-3 text-[13px] font-semibold leading-[19px] ${c.align === "right" ? "text-right" : "text-left"}`}
                  style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                >
                  {c.header}
                </th>
              ))}
              {href ? <th scope="col" className="border-b" style={{ borderColor: "var(--line)" }}><span className="sr-only">Ouvrir le dossier</span></th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const key = getKey(row);
              const selected = selectedKey === key;
              const target = href?.(row);
              return (
                <tr
                  key={key}
                  onClick={target ? (event) => {
                    if ((event.target as HTMLElement).closest("a, button, input, select, textarea")) return;
                    router.push(target);
                  } : undefined}
                  className={`group border-b transition ${target ? "cursor-pointer" : ""}`}
                  style={{
                    borderColor: "var(--line-soft)",
                    background: selected ? "var(--selected)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) e.currentTarget.style.background = "var(--hover)";
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {columns.map((c, ci) => {
                    const content = c.cell(row);
                    const isFirst = ci === 0;
                    return (
                      <td
                        key={c.key}
                        className={`px-4 py-3 align-middle ${c.align === "right" ? "text-right" : "text-left"}`}
                        style={{ height: 60 }}
                      >
                        {isFirst && target ? (
                          <Link
                            href={target}
                            onClick={(e) => e.stopPropagation()}
                            className="block min-w-0 rounded-sm"
                            aria-current={selected ? "page" : undefined}
                          >
                            {content}
                          </Link>
                        ) : (
                          <div className="min-w-0">{content}</div>
                        )}
                      </td>
                    );
                  })}
                  {href ? (
                    <td className="pr-3 text-right align-middle">
                      <ChevronRight
                        size={15}
                        className="inline opacity-60 transition group-hover:opacity-100 group-focus-within:opacity-100"
                        style={{ color: "var(--muted)" }}
                        aria-hidden="true"
                      />
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {footer ? (
          <div
            className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3"
            style={{ borderColor: "var(--line)", background: "var(--panel)" }}
          >
            {footer}
          </div>
        ) : null}
      </div>

      {/* Lignes de consultation — téléphone, sans masquer de colonne métier. */}
      <div className="ui-data-list divide-y md:hidden" style={{ borderColor: "var(--line-soft)" }} role="list" aria-label="Résultats">
        {rows.map((row) => {
          const key = getKey(row);
          const target = href?.(row);
          const selected = selectedKey === key;
          const inner = (
            <div
              className="flex min-w-0 flex-col gap-3 px-4 py-4"
              style={{ background: selected ? "var(--selected)" : "transparent", minHeight: 44 }}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 basis-[180px] flex-1">{titleCol?.cell(row)}</div>
                {trailingCol ? (
                  <div className="ml-auto text-right">
                    <div className="mb-1 text-[12px] leading-[18px]" style={{ color: "var(--slate)" }}>{trailingCol.header}</div>
                    {trailingCol.cell(row)}
                  </div>
                ) : null}
              </div>
              {subtitleCol ? <div className="min-w-0">{subtitleCol.cell(row)}</div> : null}
              {detailCols.length > 0 ? (
                <dl className="grid min-w-0 gap-2 border-t pt-3" style={{ borderColor: "var(--line-soft)" }}>
                  {detailCols.map((c) => (
                    <div key={c.key} className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <dt className="text-[13px] leading-[19px]" style={{ color: "var(--slate)" }}>{c.header}</dt>
                      <dd className={`min-w-0 ${c.align === "right" ? "ml-auto text-right" : ""}`}>{c.cell(row)}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          );
          return (
            <div key={key} role="listitem">
              {target ? <Link href={target} className="block" aria-current={selected ? "page" : undefined}>{inner}</Link> : inner}
            </div>
          );
        })}
        {footer ? (
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            style={{ background: "var(--panel)" }}
            role="listitem"
          >
            {footer}
          </div>
        ) : null}
      </div>
    </>
  );
}

/** Cellule principale : intitulé fort + référence secondaire. */
export function PrimaryCell({
  title,
  caption,
  badge,
}: {
  title: ReactNode;
  caption?: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
        <span className="min-w-0 text-[14px] font-medium leading-[21px] [overflow-wrap:anywhere]" style={{ color: "var(--ink)" }}>
          {title}
        </span>
        {badge}
      </div>
      {caption ? <div className="meta mt-0.5 [overflow-wrap:anywhere]">{caption}</div> : null}
    </div>
  );
}
