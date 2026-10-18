# ITRAHUB — Guide de marque

**Version 1.0 — 18 octobre 2026**
Document de référence pour reproduire l'identité visuelle d'ITRAHUB et d'ITRACOM Holding dans l'application et hors de l'application.

> **Statut des logos : provisoires.**
> Le logo d'ITRACOM Holding et l'icône de la plateforme ont été dessinés pour ce projet. Aucun fichier officiel du groupe n'avait été fourni. Dès qu'un logo officiel existe, il remplace le logo ITRACOM décrit ici (voir « Remplacer le logo officiel »).

---

## 1. Contenu de ce dossier

```
branding/
├── BRAND_GUIDE.md                  Ce document
├── apercu-logos.html               Planche d'aperçu de tous les logos
├── logos/
│   ├── itracom-holding-logo.svg            Logo horizontal, fond clair
│   ├── itracom-holding-logo-inverse.svg    Logo horizontal, fond sombre
│   ├── itracom-holding-mark.svg            Symbole seul, fond clair
│   └── itracom-holding-mark-inverse.svg    Symbole seul, fond sombre
├── icons/
│   ├── itrahub-icon.svg                    Icône de la plateforme
│   └── itrahub-icon-inverse.svg            Icône de la plateforme, version claire
├── png/                            Exports transparents (voir § 3)
└── tokens/
    ├── itrahub-tokens.css          Variables CSS de la marque
    └── itrahub-tokens.json         Mêmes valeurs, format neutre
```

**Fichiers sources dans l'application** (à garder synchronisés) :

| Élément | Emplacement |
|---|---|
| Logo ITRACOM et icône de la plateforme (composants) | `dashboard/components/brand.tsx` |
| Favicon de l'onglet | `dashboard/app/icon.svg` |
| Jetons de couleur, typographie, formes | `dashboard/app/globals.css` |

Les fichiers `.svg` de ce dossier ont le **texte converti en tracés vectoriels** : ils s'affichent identiquement sans installer la police.

---

## 2. Les deux identités

ITRAHUB porte deux marques distinctes, qui ne se mélangent pas.

| | **ITRACOM Holding** | **ITRAHUB** |
|---|---|---|
| Rôle | Marque du groupe (le client) | Marque du logiciel |
| Forme | Cercle | Carré arrondi |
| Symbole | Un « I » à empattements dans un anneau | Un « H » dont le montant droit est surmonté d'un point |
| Où | En tête de la navigation, rail replié | Onglet du navigateur, page de connexion, icône d'installation |

### 2.1 Logo ITRACOM Holding

- **Symbole** : disque `#0F172A`, anneau intérieur blanc à 45 % d'opacité, « I » à empattements blanc.
- **Mot-symbole** : « ITRACOM » en Urbanist **Bold 700**, espacement des lettres 0,06 em ; « HOLDING » en Urbanist **Medium 500**, espacement 0,34 em, en `#334155`.
- **Proportions** : symbole 36 unités, écart de 10 unités avec le texte, ITRACOM à 17 unités de corps, HOLDING à 10,5 unités. Le bloc de texte est centré verticalement sur le symbole.
- **Zone de protection** (recommandation) : laisser libre, autour du logo, au moins la hauteur du « I » du symbole, soit environ 14 unités sur 36 (un peu plus du tiers de la hauteur du logo).
- **Taille minimale** (recommandation) : logo horizontal 28 px de haut à l'écran (l'application l'affiche à 36 px). Symbole seul : 16 px.

### 2.2 Icône ITRAHUB

- Carré arrondi (rayon 14 sur 64), fond `#0F172A`, « H » blanc dont le montant droit est plus court, surmonté d'un point (le point de convergence du « hub »).
- Géométrie sur grille 64 × 64 : montant gauche `x17 y18 l8 h30` ; montant droit `x39 y26 l8 h22` ; barre `x24 y30 l16 h7` (elle chevauche les montants pour éviter une couture à l'affichage) ; point `cx43 cy17 r5.5`.
- **Taille minimale** (recommandation) : 16 px (favicon). Elle reste lisible à cette taille.

> **Attention à la lecture.** Le « H » surmonté d'un point peut se lire « Hi ». Si ce clin d'œil ne convient pas, c'est la première chose à retoucher (par exemple en retirant le point).

---

## 3. Choisir le bon fichier

| Usage | Fichier |
|---|---|
| Interface web, sur fond clair | `logos/itracom-holding-logo.svg` |
| Interface web, sur fond sombre | `logos/itracom-holding-logo-inverse.svg` |
| Avatar, rail replié | `logos/itracom-holding-mark.svg` |
| Favicon, onglet | `icons/itrahub-icon.svg` (déjà dans `app/icon.svg`) |
| Icône d'installation (PWA) | `png/itrahub-icon-192.png` et `png/itrahub-icon-512.png` |
| iOS (écran d'accueil) | `png/itrahub-icon-180.png` |
| Document, présentation, courriel | `png/itracom-holding-logo.png` (1050 × 288) |

Les PNG ont un fond transparent. Préférez toujours le SVG quand le support le permet.

**À ne pas faire** : étirer ou déformer, changer les couleurs, ajouter une ombre, un dégradé ou un contour, faire pivoter, placer le logo clair sur un fond clair (ou l'inverse), redessiner le texte dans une autre police.

---

## 4. Typographie

**Police : Urbanist** (Google Fonts, licence SIL Open Font License 1.1 — libre pour un usage commercial et l'intégration web). Elle est chargée dans l'application par `next/font/google`. Pour un usage hors application, téléchargez-la sur Google Fonts.

| Style | Taille / interligne | Graisse | Usage |
|---|---|---|---|
| Heading 01 | 22 px / 28 px | 600 | Titres de page et de dossier |
| Heading 02 | 32 px / 40 px | 600 | Usage exceptionnel (valeur de synthèse) |
| Paragraphe | 14 px / 20 px | 400 | Texte courant, lignes, champs |
| Libellé et action | 14 px / 20 px | 500 | Boutons, onglets, navigation |
| Texte secondaire | 14 px / 20 px | 400 | Indications, en couleur secondaire |
| Méta-donnée | 12 px / 16 px | 400 | Références, dates, aides courtes |
| En-tête de tableau | 12 px / 18 px | 600 | Titres de colonnes |

- Les montants utilisent des **chiffres tabulaires** (`font-variant-numeric: tabular-nums`) pour s'aligner en colonne, et la devise est toujours affichée avec le montant.
- Hiérarchie HTML logique (h1 puis h2) indépendante du nom des styles.

> **Écart avec la charte d'origine** : le texte secondaire était en graisse 300. Il est passé à 400 pour la lisibilité.

---

## 5. Couleurs

### 5.1 Palette de la charte

| Repère | Valeur | Nom | Usage |
|---|---|---|---|
| A | `#0F172A` | `ink` | Texte principal, montants, action principale |
| B | `#334155` | `slate` | Texte secondaire lisible, icônes, contrôles |
| C | `#94A3B8` | `mutedDecor` | Repères décoratifs et éléments désactivés **uniquement** |
| D | `#E2E8F0` | `line` | Bordures et séparateurs |
| E | `#F8FAFC` | `surface` | Fond de travail, survol léger |
| — | `#FFFFFF` | `panel` | Panneaux |

### 5.2 Extensions apportées par l'itération de design

| Nom | Valeur | Usage |
|---|---|---|
| `muted` | `#647385` | Texte de support (remplace C pour tout texte lisible) |
| `background` | `#EEF4F8` | Fond de l'espace de travail |
| `selected` | `#E6F0FB` | Élément sélectionné |
| `navBackground` | `#EDF3F8` | Navigation, tiroir mobile |
| `navActive` | `#293D49` | Entrée de navigation active, compteurs |
| `link` | `#216EAF` | Liens |
| `focusRing` | `#2374B5` | Anneau de focus clavier |

### 5.3 Couleurs sémantiques (significations métier du SRS)

| Rôle | Texte | Fond doux | Signification |
|---|---|---|---|
| Rouge | `#B91C1C` | `#FEF2F2` | Dépassement de crédit, échéance dépassée |
| Orange | `#C2660C` | `#FFF7ED` | Déficit de ressources, dépôt proche |
| Vert | `#15803D` | `#F0FDF4` | État conforme |

**Règle** : ces trois couleurs ne servent qu'à leur signification métier. Elles ne décorent jamais. Toujours les accompagner d'un libellé ou d'une icône, jamais de la couleur seule. Les valeurs hexadécimales n'étaient pas fournies par la charte : elles sont à valider avec le client.

### 5.4 Contrastes vérifiés (WCAG 2.1)

| Combinaison | Ratio | Verdict |
|---|---|---|
| `ink` sur blanc | 17,85 : 1 | AA |
| `slate` sur blanc | 10,35 : 1 | AA |
| `muted` sur blanc | 4,85 : 1 | AA |
| `muted` sur fond `#EEF4F8` | 4,37 : 1 | AA pour grand texte seulement |
| **C `#94A3B8` sur blanc** | **2,56 : 1** | **Insuffisant — ne jamais l'utiliser pour du texte** |
| Blanc sur `navActive` | 11,30 : 1 | AA |
| `link` sur blanc | 5,37 : 1 | AA |
| Vert sur son fond doux | 4,79 : 1 | AA |
| Rouge sur son fond doux | 5,91 : 1 | AA |
| **Orange sur son fond doux** | **3,80 : 1** | **Sous 4,5 : 1 pour le petit texte (badges)** |

**Point d'attention connu** : le texte orange des badges n'atteint pas le seuil AA pour du petit texte. Pour le corriger, assombrir l'orange vers `#A8530A` (5,06 : 1 sur son fond doux, 5,38 : 1 sur blanc). Non appliqué : la valeur d'origine n'a pas été validée par le client.

### 5.5 Mode sombre

Il répond à un besoin du SRS, mais **la charte ne fournit pas de valeurs**. Celles de `tokens/` sont une interprétation neutre, à faire valider. Dans ce mode, l'action principale s'inverse : fond `#E2E8F0`, texte `#0F172A`. Les logos disposent d'une version inversée.

---

## 6. Principes visuels

- Outil de travail : **précis, calme, dense, soigné**.
- Thème clair, surfaces presque plates, séparateurs subtils, alignements réguliers.
- **Exclus** : dégradés décoratifs, effets de verre, halos, ombres marquées, illustrations d'accueil, successions de grandes cartes d'indicateurs.
- **Une seule action principale par écran** ; les autres actions restent au second plan.
- Formes : rayon 4 px pour les contrôles et panneaux, 6 px pour les icônes du rail.
- Cibles tactiles d'au moins 44 px sur téléphone.
- Les couleurs d'état sont toujours doublées d'un libellé (accessibilité).

---

## 7. Dénominations à respecter

| Écrire | Ne pas écrire |
|---|---|
| ITRAHUB | Itrahub, iTraHub |
| ITRACOM Holding | Itracom, ITRACOM HOLDING (hors logo) |
| Finances (département) | Finance, Département finance |
| Prévision · Budget · Exécution | — |

Le mot « exécution » dans le métier (étape du cycle budgétaire) est distinct du composant de navigation **Exécution**.

---

## 8. Remplacer le logo officiel

Quand le groupe fournit son logo :

1. Ajouter ses fichiers dans `logos/` (SVG vectoriel de préférence, versions claire et sombre).
2. Dans `dashboard/components/brand.tsx`, remplacer le contenu de `ItracomMark` et `ItracomLogo` par le nouveau tracé. Conserver les noms et les signatures (`size`, `className`) : tout le reste de l'application les utilise sans modification.
3. Remplacer `png/itracom-holding-*.png`.
4. Mettre à jour la section 2.1 de ce guide, et retirer la mention « provisoire ».

L'icône ITRAHUB (`icons/`, `app/icon.svg`) est indépendante : elle n'est pas concernée.

---

## 9. Régénérer les fichiers

Les logos SVG et PNG ont été produits par script : le texte est converti en tracés à partir d'Urbanist (graisses 700 et 500), puis les PNG sont rastérisés depuis les SVG. En cas de modification de la géométrie, modifier les SVG puis régénérer les PNG avec un moteur de rendu SVG (par exemple `resvg`). Ne pas passer par une capture d'écran du navigateur : elle a produit des fichiers rognés et vides lors de la création de ce kit.

---

## 10. Sauvegarde

Ce dossier est la copie de référence de la marque. Le projet **n'est pas sous gestion de versions** (pas de dépôt Git) : une archive `ITRAHUB_Brand_Kit_v1.0.zip` est fournie à côté du dossier. Conservez-la hors du poste de travail (disque externe, stockage d'entreprise), et envisagez d'initialiser un dépôt Git pour l'ensemble du projet.

---

## 11. Points ouverts

- **Logo officiel d'ITRACOM Holding** : à fournir par le groupe.
- **Lecture « Hi »** de l'icône ITRAHUB : à valider.
- **Valeurs du mode sombre** et **valeurs hexadécimales des couleurs sémantiques** : à valider avec le client.
- **Contraste de l'orange** sur son fond doux (3,80 : 1) : à corriger si le client valide un orange plus foncé.
- **Graisse du texte secondaire** : passée de 300 à 400 par rapport à la charte.
