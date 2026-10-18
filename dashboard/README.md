# ITRAHUB — Dashboard web (socle UI/UX)

Interface de travail du périmètre **budgétaire** de la finance pour ITRACOM
Holding. Première version UI/UX : parcours de connexion simulé, navigation
finance (Prévision / Budget / Exécution) et contenu métier regroupé sous
**Budget**, conformément au référentiel `ITRAHUB_SCOPE_DEVELOPPEMENT.md` (v2.1)
et au SRS de gestion budgétaire.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS 4
- Police Urbanist, palette et densité de la charte graphique

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
```

Connexion de démonstration : matricule **ITC-0042** (ou **ITC-0108**), code
email **480192**, puis tout mot de passe d'au moins 4 caractères.

## Limites de cette version

- **Démonstration UI** : aucun email, aucune persistance ni authentification
  réelle ne sont raccordés. Les données sont des exemples identifiés.
- **Prévision** et **Exécution** n'affichent qu'un message « en cours de
  développement ». Tout le contenu métier du SRS est accessible sous **Budget**.
- Les décisions ouvertes (D-01 à D-18) sont signalées dans l'interface et ne
  sont pas tranchées silencieusement.

## Structure

```
app/
  login/                 Parcours matricule → code email → mot de passe
  (app)/
    dashboard/           Votre journée, avancement, alertes, sociétés
    prevision/           Page « en cours de développement »
    execution/           Page « en cours de développement »
    budget/
      exercices/         Exercices, taux figés, 10 phases de campagne
      budgets/ [id]/     Liste + dossier (lignes, calendrier, circuit, signatures)
      signatures/        « À signer » (tâches autorisées)
      ressources/        Équilibre par source, déficit
      societes/          Dossiers des sociétés, approbation
      consolidation/     Total USD, trois signatures, adoption
      depenses/ [id]/    Circuit demande → paiement enregistré
      credit/            Suivi des crédits, virements, rectificatifs
      referentiels/      Organisation, rôles, natures, sources, fournisseurs
      historique/        Journal des décisions
components/              app-shell, sidebar, topbar, command palette, UI
lib/                     types, données de démonstration, i18n, format, labels
```
