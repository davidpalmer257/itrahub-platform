import type { Currency } from "./types";

// Taux budgétaires figés de l'exercice de démonstration (1 USD = taux).
// Exemple de données, non une valeur permanente (FR-CAM-02).
export const DEMO_RATES: Record<Currency, number> = {
  USD: 1,
  BIF: 2850,
  TZS: 2600,
};

/** Conversion au taux figé : montantUSD = montantC ÷ rC (FR-BUD-03). */
export function toUSD(amount: number, from: Currency, rates = DEMO_RATES): number {
  return amount / rates[from];
}

/** montantT = montantC × rT ÷ rC (FR-BUD-03). */
export function convert(
  amount: number,
  from: Currency,
  to: Currency,
  rates = DEMO_RATES,
): number {
  return (amount * rates[to]) / rates[from];
}

const LOCALE: Record<string, string> = {
  fr: "fr-FR",
  en: "en-US",
  pt: "pt-PT",
};

export function formatAmount(
  amount: number,
  currency: Currency,
  lang = "fr",
): string {
  const fractionDigits = currency === "USD" ? 2 : 0;
  const n = new Intl.NumberFormat(LOCALE[lang] ?? "fr-FR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
  return `${n} ${currency}`;
}

export function formatNumber(n: number, lang = "fr"): string {
  return new Intl.NumberFormat(LOCALE[lang] ?? "fr-FR").format(n);
}

export function formatDate(iso: string, lang = "fr"): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(LOCALE[lang] ?? "fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formatDateTime(iso: string, lang = "fr"): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(LOCALE[lang] ?? "fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function daysUntil(iso: string, now = new Date()): number {
  const d = new Date(iso);
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}
