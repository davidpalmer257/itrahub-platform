import type {
  BudgetStatus,
  ExerciseStatus,
  ExpenseStatus,
  InvoiceStatus,
  Priority,
} from "./types";

export type BadgeTone = "neutral" | "info" | "success" | "warning" | "danger";

export const budgetStatusLabel: Record<BudgetStatus, string> = {
  brouillon: "Brouillon",
  soumis: "Soumis · en visa",
  vise: "Visé · à imputer",
  impute: "Imputé · en arbitrage",
  arbitre: "Arbitré",
  approuve: "Approuvé",
};

export const budgetStatusTone: Record<BudgetStatus, BadgeTone> = {
  brouillon: "neutral",
  soumis: "info",
  vise: "info",
  impute: "warning",
  arbitre: "info",
  approuve: "success",
};

export const budgetStatusOrder: BudgetStatus[] = [
  "brouillon",
  "soumis",
  "vise",
  "impute",
  "arbitre",
  "approuve",
];

export const exerciseStatusLabel: Record<ExerciseStatus, string> = {
  en_preparation: "En préparation",
  en_cours: "En cours",
  cloture: "Clôturé",
  archive: "Archivé",
};

export const expenseStatusLabel: Record<ExpenseStatus, string> = {
  demandee: "Demandée · à engager",
  engagee: "Engagée · en cours",
  soldee: "Soldée",
  annulee: "Annulée",
};

export const expenseStatusTone: Record<ExpenseStatus, BadgeTone> = {
  demandee: "info",
  engagee: "warning",
  soldee: "success",
  annulee: "neutral",
};

export const invoiceStatusLabel: Record<InvoiceStatus, string> = {
  liquidee: "Liquidée · à ordonnancer",
  ordonnancee: "Ordonnancée · à payer",
  payee: "Payée",
  rejetee: "Rejetée",
};

export const priorityLabel: Record<Priority, string> = {
  basse: "Basse",
  moyenne: "Moyenne",
  haute: "Haute",
  critique: "Critique",
};

export const priorityTone: Record<Priority, BadgeTone> = {
  basse: "neutral",
  moyenne: "neutral",
  haute: "warning",
  critique: "danger",
};

export const campaignPhases = [
  "Ouvrir l'exercice",
  "Élaborer",
  "Déposer",
  "Viser par la hiérarchie",
  "Imputer",
  "Viser selon les seuils et arbitrer",
  "Approuver la société",
  "Consolider et adopter",
  "Exécuter",
  "Clôturer et archiver",
];
