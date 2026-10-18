"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark } from "lucide-react";
import { ItracomMark } from "@/components/brand";
import { useApp } from "@/components/providers";

/** Rail d'icônes : un pictogramme par titre du menu. Prévision, Budget et Exécution sont dans Finances. */
export function CollapsedRail({ onExpand }: { onExpand: () => void }) {
  const { t } = useApp();
  const pathname = usePathname();
  const inFinance = ["/prevision", "/budget", "/execution", "/dashboard"].some((p) => pathname.startsWith(p));
  return <nav className="collapsed-rail" aria-label="Départements (navigation repliée)">
    <Link href="/dashboard" className="rail-brand rail-tooltip" aria-label="ITRACOM Holding — Accueil"><ItracomMark size={34} /><span className="rail-tooltip-label">ITRACOM Holding</span></Link>
    <span className="rail-divider" />
    <div className="rail-destinations">
      <button type="button" onClick={onExpand} className={`rail-icon rail-tooltip${inFinance ? " is-active" : ""}`} aria-label={`${t("nav.finance")} — déplier la navigation`} aria-expanded={false} aria-controls="secondary-navigation"><Landmark size={21} strokeWidth={1.7} /><span className="rail-tooltip-label">{t("nav.finance")}</span></button>
    </div>
  </nav>;
}
