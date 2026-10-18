"use client";

import { AlertCircle, RotateCcw } from "lucide-react";
import { SecondaryButton } from "@/components/ui";

export function LoadingState({ label = "Chargement en cours…" }: { label?: string }) {
  return (
    <section className="ui-loading-state px-4 py-8 sm:px-6" role="status" aria-live="polite" aria-busy="true">
      <p className="text-[14px] leading-[21px]" style={{ color: "var(--slate)" }}>{label}</p>
      <div className="mt-6 max-w-3xl space-y-4" aria-hidden="true">
        <div className="skeleton h-5 w-2/5" />
        <div className="skeleton h-3 w-3/4" />
        <div className="mt-6 divide-y border-y" style={{ borderColor: "var(--line-soft)" }}>
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="flex items-center gap-4 py-4">
              <div className="skeleton h-3 flex-1" />
              <div className="skeleton h-3 w-16 sm:w-28" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ErrorState({
  title = "Impossible d’afficher cette page",
  description = "Une erreur est survenue lors du chargement. Réessayez pour continuer.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <section className="ui-error-state flex min-h-[300px] flex-col items-center justify-center px-4 py-10 text-center sm:px-6">
      <div role="alert" className="flex max-w-md flex-col items-center">
        <AlertCircle size={28} className="mb-4" style={{ color: "var(--slate)" }} aria-hidden="true" />
        <h1 className="text-[20px] font-semibold leading-7" style={{ color: "var(--ink)" }}>{title}</h1>
        <p className="mt-2 text-[14px] leading-[21px]" style={{ color: "var(--slate)" }}>{description}</p>
      </div>
      {onRetry ? (
        <div className="mt-5">
          <SecondaryButton onClick={onRetry}>
            <RotateCcw size={15} aria-hidden="true" /> Réessayer
          </SecondaryButton>
        </div>
      ) : null}
    </section>
  );
}
