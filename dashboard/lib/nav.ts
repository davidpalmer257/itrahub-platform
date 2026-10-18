import {
  CalendarRange,
  FolderKanban,
  Gauge,
  Layers,
  ListChecks,
  PenLine,
  ReceiptText,
  Scale,
  Wallet,
} from "lucide-react";
import type { ComponentType } from "react";

export interface NavLink {
  href: string;
  labelKey: string;
  icon: ComponentType<{ size?: number | string }>;
}

// Sous-menu du composant Budget. Chaque entrée ouvre la page « en cours de développement ».
export const budgetNav: NavLink[] = [
  { href: "/dashboard", labelKey: "nav.dashboard", icon: Gauge },
  { href: "/budget/exercices", labelKey: "nav.exercices", icon: CalendarRange },
  { href: "/budget/budgets", labelKey: "nav.budgets", icon: Wallet },
  { href: "/budget/signatures", labelKey: "nav.signatures", icon: PenLine },
  { href: "/budget/ressources", labelKey: "nav.ressources", icon: Scale },
  { href: "/budget/societes", labelKey: "nav.societes", icon: FolderKanban },
  { href: "/budget/consolidation", labelKey: "nav.consolidation", icon: Layers },
  { href: "/budget/depenses", labelKey: "nav.depenses", icon: ReceiptText },
  { href: "/budget/credit", labelKey: "nav.credit", icon: ListChecks },
];
