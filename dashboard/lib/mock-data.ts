// Données de DÉMONSTRATION ITRAHUB.
// Elles servent uniquement à montrer les parcours UI du périmètre Budget.
// Les structures, acteurs, statuts et règles suivent le SRS ; les montants,
// dates et exercices sont des exemples et non des valeurs validées.

import type {
  Alert,
  Budget,
  BudgetLine,
  CurrentUser,
  Entity,
  Exercise,
  Expense,
  MonthlySplit,
  Perimeter,
  ResourceBudget,
  Role,
  SignTask,
  Supplier,
} from "./types";
import { toUSD } from "./format";

export const DEMO = true;

/* ------------------------------------------------------------------ */
/* Périmètres (SRS §6.1)                                               */
/* ------------------------------------------------------------------ */
export const perimeters: Perimeter[] = [
  { id: "holding", name: "ITRACOM Holding", sector: "Holding", country: "Burundi", currency: null, isHolding: true },
  { id: "bcab", name: "BCAB", sector: "Banque", country: "Burundi", currency: "BIF" },
  { id: "fomi", name: "FOMI", sector: "Industrie", country: "Burundi", currency: "BIF" },
  { id: "ifl", name: "IFL", sector: "Industrie", country: "Tanzanie", currency: "TZS" },
  { id: "inkinzo-ag", name: "Inkinzo AG", sector: "Assurances", country: "Burundi", currency: "BIF" },
  { id: "inkinzo-vc", name: "Inkinzo VC", sector: "Assurances", country: "Burundi", currency: "BIF" },
  { id: "itrasagri", name: "ITRASAGRI", sector: "Agriculture", country: "Burundi", currency: "BIF" },
];

/* ------------------------------------------------------------------ */
/* Entités budgétaires (extrait de l'inventaire SRS §7)               */
/* ------------------------------------------------------------------ */
export const entities: Entity[] = [
  // Holding
  { id: "h-dg", code: "HLD-DG", name: "Direction générale", perimeterId: "holding", kind: "dg" },
  { id: "h-finances", code: "HLD-FIN", name: "Finances", perimeterId: "holding", kind: "direction" },
  { id: "h-rh", code: "HLD-RH", name: "Ressources humaines", perimeterId: "holding", kind: "direction" },
  { id: "h-patrimoine", code: "HLD-PAT", name: "Gestion du patrimoine", perimeterId: "holding", kind: "direction" },
  // BCAB
  { id: "b-dg", code: "BCAB-DG", name: "Direction générale", perimeterId: "bcab", kind: "dg" },
  { id: "b-finances", code: "BCAB-FIN", name: "Finances", perimeterId: "bcab", kind: "direction" },
  { id: "b-si", code: "BCAB-SI", name: "Systèmes d'information", perimeterId: "bcab", kind: "direction" },
  { id: "b-credits", code: "BCAB-CRD", name: "Crédits", perimeterId: "bcab", kind: "direction" },
  { id: "b-operations", code: "BCAB-OPS", name: "Opérations", perimeterId: "bcab", kind: "direction" },
  { id: "b-siege", code: "BCAB-SIEGE", name: "Siège", perimeterId: "bcab", kind: "implantation" },
  { id: "b-gitega", code: "BCAB-GIT", name: "BCAB Gitega", perimeterId: "bcab", kind: "implantation" },
  // FOMI
  { id: "f-dg", code: "FOMI-DG", name: "Direction générale", perimeterId: "fomi", kind: "dg" },
  { id: "f-finances", code: "FOMI-FIN", name: "Finances", perimeterId: "fomi", kind: "direction" },
  { id: "f-agronomie", code: "FOMI-AGR", name: "Agronomie", perimeterId: "fomi", kind: "direction" },
  { id: "f-technique", code: "FOMI-TEC", name: "Technique", perimeterId: "fomi", kind: "direction" },
  // IFL
  { id: "i-dg", code: "IFL-DG", name: "Direction générale", perimeterId: "ifl", kind: "dg" },
  { id: "i-compta", code: "IFL-FIN", name: "Comptabilité et finances", perimeterId: "ifl", kind: "direction" },
  { id: "i-technique", code: "IFL-TEC", name: "Technique", perimeterId: "ifl", kind: "direction" },
  // Inkinzo AG
  { id: "ia-af", code: "INAG-AF", name: "Administration et finances", perimeterId: "inkinzo-ag", kind: "direction" },
  { id: "ia-com", code: "INAG-COM", name: "Commercial", perimeterId: "inkinzo-ag", kind: "direction" },
  // Inkinzo VC
  { id: "iv-af", code: "INVC-AF", name: "Administration et finances", perimeterId: "inkinzo-vc", kind: "direction" },
  // ITRASAGRI
  { id: "s-agr", code: "SAGRI-AGR", name: "Agronomie", perimeterId: "itrasagri", kind: "direction" },
  { id: "s-fin", code: "SAGRI-FIN", name: "Finances", perimeterId: "itrasagri", kind: "direction" },
];

export function entityById(id: string): Entity | undefined {
  return entities.find((e) => e.id === id);
}
export function perimeterById(id: string): Perimeter | undefined {
  return perimeters.find((p) => p.id === id);
}

/* ------------------------------------------------------------------ */
/* Exercice et campagne (SRS §6.3)                                     */
/* ------------------------------------------------------------------ */
export const exercises: Exercise[] = [
  {
    id: "ex-2027",
    year: 2027,
    status: "en_preparation",
    groupDeadline: "2026-11-30",
    rates: { USD: 1, BIF: 2850, TZS: 2600 },
    expectedBudgets: 23,
    phase: 6,
  },
  {
    id: "ex-2026",
    year: 2026,
    status: "en_cours",
    groupDeadline: "2025-11-30",
    rates: { USD: 1, BIF: 2790, TZS: 2550 },
    expectedBudgets: 23,
    phase: 9,
  },
];

export const societyDeadlines: Record<string, string> = {
  bcab: "2026-11-15", // échéance propre BCAB (SRS §6.3)
};

/* ------------------------------------------------------------------ */
/* Catalogues / référentiels (SRS §6.4)                                */
/* ------------------------------------------------------------------ */
export const natures = [
  { id: "n1", label: "Fournitures de bureau", account: "6063", rubrique: "fonctionnement" as const },
  { id: "n2", label: "Carburant et lubrifiants", account: "6022", rubrique: "fonctionnement" as const },
  { id: "n3", label: "Matériel informatique", account: "2183", rubrique: "investissement" as const },
  { id: "n4", label: "Honoraires et conseils", account: "6226", rubrique: "fonctionnement" as const },
  { id: "n5", label: "Construction et aménagement", account: "2131", rubrique: "investissement" as const },
  { id: "n6", label: "Formation du personnel", account: "6333", rubrique: "fonctionnement" as const },
  { id: "n7", label: "Maintenance des équipements", account: "6155", rubrique: "fonctionnement" as const },
];

export const fundingSourceLabels: Record<string, string> = {
  recettes: "Recettes de l'activité",
  tresorerie: "Trésorerie propre",
  dotation: "Dotation ou avance de la holding",
  emprunt: "Emprunt",
  subvention: "Subvention ou bailleur",
  cession: "Cession de biens",
};

export const suppliers: Supplier[] = [
  { id: "sup1", name: "Bujumbura Office Supplies", category: "Fournitures" },
  { id: "sup2", name: "East Africa IT Systems", category: "Informatique" },
  { id: "sup3", name: "Great Lakes Construction", category: "BTP" },
  { id: "sup4", name: "Kigobe Services Pro", category: "Conseil" },
];

export const roles: Role[] = [
  { id: "chef_entite", name: "Chef d'entité" },
  { id: "dga", name: "Directeur général adjoint" },
  { id: "dg_societe", name: "DG de la société" },
  { id: "conseil_societe", name: "Conseil d'administration" },
  { id: "dg_holding", name: "DG de la holding" },
  { id: "conseil_holding", name: "Conseil de la holding" },
  { id: "controleur_budgetaire", name: "Contrôleur budgétaire" },
  { id: "cg_societe", name: "Contrôleur de gestion société" },
  { id: "cg_groupe", name: "Contrôleur de gestion groupe" },
  { id: "directeur_financier", name: "Directeur financier" },
  { id: "acheteur", name: "Acheteur" },
  { id: "comptable", name: "Comptable" },
  { id: "tresorier", name: "Trésorier" },
  { id: "admin_technique", name: "Administrateur technique" },
];

/* ------------------------------------------------------------------ */
/* Helpers de génération de lignes                                     */
/* ------------------------------------------------------------------ */
function equalSplit(total: number): MonthlySplit[] {
  const base = Math.floor((total / 12) * 100) / 100;
  const arr: MonthlySplit[] = [];
  let acc = 0;
  for (let m = 1; m <= 12; m++) {
    const amount = m === 12 ? Math.round((total - acc) * 100) / 100 : base;
    acc += amount;
    arr.push({ month: m, amount });
  }
  return arr;
}

let lineSeq = 0;
function line(partial: Partial<BudgetLine> & { label: string; currency: BudgetLine["currency"]; amountTTC: number }): BudgetLine {
  lineSeq += 1;
  const amountHT = partial.amountHT ?? Math.round(partial.amountTTC / 1.18);
  return {
    id: `l-${lineSeq}`,
    description: partial.description ?? partial.label,
    nature: partial.nature ?? natures[0].label,
    priority: partial.priority ?? "moyenne",
    recurrence: partial.recurrence ?? false,
    amountHT,
    tva: partial.tva ?? partial.amountTTC - amountHT,
    fundingSource: partial.fundingSource ?? "recettes",
    account: partial.account ?? null,
    rubrique: partial.rubrique ?? null,
    analytique: partial.analytique ?? null,
    split: partial.split ?? equalSplit(partial.amountTTC),
    reserved: partial.reserved,
    paid: partial.paid,
    ...partial,
  };
}

/* ------------------------------------------------------------------ */
/* Budgets de démonstration                                            */
/* ------------------------------------------------------------------ */
export const budgets: Budget[] = [
  {
    id: "bud-1",
    code: "BUD-2027-BCAB-FIN",
    entityId: "b-finances",
    perimeterId: "bcab",
    exerciseId: "ex-2027",
    status: "impute",
    locked: false,
    pendingSignatureRole: "cg_societe",
    createdBy: "A. Niyonkuru",
    createdAt: "2026-10-02T09:12:00Z",
    lines: [
      line({ label: "Renouvellement parc serveurs", currency: "BIF", amountTTC: 142000000, nature: "Matériel informatique", account: "2183", rubrique: "investissement", analytique: "SI-INFRA", priority: "haute", fundingSource: "tresorerie" }),
      line({ label: "Licences bancaires annuelles", currency: "BIF", amountTTC: 86000000, nature: "Honoraires et conseils", account: "6226", rubrique: "fonctionnement", analytique: "SI-LIC", recurrence: true, fundingSource: "recettes" }),
      line({ label: "Formation conformité du personnel", currency: "BIF", amountTTC: 24500000, nature: "Formation du personnel", account: "6333", rubrique: "fonctionnement", analytique: "RH-FORM", priority: "moyenne", fundingSource: "recettes" }),
    ],
    history: [
      { id: "h1", step: "Soumission", actor: "A. Niyonkuru", role: "Chef d'entité", date: "2026-10-05T10:00:00Z", kind: "soumission" },
      { id: "h2", step: "Visa hiérarchique", actor: "J. Bizimana", role: "Directeur", date: "2026-10-06T14:20:00Z", kind: "visa" },
      { id: "h3", step: "Imputation", actor: "M. Irakoze", role: "Contrôleur budgétaire", date: "2026-10-08T11:05:00Z", kind: "imputation" },
    ],
  },
  {
    id: "bud-2",
    code: "BUD-2027-BCAB-OPS",
    entityId: "b-operations",
    perimeterId: "bcab",
    exerciseId: "ex-2027",
    status: "arbitre",
    locked: false,
    createdBy: "C. Hakizimana",
    createdAt: "2026-10-01T08:00:00Z",
    lines: [
      line({ label: "Rénovation agence Gitega", currency: "BIF", amountTTC: 210000000, nature: "Construction et aménagement", account: "2131", rubrique: "investissement", analytique: "RES-AG", priority: "haute", fundingSource: "emprunt" }),
      line({ label: "Carburant flotte", currency: "BIF", amountTTC: 48000000, nature: "Carburant et lubrifiants", account: "6022", rubrique: "fonctionnement", analytique: "LOG", recurrence: true, fundingSource: "recettes" }),
    ],
    history: [
      { id: "h1", step: "Soumission", actor: "C. Hakizimana", role: "Chef d'entité", date: "2026-10-02T09:00:00Z", kind: "soumission" },
      { id: "h2", step: "Visa hiérarchique", actor: "J. Bizimana", role: "Directeur", date: "2026-10-03T09:00:00Z", kind: "visa" },
      { id: "h3", step: "Imputation", actor: "M. Irakoze", role: "Contrôleur budgétaire", date: "2026-10-04T09:00:00Z", kind: "imputation" },
      { id: "h4", step: "Visa de seuil", actor: "P. Nkurunziza", role: "Contrôleur de gestion société", date: "2026-10-05T09:00:00Z", kind: "visa" },
      { id: "h5", step: "Arbitrage DGA", actor: "E. Ndikumana", role: "DGA", date: "2026-10-06T09:00:00Z", kind: "arbitrage" },
      { id: "h6", step: "Arbitrage DG", actor: "S. Ndayishimiye", role: "DG de la société", date: "2026-10-07T09:00:00Z", kind: "arbitrage" },
    ],
  },
  {
    id: "bud-3",
    code: "BUD-2027-FOMI-AGR",
    entityId: "f-agronomie",
    perimeterId: "fomi",
    exerciseId: "ex-2027",
    status: "soumis",
    locked: false,
    pendingSignatureRole: "dga",
    createdBy: "L. Ntakirutimana",
    createdAt: "2026-10-03T08:00:00Z",
    lines: [
      line({ label: "Intrants agricoles campagne", currency: "BIF", amountTTC: 96000000, nature: "Fournitures de bureau", account: "6063", rubrique: "fonctionnement", priority: "critique", fundingSource: "subvention" }),
      line({ label: "Maintenance tracteurs", currency: "BIF", amountTTC: 31000000, nature: "Maintenance des équipements", account: "6155", rubrique: "fonctionnement", fundingSource: "recettes" }),
    ],
    history: [
      { id: "h1", step: "Soumission", actor: "L. Ntakirutimana", role: "Chef d'entité", date: "2026-10-04T08:00:00Z", kind: "soumission" },
    ],
  },
  {
    id: "bud-4",
    code: "BUD-2027-IFL-TEC",
    entityId: "i-technique",
    perimeterId: "ifl",
    exerciseId: "ex-2027",
    status: "brouillon",
    locked: false,
    createdBy: "R. Mushi",
    createdAt: "2026-10-09T08:00:00Z",
    lines: [
      line({ label: "Pièces de rechange ligne de production", currency: "TZS", amountTTC: 182000000, nature: "Maintenance des équipements", account: "6155", rubrique: "fonctionnement", fundingSource: "recettes" }),
    ],
    history: [],
  },
  {
    id: "bud-5",
    code: "BUD-2027-BCAB-SI",
    entityId: "b-si",
    perimeterId: "bcab",
    exerciseId: "ex-2027",
    status: "approuve",
    locked: true,
    createdBy: "G. Manirakiza",
    createdAt: "2026-09-20T08:00:00Z",
    lines: [
      line({ label: "Cœur bancaire — support éditeur", currency: "BIF", amountTTC: 158000000, nature: "Honoraires et conseils", account: "6226", rubrique: "fonctionnement", analytique: "SI-CORE", recurrence: true, fundingSource: "recettes", reserved: 44000000, paid: 12000000 }),
    ],
    history: [
      { id: "h1", step: "Soumission", actor: "G. Manirakiza", role: "Chef d'entité", date: "2026-09-21T08:00:00Z", kind: "soumission" },
      { id: "h2", step: "Imputation", actor: "M. Irakoze", role: "Contrôleur budgétaire", date: "2026-09-23T08:00:00Z", kind: "imputation" },
      { id: "h3", step: "Arbitrage DG", actor: "S. Ndayishimiye", role: "DG de la société", date: "2026-09-25T08:00:00Z", kind: "arbitrage" },
      { id: "h4", step: "Approbation du dossier", actor: "Conseil BCAB", role: "Conseil d'administration", date: "2026-09-28T08:00:00Z", kind: "approbation" },
    ],
  },
];

export function budgetById(id: string): Budget | undefined {
  return budgets.find((b) => b.id === id);
}

export function budgetTotals(b: Budget): { local: number; usd: number; currency: BudgetLine["currency"] } {
  const currency = b.lines[0]?.currency ?? "BIF";
  const local = b.lines.reduce((s, l) => s + l.amountTTC, 0);
  const usd = b.lines.reduce((s, l) => s + toUSD(l.amountTTC, l.currency), 0);
  return { local, usd, currency };
}

/* ------------------------------------------------------------------ */
/* Budgets des ressources (SRS §6.6)                                   */
/* ------------------------------------------------------------------ */
export const resourceBudgets: ResourceBudget[] = [
  {
    id: "res-bcab",
    perimeterId: "bcab",
    exerciseId: "ex-2027",
    status: "signe",
    signedBy: "D. Nahimana",
    lines: [
      { id: "r1", source: "recettes", amount: 180000000, currency: "BIF" },
      { id: "r2", source: "tresorerie", amount: 45000000, currency: "BIF" },
      { id: "r3", source: "emprunt", amount: 60000000, currency: "BIF" },
    ],
  },
  {
    id: "res-fomi",
    perimeterId: "fomi",
    exerciseId: "ex-2027",
    status: "en_preparation",
    lines: [
      { id: "r1", source: "recettes", amount: 70000000, currency: "BIF" },
      { id: "r2", source: "subvention", amount: 40000000, currency: "BIF" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Dépenses — circuit d'exécution (SRS §6.8 / §6.9)                     */
/* ------------------------------------------------------------------ */
export const expenses: Expense[] = [
  {
    id: "dep-1",
    code: "DEP-2026-BCAB-0142",
    label: "Serveurs lame — extension datacenter",
    perimeterId: "bcab",
    entityId: "b-si",
    budgetLineId: "l-10",
    supplier: "East Africa IT Systems",
    amount: 44000000,
    currency: "BIF",
    status: "engagee",
    invoiceStatus: undefined,
    quotesCount: 3,
    quotesRequired: 3,
    steps: [
      { id: "s1", label: "Demande de dépense", actor: "G. Manirakiza", role: "Chef d'entité", date: "2026-10-01T08:00:00Z", done: true },
      { id: "s2", label: "Bon de commande", actor: "V. Nizigiyimana", role: "Acheteur", date: "2026-10-03T08:00:00Z", done: true },
      { id: "s3", label: "Réception / service fait", actor: "G. Manirakiza", role: "Chef d'entité", date: null, done: false },
      { id: "s4", label: "Liquidation", actor: "F. Ndayizeye", role: "Comptable", date: null, done: false },
      { id: "s5", label: "Ordonnancement", actor: "S. Ndayishimiye", role: "DG de la société", date: null, done: false },
      { id: "s6", label: "Paiement enregistré", actor: "T. Barankitse", role: "Trésorier", date: null, done: false },
    ],
  },
  {
    id: "dep-2",
    code: "DEP-2026-BCAB-0143",
    label: "Mobilier agence Gitega",
    perimeterId: "bcab",
    entityId: "b-operations",
    budgetLineId: "l-4",
    supplier: "Bujumbura Office Supplies",
    amount: 9800000,
    currency: "BIF",
    status: "soldee",
    invoiceStatus: "payee",
    quotesCount: 1,
    quotesRequired: 1,
    steps: [
      { id: "s1", label: "Demande de dépense", actor: "C. Hakizimana", role: "Chef d'entité", date: "2026-09-10T08:00:00Z", done: true },
      { id: "s2", label: "Bon de commande", actor: "V. Nizigiyimana", role: "Acheteur", date: "2026-09-12T08:00:00Z", done: true },
      { id: "s3", label: "Réception / service fait", actor: "C. Hakizimana", role: "Chef d'entité", date: "2026-09-20T08:00:00Z", done: true },
      { id: "s4", label: "Liquidation", actor: "F. Ndayizeye", role: "Comptable", date: "2026-09-22T08:00:00Z", done: true },
      { id: "s5", label: "Ordonnancement", actor: "S. Ndayishimiye", role: "DG de la société", date: "2026-09-24T08:00:00Z", done: true },
      { id: "s6", label: "Paiement enregistré", actor: "T. Barankitse", role: "Trésorier", date: "2026-09-26T08:00:00Z", done: true },
    ],
  },
  {
    id: "dep-3",
    code: "DEP-2026-FOMI-0051",
    label: "Prestation d'audit agronomique",
    perimeterId: "fomi",
    entityId: "f-agronomie",
    budgetLineId: "l-6",
    supplier: "Kigobe Services Pro",
    amount: 15600000,
    currency: "BIF",
    status: "engagee",
    invoiceStatus: "liquidee",
    quotesCount: 1,
    quotesRequired: 3,
    derogation: "Fournisseur unique titulaire du marché-cadre en cours sur l'exercice 2026.",
    steps: [
      { id: "s1", label: "Demande de dépense", actor: "L. Ntakirutimana", role: "Chef d'entité", date: "2026-09-28T08:00:00Z", done: true },
      { id: "s2", label: "Bon de commande", actor: "V. Nizigiyimana", role: "Acheteur", date: "2026-09-30T08:00:00Z", done: true },
      { id: "s3", label: "Réception / service fait", actor: "L. Ntakirutimana", role: "Chef d'entité", date: "2026-10-05T08:00:00Z", done: true },
      { id: "s4", label: "Liquidation", actor: "F. Ndayizeye", role: "Comptable", date: "2026-10-07T08:00:00Z", done: true },
      { id: "s5", label: "Ordonnancement", actor: "S. Ndayishimiye", role: "DG de la société", date: null, done: false },
      { id: "s6", label: "Paiement enregistré", actor: "T. Barankitse", role: "Trésorier", date: null, done: false },
    ],
  },
];

export function expenseById(id: string): Expense | undefined {
  return expenses.find((e) => e.id === id);
}

/* ------------------------------------------------------------------ */
/* Alertes (SRS §6.10 — max 6 affichées)                               */
/* ------------------------------------------------------------------ */
export const alerts: Alert[] = [
  { id: "a1", severity: "rouge", message: "Ligne « Cœur bancaire » de l'exercice en cours dépasse son crédit", target: "Ouvrir le budget", href: "/budget/budgets/bud-5", scope: "BCAB" },
  { id: "a2", severity: "rouge", message: "IFL — échéance dépassée, 1 budget non soumis", target: "Voir les budgets", href: "/budget/budgets?perimetre=ifl", scope: "IFL" },
  { id: "a3", severity: "orange", message: "FOMI — dépôt dans 12 jours, 2 budgets non soumis", target: "Voir les budgets", href: "/budget/budgets?perimetre=fomi", scope: "FOMI" },
  { id: "a4", severity: "orange", message: "BCAB — dépenses supérieures aux ressources sur l'emprunt", target: "Arbitrer", href: "/budget/ressources?perimetre=bcab", scope: "BCAB" },
  { id: "a5", severity: "info", message: "ITRASAGRI — société sans budget des ressources", target: "Voir", href: "/budget/ressources?perimetre=itrasagri", scope: "ITRASAGRI" },
  { id: "a6", severity: "info", message: "1 bon de commande en dérogation émis dans les 7 derniers jours", target: "Voir les dépenses", href: "/budget/depenses?filtre=derogation", scope: "FOMI" },
  { id: "a7", severity: "info", message: "Inkinzo VC — budgets non soumis, dépôt dans 28 jours", target: "Voir les budgets", href: "/budget/budgets?perimetre=inkinzo-vc", scope: "Inkinzo VC" },
];

/* ------------------------------------------------------------------ */
/* Tâches à signer (compteur « À signer », NFR-UX-02)                  */
/* ------------------------------------------------------------------ */
export const signTasks: SignTask[] = [
  { id: "t1", label: "Visa de seuil — BUD-2027-BCAB-FIN", sub: "BCAB · Finances · 252 500 000 BIF", kind: "Visa de seuil", amount: 252500000, currency: "BIF", href: "/budget/budgets/bud-1" },
  { id: "t2", label: "Arbitrage DGA — BUD-2027-FOMI-AGR", sub: "FOMI · Agronomie · en arbitrage", kind: "Arbitrage", amount: 127000000, currency: "BIF", href: "/budget/budgets/bud-3" },
  { id: "t3", label: "Ordonnancement — DEP-2026-FOMI-0051", sub: "FOMI · facture liquidée à ordonnancer", kind: "Ordonnancement", amount: 15600000, currency: "BIF", href: "/budget/depenses/dep-3" },
];

/* ------------------------------------------------------------------ */
/* Utilisateur de démonstration (session simulée)                      */
/* ------------------------------------------------------------------ */
export const demoUser: CurrentUser = {
  matricule: "ITC-0042",
  name: "Aline Niyonkuru",
  jobTitle: "Contrôleur de gestion groupe",
  email: "a.niyonkuru@itracom.bi",
  perimeterId: "holding",
  perimeterName: "ITRACOM Holding",
  roles: ["cg_groupe", "controleur_budgetaire"],
  isGroupRole: true,
};

/** Matricules reconnus pour la démonstration du parcours de connexion. */
export const knownMatricules: Record<string, { name: string; email: string }> = {
  "ITC-0042": { name: "Aline Niyonkuru", email: "a•••••@itracom.bi" },
  "ITC-0108": { name: "Serge Ndayishimiye", email: "s•••••@itracom.bi" },
};
