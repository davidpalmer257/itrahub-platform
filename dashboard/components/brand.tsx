import type { CSSProperties } from "react";

/**
 * Logo ITRACOM Holding — identité du groupe, affiché en tête de la navigation.
 * Version provisoire dessinée pour le projet : à remplacer par le fichier officiel
 * du groupe dès qu'il est fourni.
 */
export function ItracomMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true" focusable="false">
      <circle cx="18" cy="18" r="18" fill="var(--accent)" />
      <circle cx="18" cy="18" r="14.6" stroke="var(--on-accent)" strokeOpacity=".45" strokeWidth="1" />
      <path d="M11.5 9.5h13v3h-4.9v11h4.9v3h-13v-3h4.9v-11h-4.9z" fill="var(--on-accent)" />
    </svg>
  );
}

export function ItracomLogo({ className = "" }: { className?: string }) {
  const wordmark: CSSProperties = { color: "var(--ink)" };
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} role="img" aria-label="ITRACOM Holding">
      <ItracomMark />
      <span className="flex flex-col leading-none" style={wordmark}>
        <span className="text-[17px] font-bold tracking-[0.06em]">ITRACOM</span>
        <span className="mt-[5px] text-[10.5px] font-medium tracking-[0.34em]" style={{ color: "var(--slate)" }}>
          HOLDING
        </span>
      </span>
    </span>
  );
}

/** Icône de la plateforme ITRAHUB : un H dont le montant droit porte le point de convergence du hub. */
export function PlatformMark({ size = 28, inverted = false }: { size?: number; inverted?: boolean }) {
  const bg = inverted ? "#e2e8f0" : "#0f172a";
  const fg = inverted ? "#0f172a" : "#ffffff";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill={bg} />
      <rect x="17" y="18" width="8" height="30" rx="2" fill={fg} />
      <rect x="39" y="26" width="8" height="22" rx="2" fill={fg} />
      <rect x="24" y="30" width="16" height="7" fill={fg} />
      <circle cx="43" cy="17" r="5.5" fill={fg} />
    </svg>
  );
}
