/** Les modules Prévision, Budget et Exécution restent accessibles sans contenu métier. */
export function InDevelopment() {
  return (
    <div className="flex min-h-[65vh] items-center justify-center px-6 text-center">
      <h1 className="text-[15px] font-normal leading-6" style={{ color: "var(--ink)" }}>
        Page en cours de développement. Aucun contenu à afficher pour le moment.
      </h1>
    </div>
  );
}
