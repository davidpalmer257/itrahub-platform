// Types du domaine budgétaire ITRAHUB (périmètre Budget du SRS).
// Objets et relations logiques ; ne préjuge pas d'un schéma de base de données.

export type Lang = "fr" | "en" | "pt";

export type Currency = "BIF" | "TZS" | "USD";

export type Priority = "basse" | "moyenne" | "haute" | "critique";

/** Six statuts d'un budget d'entité (SRS §6.5). Libellés repris de la source. */
export type BudgetStatus =
  | "brouillon"
  | "soumis"
  | "vise"
  | "impute"
  | "arbitre"
  | "approuve";

export type ExerciseStatus =
  | "en_preparation"
  | "en_cours"
  | "cloture"
  | "archive";

export type ExpenseStatus = "demandee" | "engagee" | "soldee" | "annulee";

export type InvoiceStatus =
  | "liquidee"
  | "ordonnancee"
  | "payee"
  | "rejetee";

export type RubriqueCategory =
  | "fonctionnement"
  | "investissement"
  | "recettes"
  | "projet"
  | "financement"
  | "autre";

export type FundingSourceType =
  | "recettes"
  | "tresorerie"
  | "dotation"
  | "emprunt"
  | "subvention"
  | "cession";

export type AlertSeverity = "rouge" | "orange" | "info";

export interface Perimeter {
  id: string;
  name: string;
  sector: string;
  country: string;
  currency: Currency | null;
  isHolding?: boolean;
}

export interface Entity {
  id: string;
  code: string;
  name: string;
  perimeterId: string;
  kind: "etat_major" | "dga" | "direction" | "service" | "implantation" | "dg";
}

export interface Exercise {
  id: string;
  year: number;
  status: ExerciseStatus;
  groupDeadline: string;
  rates: { BIF: number; TZS: number; USD: number };
  expectedBudgets: number;
  phase: number; // 1..10
}

export interface MonthlySplit {
  month: number; // 1..12
  amount: number;
}

export interface BudgetLine {
  id: string;
  label: string;
  description: string;
  nature: string;
  priority: Priority;
  recurrence: boolean;
  currency: Currency;
  amountHT: number;
  tva: number;
  amountTTC: number;
  fundingSource: FundingSourceType;
  account: string | null;
  rubrique: RubriqueCategory | null;
  analytique: string | null;
  split: MonthlySplit[];
  reserved?: number; // crédit réservé (suivi d'exécution)
  paid?: number;
}

export interface SignatureEvent {
  id: string;
  step: string;
  actor: string;
  role: string;
  date: string;
  delegated?: boolean;
  reason?: string; // motif de renvoi
  kind: "visa" | "imputation" | "arbitrage" | "approbation" | "soumission" | "renvoi";
}

export interface Budget {
  id: string;
  code: string;
  entityId: string;
  perimeterId: string;
  exerciseId: string;
  status: BudgetStatus;
  lines: BudgetLine[];
  history: SignatureEvent[];
  locked: boolean;
  pendingSignatureRole?: string;
  createdBy: string;
  createdAt: string;
}

export interface ResourceLine {
  id: string;
  source: FundingSourceType;
  amount: number;
  currency: Currency;
}

export interface ResourceBudget {
  id: string;
  perimeterId: string;
  exerciseId: string;
  status: "en_preparation" | "signe" | "approuve";
  lines: ResourceLine[];
  signedBy?: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
}

export interface ExpenseStep {
  id: string;
  label: string;
  actor: string;
  role: string;
  date: string | null;
  done: boolean;
}

export interface Expense {
  id: string;
  code: string;
  label: string;
  perimeterId: string;
  entityId: string;
  budgetLineId: string;
  supplier: string;
  amount: number;
  currency: Currency;
  status: ExpenseStatus;
  invoiceStatus?: InvoiceStatus;
  quotesCount: number;
  quotesRequired: number;
  derogation?: string;
  steps: ExpenseStep[];
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  message: string;
  target: string; // libellé de destination
  href: string;
  scope: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface CurrentUser {
  matricule: string;
  name: string;
  jobTitle: string;
  email: string;
  perimeterId: string;
  perimeterName: string;
  roles: string[]; // ids de rôles
  isGroupRole: boolean;
}

export interface SignTask {
  id: string;
  label: string;
  sub: string;
  kind: string;
  amount?: number;
  currency?: Currency;
  href: string;
}
