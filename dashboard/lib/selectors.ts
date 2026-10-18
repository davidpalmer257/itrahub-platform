// Sélecteurs de lecture partagés par les vues Budget.
// Ils n'ajoutent aucune règle métier : ils regroupent les calculs déjà
// définis par le SRS (équilibre par source, avancement de la campagne).

import { toUSD } from "./format";
import {
  budgets,
  budgetTotals,
  entities,
  resourceBudgets,
} from "./mock-data";
import type { BudgetStatus, FundingSourceType } from "./types";

export const SOURCE_ORDER: FundingSourceType[] = [
  "recettes",
  "tresorerie",
  "dotation",
  "emprunt",
  "subvention",
  "cession",
];

/** Dépenses financées par source, converties en USD au taux figé. */
export function financedBySource(perimeterId: string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const b of budgets) {
    if (b.perimeterId !== perimeterId) continue;
    for (const l of b.lines) {
      out[l.fundingSource] = (out[l.fundingSource] ?? 0) + toUSD(l.amountTTC, l.currency);
    }
  }
  return out;
}

/** Ressources prévues par source, converties en USD au taux figé. */
export function plannedBySource(perimeterId: string): Record<string, number> {
  const rb = resourceBudgets.find((r) => r.perimeterId === perimeterId);
  const out: Record<string, number> = {};
  if (!rb) return out;
  for (const line of rb.lines) {
    out[line.source] = (out[line.source] ?? 0) + toUSD(line.amount, line.currency);
  }
  return out;
}

/** Montant manquant = max(0, dépenses financées − ressources prévues) (FR-RES-03). */
export function deficitUSD(perimeterId: string): number {
  const planned = plannedBySource(perimeterId);
  const financed = financedBySource(perimeterId);
  const totalPlanned = Object.values(planned).reduce((a, b) => a + b, 0);
  const totalFinanced = Object.values(financed).reduce((a, b) => a + b, 0);
  return Math.max(0, totalFinanced - totalPlanned);
}

export interface SocietyStats {
  expected: number;
  created: number;
  submitted: number;
  arbitrated: number;
  approved: number;
  totalUSD: number;
  deficitUSD: number;
  hasResourceBudget: boolean;
  dossierReady: boolean;
  dossierApproved: boolean;
}

/** Avancement d'un périmètre pour un exercice (FR-CAM-04, FR-RPT-01). */
export function societyStats(perimeterId: string, exerciseId: string): SocietyStats {
  const list = budgets.filter((b) => b.perimeterId === perimeterId && b.exerciseId === exerciseId);
  const expected = entities.filter((e) => e.perimeterId === perimeterId).length;
  const submitted = list.filter((b) => b.status !== "brouillon").length;
  const arbitrated = list.filter((b) => b.status === "arbitre" || b.status === "approuve").length;
  const approved = list.filter((b) => b.status === "approuve").length;
  return {
    expected,
    created: list.length,
    submitted,
    arbitrated,
    approved,
    totalUSD: list.reduce((s, b) => s + budgetTotals(b).usd, 0),
    deficitUSD: deficitUSD(perimeterId),
    hasResourceBudget: resourceBudgets.some((r) => r.perimeterId === perimeterId),
    dossierReady: list.length > 0 && arbitrated === list.length && approved < list.length,
    dossierApproved: list.length > 0 && approved === list.length,
  };
}

/** Répartition des budgets d'un exercice par statut. */
export function statusDistribution(exerciseId: string): Record<BudgetStatus, number> {
  const out = {
    brouillon: 0,
    soumis: 0,
    vise: 0,
    impute: 0,
    arbitre: 0,
    approuve: 0,
  } as Record<BudgetStatus, number>;
  for (const b of budgets) {
    if (b.exerciseId === exerciseId) out[b.status] += 1;
  }
  return out;
}
