# ITRAHUB — Périmètre et instructions de développement

**Référence de travail pour l’équipe de développement, Codex et Claude Code**  
**Version 2.1 — 17 octobre 2026**

## 1. Mandat de développement

Construire le socle de l’application ITRAHUB et son interface de travail, en commençant par le périmètre budgétaire de la finance. La finance s’organise autour de trois composants : **Prévision, Budget et Exécution**. La première réalisation porte sur la structure UI/UX et sur l’intégralité des parcours du SRS, accessibles dans le composant **Budget**. **Prévision** et **Exécution** restent deux entrées de navigation affichant uniquement une page en cours de développement. Elle ne consiste pas à développer l’ensemble de l’ERP.

Les règles fonctionnelles conservées ici définissent le comportement que les écrans et, lors de leur raccordement, les traitements doivent respecter. Une interface démontrant un parcours ne doit pas être présentée comme un traitement métier opérationnel si les signatures, droits, calculs ou données correspondants ne sont pas réellement raccordés.

Ce document donne les instructions de réalisation. Il ne contient pas de formulaire de validation client. Les validations mentionnées dans les circuits ci-dessous sont les actes métier de visa, d’arbitrage, d’approbation et d’adoption.

### 1.1 Références réunies

| Référence fournie | Utilisation dans ce document |
| --- | --- |
| ITRAHUB SRS Gestion Budgetaire.docx | Exigences métier, organisation, acteurs, calculs, circuits, statuts, données, scénarios et décisions encore ouvertes |
| ITRAHUB_Charte_graphique_Specifications_UI_UX_FR(1).docx | Typographie, palette et direction artistique |
| ITRAHUB_BUILD_INSTRUCTIONS(1).md | Contexte du produit, stack et parcours de connexion |
| dashboardmoodboard(1).jpg | Référence de composition et de densité du dashboard |
| Instruction de périmètre accompagnant les fichiers | Socle ERP et UI/UX ; démarrage par la finance et ses composants budgétaires |

Les informations des documents sont réunies sans ajout d’un catalogue ERP, de règles financières externes ni d’intégrations supposées. Les identifiants FR, NFR, PR, D et AT du SRS sont conservés pour retrouver les exigences.

### 1.2 Lecture et priorité des instructions

- La limite de livraison donnée dans le mandat ci-dessus encadre le développement : socle et périmètre budgétaire de la finance. La consigne de regroupement en section 2.2 prévaut sur les anciens libellés de navigation : tout le contenu du SRS est accessible sous Budget ; Prévision et Exécution affichent uniquement leur message de développement.
- Le SRS décrit la logique métier. Il complète les anciennes instructions qui indiquaient encore les rôles, les calculs ou le dashboard comme non définis.
- La charte détermine l’identité visuelle. Le moodboard guide la composition ; ses fonctions et son contenu ne sont pas des exigences produit.
- **FR et NFR** : exigences à respecter pour les parcours concernés, avec leurs réserves explicites.
- **D** : décisions encore ouvertes dans le SRS. Leur présence dans le document client ne fournit pas leur réponse.
- **PR** : propositions déjà présentes dans le SRS, regroupées en section 10. Elles ne constituent pas des développements supplémentaires autorisés par cette consolidation.
- **AT** : scénarios de vérification à appliquer aux comportements effectivement réalisés ; ils ne sont pas des tests déjà exécutés.

Ne résous pas une contradiction en inventant une règle métier. Poursuis les parties définies et signale la dépendance précise lorsqu’une décision conditionne un calcul ou une transition.

## 2. Produit et limites de la première réalisation

### 2.1 Contexte du groupe

ITRAHUB est destiné à ITRACOM Holding, groupe panafricain burundais basé à Bujumbura. Le contexte général mentionne huit secteurs : industrie, logistique, banque, assurance, hôpital, agriculture, garage et agence de voyage, avec une présence au Burundi, en Tanzanie, au Kenya et en Angola.

Le groupe travaille aujourd’hui sur Excel ; la consolidation est manuelle et le contrôle des dépenses est absent du fonctionnement décrit. L’objectif général est de centraliser les données dans une seule base et d’appliquer les normes IFRS exigées par les partenaires internationaux.

Le périmètre budgétaire détaillé porte, lui, sur la holding et les six sociétés identifiées en section 6.1, dans quatre secteurs au Burundi et en Tanzanie. Le contexte général ne justifie pas d’inventer d’autres sociétés, organigrammes ou modules pour le Kenya et l’Angola.

L’objectif IFRS ne définit pas un moteur comptable réglementaire complet. La consolidation décrite est une consolidation budgétaire ; les éliminations de flux internes restent ouvertes dans D-07.

### 2.2 Composants finance et contenu de cette version

Les trois composants **Prévision, Budget et Exécution** sont visibles dans la navigation finance. Leur comportement dans cette version est fixé comme suit :

| Composant sélectionné | Contenu affiché |
| --- | --- |
| Prévision | Une page indiquant uniquement que le composant est en cours de développement ; aucun contenu métier |
| Budget | Tous les écrans, fonctionnalités, exigences et circuits décrits dans le SRS de gestion budgétaire, selon les habilitations de l’utilisateur |
| Exécution | Une page indiquant uniquement que le composant est en cours de développement ; aucun contenu métier |

**Message à afficher sur Prévision et Exécution :**

> Cette page est encore en cours de développement. Aucun contenu à afficher pour le moment.

Ces deux pages conservent la structure générale de navigation et la charte graphique. Leur zone de contenu ne présente ni liste, ni formulaire, ni indicateur, ni données de démonstration, ni action métier. Le clic ouvre la page correspondant au composant ; il ne redirige pas automatiquement vers Budget.

Le composant **Budget** regroupe donc les exercices et campagnes, les besoins prévisionnels, les ressources, les lignes et répartitions, les imputations, les visas, les arbitrages, les approbations, la consolidation, l’adoption, les révisions, le pilotage et l’historique. Il contient également le circuit de dépense décrit par le SRS : demande, devis, commande, réception, liquidation, ordonnancement, paiement enregistré et suivi du crédit.

Le mot « exécution » employé dans les exigences métier désigne une étape du cycle budgétaire ; il ne signifie pas que ces écrans doivent être placés sous le composant de navigation **Exécution**. Dans cette version, ils restent sous **Budget**. De même, la préparation et les besoins prévisionnels décrits dans le SRS restent sous **Budget**, sans activer le composant **Prévision**.

Ce regroupement conserve toutes les exigences et leurs identifiants ; il modifie leur emplacement dans l’interface. « Tout le contenu accessible sous Budget » reste soumis aux rôles, périmètres et permissions : cela n’autorise pas chaque utilisateur à consulter ou signer tous les dossiers. Les décisions D et propositions PR conservent leur statut.

Ne crée pas plusieurs copies concurrentes du même budget pour satisfaire la navigation. Aucun modèle supplémentaire de prévision statistique ou de simulation financière n’est demandé.

### 2.3 Socle à construire

Le socle sert les parcours budgétaires : connexion, structure de navigation, contexte de société ou de holding, entités et exercices, droits liés aux postes et rôles, listes, détails, formulaires, signatures en attente, pièces et historique.

La structure doit permettre de poursuivre ultérieurement l’ERP sans réaliser maintenant ses futurs modules. Ne crée pas de pages métier détaillées, de données ou de traitements pour des domaines absents du périmètre budgétaire.

Les catalogues et paramétrages nécessaires aux budgets appartiennent au périmètre décrit : organisation, désignations, délégations, exercices, comptes et correspondances, rubriques, analytique, natures de dépense, financement, fournisseurs et règles de seuil. Ils ne constituent pas des modules complets de ressources humaines, comptabilité ou achats.

### 2.4 Limites à conserver

Ne développe pas, sur la seule base de ces documents, de modules complets de paie, RH, ventes, banque, assurance, agriculture, production ou comptabilité générale. Les actes d’achat, de réception, de liquidation et de paiement sont limités au circuit budgétaire décrit.

Le stock est une dépendance mentionnée ; ses entrées, sorties, transferts et inventaires ne disposent pas de règles suffisantes pour construire un système de stock complet. Conserver la réception des articles stockés dans le parcours et la décision D-16 sur le sous-système ou l’intégration.

Le paiement est un **enregistrement avec référence**, sans exécution automatique d’un virement bancaire ou mobile. Aucun connecteur bancaire n’est défini.

Le PAA est reporté. Les filtres de campagne, les relances automatiques et le montant manquant dans la vue d’une société gardent le statut ouvert ou proposé du SRS. Les menus Collaboration, Agenda et États ne définissent pas une messagerie, un agenda complet ni un catalogue d’exports.

## 3. Stack et architecture de travail

| Couche | Choix indiqué |
| --- | --- |
| Frontend mobile mentionné dans les instructions générales | React Native, TypeScript |
| Dashboard web | Next.js 15, App Router, React 19, Tailwind CSS 4, TypeScript |
| API | Node.js, Express 4, TypeScript |
| Authentification et autorisations | JWT et contrôle d’accès fondé sur les rôles |
| Base centrale | PostgreSQL ou MySQL ; choix final non arrêté |

Le premier chantier UI/UX du dashboard utilise la stack web indiquée. Le SRS demande une interface utilisable sur ordinateur et téléphone, installable, et ne demande pas à lui seul une application native. La mention React Native reste une instruction de stack pour le frontend mobile ; elle n’impose pas de réaliser simultanément une seconde application native dans ce chantier.

Préserver une seule base centrale. Ne pas déployer PostgreSQL et MySQL simultanément parce que les deux sont cités. Aucun fournisseur d’email, hébergeur, ORM, bibliothèque additionnelle ou version de Node.js n’a été imposé.

Les choix de détail de code nécessaires à la réalisation ne doivent pas devenir des fonctionnalités supplémentaires. La stack décrit la cible technique ; elle ne transforme pas le chantier UI/UX en réalisation automatique de tous les sous-systèmes backend de l’ERP.

## 4. Connexion et autorisations

### 4.1 Parcours initial

Respecter cet ordre : **connexion → matricule → reconnaissance du personnel → code par email → validation du code → mot de passe → dashboard**.

1. À l’ouverture, présenter la page de connexion et le champ matricule.
2. Vérifier le matricule fourni par la direction d’ITRACOM Holding.
3. Si l’utilisateur n’existe pas, afficher qu’il n’est pas reconnu comme membre du personnel et ne pas donner accès au dashboard.
4. Si l’utilisateur existe, générer un code spécial et l’envoyer à son adresse email.
5. Permettre la saisie et la vérification de ce code.
6. Demander le mot de passe après validation du code.
7. Donner accès au dashboard après validation du mot de passe.

Le code email et le mot de passe sont deux éléments distincts. L’« approbation » du code désigne sa vérification ; aucun approbateur humain supplémentaire n’est décrit pour la connexion.

Prévoir la déconnexion et la récupération du mot de passe. L’expression « forget passcode » reste ambiguë : elle ne suffit pas à créer un troisième secret ou une procédure supplémentaire.

La création initiale des comptes, l’association de l’email, l’attribution du mot de passe, la durée de validité du code, le renvoi d’un code, les tentatives et les sessions ne sont pas détaillés. Ne pas inventer une inscription publique.

### 4.2 Droits et signatures métier

Appliquer les postes, rôles, périmètres, périodes de désignation et délégations décrits en section 6.2. Les administrateurs techniques ne signent pas les étapes métier.

L’authentification à deux facteurs exigée pour les signatures est une règle propre aux actes métier. Le descriptif de connexion ne précise pas à lui seul comment le second facteur doit être vérifié lors de chaque signature. Ne pas confondre connexion réussie et droit de signer.

Conserver les incompatibilités de personnes, y compris lorsqu’une personne cumule des rôles ou agit par délégation. Les cas non tranchés restent repérés par D-02 et D-03.

## 5. Direction UI/UX et référence dashboard

### 5.1 Identité visuelle

L’interface doit évoquer un outil de travail précis, calme et soigné. Le contenu métier occupe l’espace principal : fond clair, texte foncé, surfaces presque plates et alignements réguliers.

Exclure les dégradés décoratifs, effets de verre, halos, illustrations d’accueil et successions de grandes cartes KPI. La densité doit permettre de travailler sur les budgets, les lignes et les décisions sans transformer chaque information en grande carte décorative.

### 5.2 Typographie Urbanist

| Style | Taille et interligne | Graisse et utilisation |
| --- | --- | --- |
| Heading 01 | 22 px / 28 px | Semibold 600 ; titres de page et de dossier |
| Heading 02 | 32 px / 40 px | Semibold 600 ; valeur de synthèse ou niveau visuel supérieur |
| Paragraph | 14 px / 20 px | Regular 400 ; texte courant, lignes et champs |
| Libellé et action | 14 px / 20 px | Medium 500 ; boutons, onglets et navigation |
| Texte secondaire | 14 px / 20 px | Light 300 ; indications non critiques sur fond clair |

Conserver les noms Heading 01 et Heading 02 malgré leur différence de taille. La hiérarchie HTML reste logique, h1 puis h2 ; elle ne dépend pas du nom des styles. Réserver le 32 px à des usages exceptionnels.

### 5.3 Palette

| Repère | Valeur | Utilisation |
| --- | --- | --- |
| A | #0F172A | Texte principal, montants, action principale |
| B | #334155 | Texte secondaire lisible, icônes et contrôles |
| C | #94A3B8 | Repères non essentiels et éléments désactivés |
| D | #E2E8F0 | Bordures et séparateurs |
| E | #F8FAFC | Fond de travail et survol léger |
| Neutre complémentaire | #FFFFFF | Panneaux |

Ne pas employer C pour les paragraphes ou libellés indispensables. Les badges utilisent d’abord A, B, D et E avec un texte explicite. Les accents pastel visibles sur le moodboard restent une option non approuvée dans la charte.

Les alertes métier orange et rouges ainsi que les conventions d’état vert, jaune et rouge sont expressément demandées par le SRS. Les conserver pour leur signification métier ; ne pas étendre ces couleurs à une palette décorative. Leurs valeurs hexadécimales ne sont pas fournies.

Le mode sombre figure dans le SRS. La charte définit le thème clair ; elle ne fournit pas les valeurs du thème sombre. Conserver ce besoin sans prétendre qu’une seconde palette a déjà été définie.

### 5.4 Composition tirée du moodboard

La référence montre une application de travail avec une barre latérale étroite, une zone de liste centrale et un panneau de détail plus large. La sélection d’une ligne permet de garder la liste visible tout en consultant le dossier. L’en-tête réunit le contexte, les commandes utiles et des indicateurs compacts. Les lignes sont rapprochées, séparées sobrement ; les montants sont alignés et les badges restent discrets.

Traduire cette composition dans les vues budgétaires : navigation, liste de budgets ou de tâches, puis détail du budget, de la ligne ou de la dépense sélectionnée. Utiliser les panneaux séparés lorsque le contenu le justifie ; ne pas imposer trois colonnes à tous les formulaires et à toutes les tailles d’écran.

La référence est inclinée dans l’image : ne pas reproduire cette perspective dans l’application. Ne pas reprendre la marque « rillo », ses textes, ses abonnements, ses analyses de reçus, ses agents ou sa commande d’assistant. Ces éléments appartiennent à l’outil illustré et ne font pas partie d’ITRAHUB.

Sur téléphone, appliquer les règles mobiles du SRS ; ne pas comprimer les panneaux desktop côte à côte.

### 5.5 Navigation et composants finance

Afficher les trois composants **Prévision, Budget et Exécution**. Seul **Budget** donne accès au contenu métier documenté dans cette version. Prévision et Exécution ouvrent exclusivement les pages et le message définis en section 2.2.

Sous **Budget**, organiser les vues internes nécessaires à tous les parcours du SRS, y compris la préparation, les ressources, les dépenses et les paiements enregistrés. Ne pas déplacer ces vues vers Prévision ou Exécution en se fondant sur leur nom métier.

Le SRS cite les menus Prévision, Exécution, Collaboration, États et Administration. Pour cette version, appliquer la consigne de navigation ci-dessus aux deux premiers. Collaboration et Agenda gardent leur périmètre ouvert ; les référentiels, états et paramétrages nécessaires au cycle budgétaire restent accessibles depuis l’espace Budget et son contexte de travail, sans créer de fonctions supplémentaires.

### 5.6 Écrans déduits des parcours documentés

Cette liste organise les exigences existantes en surfaces de travail. Hormis la connexion et la structure générale de l’application, toutes les vues métier ci-dessous sont accessibles depuis le composant **Budget**. Elle ne fixe pas un nombre de pages ni une page distincte pour chaque ligne.

| Surface | Contenu à présenter | Références |
| --- | --- | --- |
| Connexion | Matricule, vérification email, mot de passe, récupération | Section 4 |
| Dashboard groupe, société ou entité | Votre journée, À signer, avancement, alertes et lignes de synthèse autorisées | FR-RPT ; NFR-UX |
| Exercices et campagnes | Statuts, taux figés, échéances et budgets attendus | FR-CAM |
| Budgets d’entités | Liste, dossier, lignes, calendrier, financement et imputation | FR-BUD ; FR-REF |
| Détail et signatures | Circuit, acteur habilité, motif de renvoi, décisions et pièces | FR-WF ; FR-AUTH ; NFR-SIG |
| Ressources et équilibre | Sources, montants, ressources signées et déficit par source | FR-RES |
| Dossier société | Complétude des budgets arbitrés et approbation avec PV selon le cas | FR-WF-04 |
| Consolidation groupe | Contributeurs, total USD, trois signatures et adoption | FR-CON |
| Dépenses et pièces | Demande, commande, réception, facture, ordonnancement et paiement enregistré | FR-EXP ; FR-BUY ; FR-PAY |
| Crédit et révisions | Suivi, dépassement, virement de crédits et rectificatif | FR-CRD ; FR-REV |
| Référentiels et habilitations | Organisation, rôles datés, délégations et catalogues nécessaires | FR-ORG ; FR-AUTH ; FR-REF |
| Historique | Auteur, date, décisions et événements conservés | FR-AUD |

Ne pas ajouter une étape à un circuit uniquement pour faire correspondre ce tableau à des pages.

### 5.7 Ergonomie requise par le SRS


**NFR-UX-01** — Fournir une interface utilisable sur ordinateur et téléphone par un chef d’entité sans formation préalable. Le SRS cite les menus Prévision, Exécution, Collaboration, États et Administration ; leur application à cette version suit les sections 2.2 et 5.5 : contenu métier sous Budget, pages en développement pour Prévision et Exécution. Prévoir la recherche « Aller à… » avec Ctrl K.

**NFR-UX-02** — Prévoir une seule action principale par écran et présenter les autres actions au second plan. Afficher un compteur « À signer » sur chaque page et « Votre journée » au tableau de bord. Compter uniquement les tâches autorisées sur lesquelles l’utilisateur peut agir.

**NFR-UX-03** — Sur téléphone, prévoir la navigation basse Accueil, Budgets, À signer, Agenda et Plus ; des cibles tactiles d’au moins 44 px ; une présentation des tableaux en cartes ; l’installation de l’application et les notifications.

**NFR-UX-04** — Prévoir le français, l’anglais et le portugais, avec traduction des noms d’entités. Afficher les devises avec les montants, aligner les montants de manière cohérente, garder des conventions d’état stables en vert, jaune et rouge, et proposer un mode sombre.

**NFR-UX-05** — Prévoir un bouton d’aide sur chaque page, une aide adaptée aux droits de l’utilisateur et une visite guidée à la première connexion.

#### Fonctionnalités restant à préciser

La source demande des entrées de menu Collaboration et Agenda sans définir les règles de messagerie, commentaires, affectations, événements ou planification de réunions. Elle demande des notifications sans préciser les canaux, déclencheurs, consentements, nouvelles tentatives ou règles de suppression. Ces éléments doivent être spécifiés avant d’être chiffrés comme fonctionnalités distinctes. [D-16]

Les relances automatiques de dépôt sont expressément à décider. La prise en charge des notifications ne vaut pas validation de campagnes de relance automatiques. La source n’exige ni modification ni signature hors connexion.

#### Responsabilité des traductions

Le client doit valider la terminologie financière, les noms d’entités traduits et les contenus d’aide. La source distingue précisément visa, arbitrage, approbation, liquidation et ordonnancement ; les traductions doivent préserver leurs effets métier respectifs.


## 6. Spécifications fonctionnelles budgétaires

Les exigences suivantes conservent la logique du SRS. Les mentions de règles à préciser et les renvois D signalent leurs limites. Les exemples chiffrés et les dates servent aux vérifications ; ils ne doivent pas être codés comme des valeurs permanentes.


### 6.1 Organisation et périmètres


Le système couvre une holding et six sociétés réparties dans quatre secteurs, au Burundi et en Tanzanie. Une société ou la holding constitue un périmètre d’habilitation ; une entité budgétaire est une structure interne à ce périmètre qui possède son propre budget. Un secteur regroupe des sociétés sans être identifié comme un porteur de budget distinct.

| Périmètre | Secteur et pays | Devise du budget |
| --- | --- | --- |
| ITRACOM Holding | Holding ; pays et devise budgétaire à confirmer | Non explicitement précisée |
| BCAB | Banque ; Burundi | BIF |
| FOMI | Industrie ; Burundi | BIF |
| IFL | Industrie ; Tanzanie | TZS |
| Inkinzo AG | Assurances ; Burundi | BIF |
| Inkinzo VC | Assurances ; Burundi | BIF |
| ITRASAGRI | Agriculture ; Burundi | BIF |

**FR-ORG-01** — Représenter la holding, les secteurs, les sociétés et la hiérarchie interne : direction générale, état-major, conseillers, directions générales adjointes, directions, services et implantations. Chaque entité budgétaire doit être rattachée à un périmètre.

**FR-ORG-02** — Permettre un budget pour chaque entité éligible, y compris la direction générale et les implantations. Présenter les entités de la direction générale dans l’ordre de la source : état-major, DGA, directions et implantations.

**FR-ORG-03** — Générer les codes des entités, rubriques budgétaires et sections analytiques, sans saisie manuelle de ces codes. Les numéros de comptes sont saisis explicitement. Les formats de génération restent à valider. [D-14]

#### Contexte de fonctionnement

La préparation budgétaire coexiste avec l’exécution de l’exercice en cours. Les exercices 2027 et 2026 sont des exemples, et non des valeurs permanentes de l’application. Les budgets des sociétés restent consultables dans leur devise locale ; la consolidation du groupe est en USD. Les règles d’affichage des tableaux de bord doivent être confirmées, car la source demande aussi l’USD à chaque niveau de responsabilité. [D-12]

#### Dépendances et hypothèses

Le client doit fournir l’organisation de référence, les postes occupés, les conseils d’administration, les référentiels financiers, les soldes d’ouverture et les politiques d’approbation. Les systèmes de gestion des identités, de comptabilité, d’approvisionnement, de stock et de paiement ne sont pas identifiés. Le mode d’hébergement reste ouvert ; la stack est fixée en section 3 du présent document.


### 6.2 Acteurs habilitations et signatures


| Acteur | Responsabilités budgétaires | Responsabilités d’exécution |
| --- | --- | --- |
| Chef d’entité | Préparer, soumettre, réviser et attester les besoins de son entité | Demander la dépense et attester la réception ou le service fait |
| Hiérarchie et DGA | Viser en remontant la hiérarchie ; le DGA arbitre également | Aucun pouvoir supplémentaire indiqué |
| DG de la société | Arbitrer en dernier ; son arbitrage vaut visa | Ordonnancer ; conserver ce pouvoir après délégation |
| Conseil de la société | Approuver le dossier et les budgets rectificatifs avec procès-verbal | Aucun pouvoir de paiement indiqué |
| DG de la holding | Viser selon les seuils ; approuver les sociétés sans conseil ; valider le consolidé | Approuver les rectificatifs des sociétés sans conseil |
| Conseil de la holding et PDG | Le conseil adopte le budget du groupe ; le PDG consigne le procès-verbal | Aucun pouvoir de paiement indiqué |
| Contrôleur budgétaire | Imputer les lignes ; tenir le catalogue des natures de dépense | Contrôler les virements de crédits |
| Contrôleur de gestion de la société | Viser selon les seuils dans son périmètre | Aucune précisée |
| Contrôleur de gestion groupe | Viser selon les seuils groupe et consolider | Aucune précisée |
| Directeur financier | Préparer et signer le budget des ressources de la société | Aucune précisée |
| Acheteur | Tenir le catalogue fournisseurs et consulter les devis | Émettre les bons de commande de manière centralisée |
| Magasinier | Aucune précisée | Réceptionner les articles stockés ; enregistrer mouvements et inventaires |
| Comptable | Aucune précisée | Rapprocher facture, commande et réception ; liquider |
| Ordonnateur délégué | Aucune précisée | Ordonnancer sur désignation du DG |
| Trésorier | Aucune précisée | Enregistrer le paiement et sa référence |
| Administrateur technique | Administrer les fonctions techniques ; aucune signature métier | Aucune signature métier |

**FR-AUTH-01** — Déduire les droits du poste occupé dans une entité et des rôles budgétaires attribués sur un périmètre pour une période. Le successeur reprend les pouvoirs du poste ; les actions historiques restent attribuées à leur auteur. Les désignations comportent une date de début et, si nécessaire, une date de fin ; elles ne sont jamais effacées.

**FR-AUTH-02** — Permettre une délégation de signature pour une structure et une période définies. Marquer chaque signature déléguée « par délégation » et l’inscrire à l’historique. Les administrateurs techniques ne doivent signer aucune étape métier.


### 6.3 Exercices et campagnes


**FR-CAM-01** — Créer un exercice au statut En préparation, puis gérer les statuts En cours, Clôturé et Archivé. Les budgets clôturés et archivés restent consultables. Les autorités et conditions de passage entre ces statuts doivent être confirmées. [D-15]

**FR-CAM-02** — Enregistrer un taux budgétaire figé par devise et par exercice, exprimé sous la forme 1 USD = taux dans la devise concernée. L’ouverture d’un exercice doit fixer les taux BIF et TZS. Les taux ultérieurs ne doivent pas recalculer les budgets existants de cet exercice.

**FR-CAM-03** — Enregistrer une date limite de dépôt pour le groupe et permettre une date propre à une société. La source donne le 30 novembre 2026 pour le groupe et le 15 novembre 2026 pour BCAB. La priorité entre échéances et le traitement des dépôts tardifs doivent être confirmés. [D-15]

**FR-CAM-04** — Couvrir les dix phases métier ci-dessous et afficher l’avancement de la préparation par rapport au nombre de budgets d’entités attendus. Ces phases de campagne sont distinctes des statuts des documents budgétaires.

| Phase | Résultat métier attendu |
| --- | --- |
| 1 Ouvrir l’exercice | Statut de préparation, taux figés et échéances disponibles |
| 2 Élaborer | Besoins des entités et ressources des sociétés renseignés |
| 3 Déposer | Budgets des entités soumis au regard de l’échéance |
| 4 Viser par la hiérarchie | Visas hiérarchiques requis enregistrés |
| 5 Imputer | Comptes, rubriques et sections analytiques affectés |
| 6 Viser selon les seuils et arbitrer | Visas de seuil, décisions du DGA puis du DG enregistrés |
| 7 Approuver la société | Dossier complet de la société approuvé |
| 8 Consolider et adopter | Consolidation signée, validée et adoptée |
| 9 Exécuter | Dépenses et révisions de l’exercice en cours traitées |
| 10 Clôturer et archiver | Dossiers clôturés puis archivés toujours consultables |

#### Entrées et sorties

Entrées : année de l’exercice, échéances, devises, taux figés et entités éligibles.

Sorties : fiche de l’exercice, calendrier de campagne, nombre de budgets attendus, indicateurs d’avancement et historique daté des transitions. Les responsables du paramétrage, la coexistence de plusieurs exercices en cours et les contrôles de réouverture restent à convenir.

#### Exemple de vérification

Créer un exercice en préparation avec des échéances distinctes pour le groupe et une société. Enregistrer un nouveau taux de marché après la création d’un brouillon. Le budget et sa valeur en USD doivent rester inchangés. Le tableau de bord doit comparer les dépôts à l’échéance applicable selon la règle validée par le client.


### 6.4 Référentiels et élaboration


**FR-REF-01** — Gérer un plan comptable par société, relié au plan du groupe par une table de correspondances. La hiérarchie des comptes suit les préfixes des codes, par exemple 6011 sous 601, lui-même sous 60.

**FR-REF-02** — Gérer les rubriques budgétaires classées en Fonctionnement, Investissement, Recettes, Projet, Financement ou Autre ; les axes et sections analytiques ; les sources de financement par société ; et un catalogue de natures de dépense en langage courant, tenu par le contrôleur budgétaire. Le choix d’une nature propose un compte et une rubrique.

**FR-BUD-01** — Permettre au chef d’entité de créer un budget par entité et par exercice, composé de lignes de besoin. La reconduction d’un budget précédent doit décaler les dates d’un an.

**FR-BUD-02** — Saisir les champs ci-dessous. Le chef d’entité décrit le besoin, le montant, le calendrier et la source ; le contrôleur budgétaire renseigne l’imputation. Les obligations de saisie non précisées dans la source restent à valider.

| Groupe de champs | Entrées | Résultat ou contrôle |
| --- | --- | --- |
| Besoin | Intitulé, description, nature de dépense, priorité, récurrence, pièces jointes | Priorité : Basse, Moyenne, Haute, Critique |
| Montant | Devise de ligne, montant HT, TVA, montant TTC | Équivalents dans la devise du budget et en USD |
| Calendrier | 12 mois égaux ; mois unique ; période égale ; montants mensuels personnalisés | Répartition mensuelle liée à la ligne |
| Financement | Une source de financement | Source par défaut proposée et modifiable par le chef |
| Imputation | Compte de la société, rubrique budgétaire, sections analytiques | Ligne imputée prête pour la signature de l’imputation |

**FR-BUD-03** — Convertir les montants des lignes dans la devise du budget et en USD avec les taux figés de l’exercice. Pour une devise C telle que 1 USD = rC, montantUSD = montantC ÷ rC. Pour une devise cible T, montantT = montantC × rT ÷ rC. Le facteur de l’USD est 1. Les arrondis et les devises autorisées sur les lignes doivent être confirmés. [D-09]

**FR-BUD-04** — Journaliser la création, les ajouts, modifications et suppressions de lignes, la reconduction et la soumission avec leur auteur et leur date. Interdire la modification directe d’un budget approuvé.

Sorties : budget de l’entité, besoins détaillés, calendrier mensuel, affectation du financement, imputations comptables et analytiques, totaux locaux, équivalents USD et historique. Les contrôles proposés sur les taxes et les totaux du calendrier figurent dans PR-DATA-01, dans les propositions de la section 10.


### 6.5 Circuit des budgets


La source définit six statuts pour un budget. Chaque transition est signée ; l’approbation d’une société porte toutefois sur un dossier regroupant les budgets de ses entités. Les libellés des statuts reprennent ceux de la source pour éviter toute ambiguïté.

| Étape courante | Acteur et action | Résultat |
| --- | --- | --- |
| Brouillon | Le chef d’entité signe la soumission | Soumis · en visa |
| Soumis · en visa | La hiérarchie vise selon l’organigramme ; les postes vacants sont sautés | Visé · à imputer |
| Visé · à imputer | Le contrôleur budgétaire impute et signe la fin de l’imputation | Imputé · en arbitrage |
| Imputé · en arbitrage | Visas de seuil applicables ; arbitrage du DGA puis du DG | Arbitré |
| Arbitré | Attente de tous les budgets ; approbation du dossier par le conseil de la société ou le DG de la holding | Approuvé |
| Approuvé | Budget verrouillé ; évolution par révision approuvée | Aucune modification ordinaire |

**FR-WF-01** — Acheminer les visas hiérarchiques selon les rattachements réels de l’organigramme, sans imposer une liste fixe à toutes les entités. Sauter les postes vacants. L’arbitrage du DG vaut visa ; ne pas ajouter de visa hiérarchique distinct du DG.

**FR-WF-02** — Évaluer les règles de seuil après l’imputation et avant l’arbitrage. Une règle peut porter sur le montant d’une ligne, le total d’un budget ou l’appartenance d’une ligne à une catégorie. Elle désigne le contrôleur de gestion de la société, le contrôleur de gestion groupe ou le DG de la holding. Désactiver les règles au lieu de les supprimer.

**FR-WF-03** — Permettre le renvoi au chef d’entité avec un motif obligatoire. À la nouvelle soumission, conserver les visas antérieurs si l’empreinte du budget est inchangée ; sinon les invalider pour la nouvelle soumission tout en conservant leur historique. Le contenu de l’empreinte et les renvois aux étapes ultérieures restent à convenir. [D-04]

**FR-WF-04** — N’approuver un dossier de société que lorsque tous ses budgets d’entités sont arbitrés. Le conseil d’administration approuve avec un procès-verbal joint ; en l’absence de conseil, le DG de la holding approuve. Verrouiller tous les budgets concernés après approbation.

**NFR-SIG-01** — Exiger une authentification à deux facteurs pour les signatures. Une personne ne doit pas signer deux étapes consécutives du même budget : pour un visa, la sauter et acheminer vers le niveau supérieur ; pour l’imputation, l’arbitrage ou l’approbation, refuser l’opération. L’articulation entre visa et arbitrage du DGA doit être clarifiée. [D-03]

#### Sorties

Tâche de signature en attente, décision signée, auteur et rôle exercé, horodatage, mention de délégation le cas échéant, motif de renvoi le cas échéant, nouveau statut et historique intégral conservé. Le procès-verbal d’approbation doit être lié à la version approuvée du dossier.


### 6.6 Ressources et équilibre


**FR-RES-01** — Permettre au directeur financier de préparer le budget des ressources de sa société avec une ligne par source, un montant et une devise. Les statuts sont En préparation, Signé · avec le dossier de la société et Approuvé. L’approbation intervient avec celle du dossier de la société.

**FR-RES-02** — Prévoir les types de sources ci-dessous. Proposer une source par défaut sur chaque ligne de dépense et permettre au chef d’entité d’en choisir une autre. Chaque ligne de dépense possède exactement une source de financement.

| Type de source | Signification métier |
| --- | --- |
| Recettes de l’activité | Produits de l’activité de la société |
| Trésorerie propre | Disponibilités de la société |
| Dotation ou avance de la holding | Apport d’ITRACOM Holding à une société |
| Emprunt | Financement bancaire |
| Subvention ou bailleur | Financement d’un partenaire |
| Cession de biens | Produit de la vente d’un actif |

**FR-RES-03** — Comparer, pour chaque source, les dépenses financées aux ressources prévues. Afficher tout solde négatif sous forme d’alerte orange avec le montant manquant. Le déséquilibre du financement ne doit pas bloquer le circuit.

#### Calcul et exemple

Pour une source et dans une même devise de restitution, solde = ressources prévues − dépenses financées. Montant manquant = max(0, dépenses financées − ressources prévues). Une source disposant de 80 600 USD pour 100 000 USD de dépenses présente un déficit de 19 400 USD. Cet exemple illustre le déficit BCAB cité dans la source ; ces chiffres ne constituent pas un budget réel validé.

#### Entrées et sorties

Entrées : société, exercice, catalogue des sources, montant et devise des ressources, lignes budgétaires financées et taux figés. Sorties : budget des ressources, signature du directeur financier, équilibre par source, déficit de la société et alertes sur les ressources manquantes.

#### Décisions influant sur l’approbation

La source indique que tous les budgets d’entités doivent être arbitrés avant l’approbation de la société et que les ressources sont approuvées avec le dossier. Elle ne précise pas si l’absence de budget des ressources, ou de sa signature, bloque cette approbation. Le traitement des lignes des catégories Recettes et Financement doit aussi être défini pour éviter le double comptage d’une ressource. [D-06]

Le verrouillage des ressources après approbation, les modifications après signature et les prévisions de ressources révisées doivent être définis avec les budgets rectificatifs. Un manque de ressources déclenche explicitement une alerte ; il doit être distingué des restrictions restant à préciser sur le dépassement du crédit d’une ligne. [D-01, D-06]


### 6.7 Consolidation et adoption


**FR-CON-01** — Établir le budget consolidé en USD à partir des dossiers approuvés des six sociétés et des budgets arbitrés des entités de la holding. Utiliser les taux budgétaires figés de l’exercice. Les budgets des sociétés restent enregistrés dans leur propre devise.

**FR-CON-02** — Exiger trois signatures successives : le contrôleur de gestion groupe consolide, le DG de la holding valide et le conseil d’administration de la holding adopte. Le PDG consigne le procès-verbal du conseil. L’adoption établit le budget initial du groupe.

**FR-CON-03** — Lors de l’adoption par le groupe, faire passer les budgets des entités de la holding au statut Approuvé. Conserver les approbations déjà obtenues par les sociétés.

**FR-CON-04** — Enregistrer un dossier renvoyé au statut Renvoyé (annulé) et refaire la consolidation. Conserver la version précédente et ses décisions à l’historique. L’objet concerné, les invalidations en aval et le traitement d’un budget déjà adopté doivent être confirmés. [D-05]

**FR-CON-05** — Convertir les révisions approuvées en cours d’exercice au même taux afin de garder comparables le budget, les engagements et les paiements dans le suivi budgétaire. Distinguer ce calcul de la comparaison des seuils d’achat au taux du marché. [D-09]

#### Entrées et sorties

Entrées : dossiers approuvés des sociétés, budgets arbitrés de la holding, correspondances comptables, taux figés et procès-verbal d’adoption. Sorties : totaux consolidés en USD, liste des dossiers contributeurs, trois décisions enregistrées et budget initial du groupe. La proposition PR-CON-01, en section 10, concerne un instantané versionné permettant de reproduire le total adopté.

#### Limites de la consolidation

La source définit la consolidation comme une addition. Elle ne précise pas l’élimination des avances, dotations, soldes ou financements comptés entre sociétés. Il ne faut pas en déduire une consolidation comptable réglementaire. Le client doit choisir entre des totaux bruts du groupe et l’élimination de certains flux internes. [D-07]

#### Exemple de vérification

À partir de dossiers d’essai approuvés pour les six sociétés et de budgets arbitrés pour la holding, calculer séparément les totaux USD attendus. Vérifier les trois signatures et le changement de statut des budgets de la holding. Un taux de marché ultérieur ne doit pas modifier le total adopté.


### 6.8 Demandes achats et réceptions


Une dépense doit être rattachée à une ligne d’un budget approuvé. L’entité consommatrice porte la dépense ; l’approvisionnement de la société achète pour son compte. La source définit six étapes signées.

**FR-EXP-01** — Permettre au chef d’entité de signer une demande de dépense sur une ligne approuvée. Réserver le montant estimé sur cette ligne dès la demande.

**FR-EXP-02** — Permettre à l’acheteur de consulter les fournisseurs, joindre les devis requis et signer un bon de commande. Le bon réserve le montant commandé à la place de l’estimation initiale ; ce modèle de réservation doit être confirmé dans D-08. Gérer un catalogue des fournisseurs.

**FR-EXP-03** — Permettre au chef d’entité de signer la réception ou le service fait, ou au magasinier pour les articles stockés. Relier la réception à l’achat et à l’entité consommatrice.

**FR-EXP-04** — Gérer les statuts de dépense de la source : Demandée · à engager, Engagée · en cours, Soldée et Annulée. Les règles détaillées de clôture, d’annulation et de réouverture restent à définir. [D-08]

#### Règles relatives aux devis

**FR-BUY-01** — Paramétrer le seuil des devis par société ou pour la holding en montant TTC, dans la devise locale ou une devise étrangère plus stable. Au-dessus du seuil, exiger trois devis par défaut, avec un paramétrage de deux à cinq. En dessous, un devis suffit. Le cas d’égalité au seuil doit être tranché. [D-10]

**FR-BUY-02** — Lorsque la devise de l’achat diffère de celle du seuil, utiliser le cours du jour ou, à défaut, le taux budgétaire de l’exercice. Enregistrer le taux retenu pour justifier la décision. La source des taux de marché doit être confirmée. [D-09]

**FR-BUY-03** — À l’émission du bon de commande, permettre une dérogation aux devis pour fournisseur unique, urgence, contrat ou marché déjà en cours, ou autre raison. Exiger une explication d’au moins 20 caractères. Afficher la dérogation dans le dossier, à l’ordonnancement et dans l’historique des règles d’achat.

**FR-BUY-04** — Enregistrer chaque changement de règle d’achat avec son motif. Les devis, factures et preuves de paiement peuvent être des PDF, images, fichiers Word ou Excel, avec un maximum de 20 Mo par pièce. Les formats exacts et la convention de taille doivent être confirmés.

#### Entrées et sorties

Entrées : ligne approuvée, besoin et montant estimés, fournisseur, devis, montant de commande, devise, règle applicable, motif de dérogation et justificatif de réception. Sorties : demande de dépense, bon de commande, document de réception, historique signé et réservation de crédit actualisée. Les livraisons partielles, retours, modifications de commande et critères de choix du fournisseur ne sont pas précisés. [D-08, D-11]


### 6.9 Liquidation ordonnancement paiement et crédit


**FR-PAY-01** — Permettre au comptable de rapprocher la facture du bon de commande et de la réception, puis de signer la liquidation. Réserver le montant de la facture à la liquidation. Enregistrer le statut Liquidée · à ordonnancer. Les tolérances de rapprochement et le traitement des écarts restent à convenir. [D-11]

**FR-PAY-02** — Permettre au DG de la société ou à l’ordonnateur délégué désigné de signer l’ordonnancement. Le DG conserve ce pouvoir après la désignation. Passer la facture au statut Ordonnancée · à payer. L’ordonnateur peut renvoyer la facture à la comptabilité.

**FR-PAY-03** — Permettre au trésorier de signer et d’enregistrer le paiement, avec sa référence, uniquement après ordonnancement. Gérer le virement bancaire, le chèque, le paiement mobile et les espèces. Passer la facture au statut Payée. Le statut Rejetée existe également ; ses conditions d’entrée et de reprise restent à convenir. [D-11]

**FR-CRD-01** — Suivre le montant réservé sur chaque ligne budgétaire approuvée, de la demande au bon de commande puis à la liquidation. Signaler tout dépassement de crédit en rouge. Le blocage de l’action ou la nécessité d’une autorisation exceptionnelle ne sont pas précisés. [D-01]

**NFR-SIG-02** — Appliquer les incompatibilités de la source : qui demande n’engage pas ; qui engage ne réceptionne, ne liquide ni ne paie ; qui liquide n’ordonnance ni ne paie ; qui ordonnance ne paie pas. Appliquer ces contrôles à la personne, y compris dans ses rôles délégués. La formule plus stricte « six mains différentes » doit être confirmée. [D-02]

Le modèle de réservation PR-CRD-01 et son exemple sont conservés en section 10 ; D-08 reste à résoudre avant de fixer la formule de crédit disponible.

#### Informations minimales des transactions à confirmer

Le processus nécessite des identifiants liés pour la demande, la commande, la réception, la facture, l’ordonnancement et le paiement ; la société et l’entité ; la ligne budgétaire ; le fournisseur ; les montants et devises ; les dates utiles ; les justificatifs ; l’auteur et le statut. La numérotation des factures, les échéances, taxes, coordonnées bancaires, rapprochements, avances, paiements fractionnés et factures multiples par commande ne sont pas définis. L’enregistrement d’un paiement n’implique pas une intégration pour exécuter un virement bancaire ou mobile.


### 6.10 Révisions et pilotage


**FR-REV-01** — Conserver le budget initial approuvé. Le budget révisé correspond au budget initial augmenté des révisions approuvées. Ne pas écraser l’enregistrement initial approuvé.

**FR-REV-02** — Permettre les virements de crédits entre lignes sans modifier le total global, selon le circuit chef d’entité, contrôleur budgétaire puis DG. Les limites de périmètre, la disponibilité du crédit source et les transferts entre entités restent à convenir. [D-13]

**FR-REV-03** — Permettre les budgets rectificatifs modifiant le total, selon le même circuit, puis approbation du conseil d’administration avec procès-verbal, ou du DG de la holding en l’absence de conseil. Utiliser les taux figés de l’exercice.

**FR-RPT-01** — Fournir des tableaux de bord du groupe, de la société et de l’entité, limités au périmètre du lecteur. Afficher le montant en préparation, les nombres de budgets créés et soumis par rapport aux budgets attendus, les jours avant dépôt, les parts du crédit engagée et payée, et les sociétés en déficit de ressources.

**FR-RPT-02** — Afficher six alertes au maximum et compter les suivantes. En dessous, présenter une ligne par société dans la vue groupe, puis les entités de la direction générale dans l’ordre organisationnel prévu, avec le statut de leur budget.

| Gravité | Déclencheur | Destination |
| --- | --- | --- |
| Rouge | Une ligne de l’exercice en cours dépasse son crédit | Ouvrir le budget |
| Rouge | Échéance dépassée et budgets non soumis | Voir les budgets |
| Orange | Dépôt dans 15 jours ou moins et budgets non soumis | Voir les budgets |
| Orange | Dépenses d’une société supérieures à ses ressources | Arbitrer |
| Information | Budgets non soumis et dépôt dans 16 à 60 jours | Voir les budgets ; une phrase de synthèse groupe |
| Information | Société sans budget des ressources | Voir |
| Information | Bons de commande en dérogation émis dans les 7 derniers jours | Voir les dépenses |

Les bornes des périodes, le fuseau horaire, le tri des alertes et le dénominateur des pourcentages engagés et payés restent à convenir. Chaque alerte doit ouvrir une vue autorisée pour l’utilisateur. L’affichage du montant manquant au niveau d’une société est explicitement proposé au §14, bien qu’évoqué ailleurs dans la source ; trancher D-12.

#### Restitutions attendues

Les principales sorties sont les tableaux de bord à l’écran, les lignes budgétaires, l’historique des validations, les comparaisons de financement, les dossiers des sociétés et le budget consolidé du groupe. Les formats d’impression et d’export, les modèles, filtres et envois programmés ne sont pas précisés. Le menu « États » ne définit pas à lui seul un catalogue d’exports. [D-17]


### 6.11 Audit et relations entre les données


**FR-AUD-01** — Journaliser la création, les modifications et suppressions de lignes, la reconduction, la soumission, les visas donnés, conservés ou sautés, l’imputation, l’arbitrage et l’approbation, avec auteur et date. Conserver les étapes signées ; une décision d’origine ne doit pas disparaître après un renvoi ou une succession à un poste.

#### Modèle d’information

| Famille de données | Relations requises |
| --- | --- |
| Organisation et accès | Périmètre → entités → postes ; utilisateurs → désignations et délégations datées |
| Configuration budgétaire | Exercice → taux figés et échéances ; société → catalogues et correspondances |
| Budgets et ressources | Budget d’entité → lignes → répartitions, source et imputation ; société → budget des ressources |
| Décisions | Version du document → signatures, renvois, procès-verbaux et événements d’audit |
| Consolidation et révisions | Version consolidée → dossiers des sociétés et budgets de la holding ; révision → lignes concernées |
| Exécution des dépenses | Ligne approuvée → demande → commande → réception → facture → ordonnancement → paiement |

Il s’agit d’objets et de relations logiques, sans imposer de schéma de base de données. Les fractionnements ou documents multiples aux étapes ultérieures nécessitent les décisions D-08 et D-11.


## 7. Inventaire organisationnel


L’inventaire ci-dessous reprend le détail des sociétés, y compris le contenu replié dans le fichier HTML. Les rattachements et le décompte des entités conservent les réserves D-14. Chaque société possède également une direction générale selon le modèle commun.

### ITRACOM Holding

État-major : Attache à la DG ; Conseiller fiscal ; Exploitation des rapports ; Communication. DGA : DGA1, avec Stratégie, innovation et développement ; DGA 2. Autres directions : Finances ; Affaires juridiques, relations du travail et sécurité ; Inspection des filiales ; Ressources humaines ; Développement des systèmes financiers et technologiques ; Gestion du patrimoine. L’en-tête annonce 16 entités ; la hiérarchie énumérée ne permet pas de retrouver entièrement ce nombre. Confirmer les entités manquantes ou les règles de décompte.

### BCAB

État-major : Assistant à la direction générale. Une direction générale adjointe. Directions : Finances, avec le service Comptabilité ; Systèmes d’information, avec le service Informatique ; Ressources humaines ; Crédits ; Opérations ; Commercial et Agri-Business ; Réseau des agences ; Risques ; Logistique et gestion du patrimoine ; Audit interne. Implantations : Siège ; BCAB Asiatique ; BCAB FOMI ; BCAB Gitega ; BCAB Umuco.

### FOMI

Une direction générale adjointe. Directions : Finances ; Commercial ; Ressources humaines ; Agronomie ; Technique ; Approvisionnement ; Recherche et innovation ; Audit interne ; Juridique ; Qualité et gestion. Implantations : Siège ; FOMI.

### IFL

État-major : Conseiller du directeur général. DGA comprend neuf directions : Comptabilité et finances ; Contrôle interne et audit ; Ressources humaines et administration ; Juridique ; Technique ; Approvisionnement ; Recherche agronomique et transfert de technologie ; Innovation et développement technologique ; Développement commercial et marketing. DGA Vilima Vitatu en comprend cinq : Comptabilité et finances ; Ressources humaines et administration ; Technique ; Production ; Commercial. Implantation : Siège.

### Inkinzo AG

État-major : Audit interne, identifié comme cellule. Directions : Administration et finances ; Commercial ; Technique. Implantation : Siège.

### Inkinzo VC

Directions : Administration et finances ; Technique. Implantation : Siège.

### ITRASAGRI

Directions : Agronomie ; Finances. Implantation : Siège.


## 8. Dépendances et données de référence


| Domaine d’interface | Exigence ou dépendance de la source | Décision requise |
| --- | --- | --- |
| Identités et postes | Droits liés au poste et au rôle ; double authentification pour signer | Annuaire existant, source RH, connexion et récupération |
| Comptabilité | Plans comptables des sociétés et du groupe ; liquidation des factures | Système de référence, imports et exports, responsabilité des écritures |
| Achats et fournisseurs | Achats centralisés et catalogue fournisseurs | Identifiants existants, doublons et périmètre d’intégration |
| Stocks | Réceptions, entrées, sorties, transferts et inventaires mentionnés | Système existant ou nouveau sous-système et règles détaillées |
| Taux de change | Taux budgétaires figés et cours du jour pour les seuils d’achat | Fournisseur de taux, autorité de saisie et solution de repli |
| Paiements bancaires et mobiles | Modes et références de paiement enregistrés | Enregistrement seul ou intégration d’exécution des paiements |
| Notifications | Application installable avec notifications | Canaux, déclencheurs et règles d’envoi |


### Données nécessaires à la réalisation


Fournir l’organisation approuvée et les entités éligibles ; conseils et signataires ; règles de délégation ; plans comptables et correspondances groupe ; rubriques et axes analytiques ; correspondances des natures de dépense ; catalogues de financement ; seuils d’achat ; exemples de budgets, devis, commandes, réceptions, factures, preuves de paiement et procès-verbaux. Désigner un responsable client pour chaque décision ouverte.


## 9. Décisions encore ouvertes

Les décisions D-01 à D-18 restent ouvertes dans le document fourni. Les conserver comme dépendances ; ne pas leur attribuer de réponse implicite. Les limites de la première réalisation restent celles de la section 1.


**D-01** — Politique de dépassement  La source exige un signal rouge, sans préciser si le dépassement est autorisé. Confirmer le blocage éventuel, l’autorité de dérogation et l’application de la règle à la demande, à la commande et à la facture.

**D-02** — Signataires distincts de la dépense  La section 10 du processus repris par le SRS parle de six mains différentes, alors que les incompatibilités explicites autorisent certains cumuls et que le chef d’entité demande et réceptionne. Choisir entre six personnes distinctes et les seules incompatibilités énoncées, puis définir l’exception de réception.

**D-03** — Signatures budgétaires consécutives  Un DGA peut viser et arbitrer. Confirmer l’application de la règle lorsque les rôles se cumulent, que des étapes intermédiaires sont sautées ou qu’une personne occupe plusieurs postes. Définir le circuit si aucun supérieur habilité n’est disponible.

**D-04** — Renvois et empreinte  Le texte autorise le renvoi à chaque étape, tandis que le schéma ne dessine des retours que depuis les visas, l’imputation et l’arbitrage. Confirmer les étapes autorisées, les champs exacts de l’empreinte, les décisions conservées et l’effet des changements d’imputation ou de seuil sur les visas antérieurs.

**D-05** — Dossiers consolidés renvoyés  Identifier l’objet portant le statut Renvoyé (annulé), les personnes autorisées à le renvoyer, les signatures et approbations de sociétés invalidées, ainsi que les corrections après adoption du groupe. Distinguer ce statut des six statuts des budgets d’entités.

**D-06** — Ressources et complétude de l’approbation  Le budget des ressources doit-il être signé avant l’approbation de la société ? Quel lien existe entre les catégories Recettes ou Financement et les ressources ? Qui peut réviser les ressources signées et comment ces changements sont-ils approuvés ?

**D-07** — Financements internes du groupe  Confirmer si la consolidation est une simple addition, comme indiqué, ou si elle élimine des flux entre sociétés. Définir comment éviter le double comptage des avances de la holding et des ressources des sociétés dans les vues du groupe.

**D-08** — Cycle des crédits et exécution partielle  Valider la formule de remplacement des réservations et les règles pour commandes, réceptions, factures ou paiements partiels, annulations, rejets, reports de soldes et clôture définitive. Définir le contrôle des réservations concurrentes.

**D-09** — Devises taxes et précision  Confirmer la devise du budget de la holding, les devises de ligne, la source des cours du jour, les arrondis, les taux de TVA et les règles TTC. Distinguer le suivi au taux budgétaire du règlement réel et des écarts de change.

**D-10** — Politique des seuils  Confirmer le traitement de l’égalité au seuil, la devise de la règle, les visas cumulatifs, les signataires communs, les dates d’effet et l’incidence des changements de règle sur les budgets soumis. Qui approuve les dérogations ?

**D-11** — Rapprochement et rejet des pièces  Définir les champs obligatoires des factures, la détection des doublons, les tolérances, les retours de réception, les factures ou lignes multiples, les avoirs, avances et factures rejetées, ainsi que les personnes autorisées à annuler ou corriger chaque étape.

**D-12** — Tableaux de bord et financement  Confirmer l’affichage USD ou local aux niveaux société et entité, le traitement des engagements impayés dans les pourcentages, l’ordre des alertes et les bornes des périodes. Valider la vue du montant manquant par société, proposée au §14.

**D-13** — Limites des révisions  Confirmer les transferts entre entités, catégories ou sources ; la protection du crédit déjà consommé ; le DG compétent pour les révisions de la holding ; et l’éventuelle nouvelle adoption du groupe après un budget rectificatif d’une société.

**D-14** — Organisation et référentiels  Valider chaque entité, rattachement, conseil et poste. Rapprocher les 16 entités annoncées pour la holding de la liste fournie. Préciser les formats des codes générés, la responsabilité des traductions, les droits sur les référentiels et les règles d’affectation analytique.

**D-15** — Contrôles des exercices et campagnes  Confirmer la priorité de l’échéance d’une société, les dépôts tardifs, l’activation, la clôture, la réouverture, l’accès aux archives et les dépenses impayées de l’exercice précédent. Désigner les responsables de ces changements.

**D-16** — Stocks collaboration et notifications  Confirmer si le stock est développé ou intégré à un système existant et définir les mouvements. Préciser Agenda, Collaboration, les événements notifiés et les canaux. Décider de l’inclusion des relances automatiques de dépôt.

**D-17** — États et filtres de campagne  Fournir les modèles d’états attendus, formats d’impression et d’export, filtres de campagne, règles de recherche et visibilité. Les filtres sont explicitement en attente de décision dans la source.

**D-18** — Accord sur l’exploitation  Confirmer utilisateurs, volumes, performance, hébergement, connectivité, conservation des données de sécurité, sauvegardes, reprise, appareils, migration et responsabilités de support. Ces éléments ne peuvent pas être déduits du seul processus métier.


### Précisions supplémentaires issues des instructions générales et de la charte

- Choix PostgreSQL ou MySQL.
- Procédure de récupération, sens de « passcode » et règles du code email.
- Articulation entre le second facteur de connexion et celui exigé pour signer.
- Palette sombre et valeurs des couleurs sémantiques non fournies.
- Réalisation éventuelle du frontend React Native, distincte du chantier initial du dashboard web.


## 10. Propositions du SRS conservées hors décision acquise

Ces propositions sont reproduites pour préserver la portée du document client. Leur présence ne commande pas un chantier additionnel. Ne les présenter ni comme des fonctionnalités livrées ni comme des arbitrages déjà acceptés. Les scénarios qui y font référence gardent la même réserve.


**PR-CON-01** — Conserver chaque version consolidée avec les versions de ses contributeurs, les références des taux et les justificatifs d’approbation. Refuser l’absence d’un contributeur obligatoire plutôt que de présenter un total partiel comme le budget adopté du groupe. Confirmer les processus autorisés de consolidation partielle ou révisée. [Proposition ; D-05]

**PR-CRD-01** — propose une réservation active par portion non payée, remplacée lorsque l’estimation devient commande, puis facture ; il ne s’agit pas de trois réservations cumulées. Crédit disponible = crédit révisé − consommation payée − réservation restante. Les règles de traitement partiel, d’annulation et de libération doivent être approuvées. [D-08]

Exemple à valider : sur un crédit de 1 000 unités, une demande de 200 laisse 800 disponibles ; une commande de 180 la remplace et laisse 820 ; une facture de 175 remplace la réservation de commande et laisse 825. Le paiement transfère 175 de la réservation à la consommation payée, avec toujours 825 disponibles. Cet exemple est proposé, car la source ne fournit pas de formule complète de suivi des crédits.


**PR-UX-01** — Faire créer une ligne, soumettre un budget, retrouver une signature en attente et consulter une dépense à des chefs de service représentatifs, sur téléphone et ordinateur, avec la seule aide intégrée. Convenir des critères de réussite et des appareils pris en charge avant la recette utilisateur.

**PR-UX-02** — Associer des libellés aux couleurs d’état, permettre les actions au clavier, assurer un contraste lisible et fournir des libellés compatibles avec les lecteurs d’écran pour les champs financiers. Confirmer la cible d’accessibilité et les navigateurs pris en charge. [Proposition]

**PR-AUD-01** — Conserver, pour chaque décision importante, les identifiants de l’objet et de sa version, le poste ou rôle exercé, la délégation, l’horodatage et le motif. Limiter les droits de modification du journal et contrôler sa consultation. Convenir des durées de conservation et des exports d’audit. [Proposition]

**PR-DATA-01** — Contrôler les champs obligatoires et les valeurs autorisées ; rapprocher TVA et TTC selon les règles fiscales validées ; imposer l’égalité entre répartitions mensuelles et total annuel ; refuser les devises non prises en charge et les taux invalides. Confirmer les montants négatifs, arrondis, décalages de dates et nombres d’affectations autorisés par axe analytique. [Proposition ; D-09, D-14]

**PR-DATA-02** — Enregistrer de manière atomique les signatures, changements de statut et mises à jour de crédit. Empêcher les requêtes répétées de produire des décisions ou réservations en double. Si un autre utilisateur a modifié le document, imposer son actualisation avant la signature d’une version périmée. [Proposition]

**PR-SEC-01** — Contrôler les droits de société, d’entité et de rôle sur chaque opération serveur et téléchargement. L’accès au groupe doit dépendre d’un rôle groupe explicite. Tester les requêtes directes utilisant les identifiants d’une autre société, y compris pour les pièces et états. [Proposition d’application des périmètres d’habilitation de la source]

**PR-SEC-02** — Protéger les données en transit et au repos ; sécuriser les identifiants et secrets ; définir l’expiration des sessions, la récupération des comptes, la récupération et la révocation du second facteur. Choisir le mécanisme d’authentification avec le client. Aucune certification juridique de signature n’est revendiquée. [Proposition]

**PR-SEC-03** — Contrôler la taille et le format des fichiers, restreindre l’accès aux pièces et analyser les dépôts contre les contenus malveillants. Définir les extensions d’image, Word et Excel admises, le traitement des macros et la conservation. [Proposition]

**PR-OPS-01** — Convenir des nombres d’utilisateurs et de connexions simultanées, des volumes de lignes et de pièces, des périodes de restitution et des conditions réseau représentatives. Fixer des objectifs mesurables de temps de réponse et de capacité avant les tests de performance. La source ne fournit ni volumes ni niveaux de service.

**PR-OPS-02** — Convenir de l’hébergement, de la localisation des données, de la fréquence des sauvegardes, de leur conservation, de la perte de données maximale admissible et du délai de reprise. Démontrer la restauration des budgets, décisions, pièces et données de crédit hors production avant la mise en service.

**PR-OPS-03** — Prévoir des environnements séparés de développement, test et production ; des mises en service et retours arrière contrôlés ; la surveillance des erreurs ; des responsabilités d’exploitation et un circuit d’escalade du support. Ce sont des mesures proposées pour la livraison, et non une architecture imposée par la source.

**PR-MIG-01** — Convenir de la reprise de l’organisation, des utilisateurs, désignations, comptes, correspondances, sources, taux figés, budgets approuvés, engagements en cours et soldes de paiement. Rapprocher les totaux repris et obtenir la validation métier avant l’exécution en production.


## 11. Vérification des parcours réalisés


Les scénarios suivants servent à vérifier la future réalisation. Adapter leur exécution à ce qui est effectivement implémenté et à la résolution des décisions ouvertes. Les éléments PR conservent leur statut de proposition.

| Test | Scénario et résultat attendu | Exigences |
| --- | --- | --- |
| AT-01 | Créer un budget d’entité pour un exercice ; la reconduction décale les dates d’un an et alimente l’historique. Un doublon entité et exercice respecte la règle d’unicité convenue. | FR-BUD-01,04 |
| AT-02 | Répartir les montants selon les quatre modes ; rapprocher totaux locaux et USD aux taux figés et arrondis convenus. Des taux ultérieurs ne changent pas les totaux. | FR-CAM-02; FR-BUD-02,03; PR-DATA-01 |
| AT-03 | Soumettre par une hiérarchie comprenant un poste vacant ; réaliser l’imputation, les visas de seuil, puis les arbitrages DGA et DG dans l’ordre requis. | FR-WF-01,02 |
| AT-04 | Tenter de signer sans double authentification, avec un administrateur technique et lors d’étapes consécutives interdites ; refuser ou acheminer selon la règle. | NFR-SIG-01 ; FR-AUTH-02 |
| AT-05 | Refuser un renvoi sans motif. Soumettre à nouveau une version inchangée puis modifiée ; conserver ou invalider les visas sans perdre l’historique. | FR-WF-03 ; FR-AUD-01 |
| AT-06 | Refuser l’approbation d’une société avec un budget non arbitré. Compléter les budgets, joindre le PV du conseil ou obtenir l’approbation du DG holding ; verrouiller. | FR-WF-04 |
| AT-07 | Créer un déficit de financement ; afficher en orange le manque exact par source et permettre la poursuite du circuit. | FR-RES-01–03 |
| AT-08 | Consolider les six sociétés approuvées et les entités arbitrées de la holding ; vérifier total USD, trois signatures et budget initial adopté. | FR-CON-01–03 |
| AT-09 | Tenter un achat avec trop peu de devis ; exiger le nombre convenu ou une dérogation valable. Refuser une explication de 19 caractères ; accepter une explication valable de 20 caractères. | FR-BUY-01–03 |
| AT-10 | Réaliser demande, commande, réception, liquidation, ordonnancement et paiement ; vérifier pièces, statuts, références et remplacement des réservations convenu. | FR-EXP-01–04 ; FR-PAY-01–03 |
| AT-11 | Tenter chaque cumul d’acteurs interdit et une dépense concurrente ; appliquer la séparation et empêcher les réservations en double. | NFR-SIG-02 ; PR-DATA-02 |
| AT-12 | Réaliser un virement de crédits à total constant et un budget rectificatif ; préserver le budget initial et appliquer uniquement les révisions approuvées. | FR-REV-01–03 |
| AT-13 | Tester les limites d’échéance, déficits, dépassements et commandes dérogatoires ; afficher au plus six alertes et compter les autres. | FR-RPT-01,02 |
| AT-14 | Refuser l’accès aux dossiers et pièces d’une autre société. Vérifier les trois langues, les commandes sur téléphone, l’aide et le compteur de signatures. | PR-SEC-01 ; NFR-UX-01–05 |


### Vérifications complémentaires du socle et du design

- Connexion dans l’ordre matricule, code email, mot de passe ; refus d’accès pour le personnel non reconnu.
- Rôles et périmètres cohérents entre la navigation, les dossiers visibles et les actions proposées.
- Présence des trois composants finance sans duplication des budgets.
- Un clic sur Prévision ou Exécution affiche uniquement le message de page en cours de développement, sans contenu ni action métier.
- Depuis Budget, tous les parcours du SRS sont accessibles selon les habilitations, y compris la préparation et le circuit de dépense jusqu’au paiement enregistré.
- Les liens de recherche, signatures et alertes concernant ces parcours ouvrent leurs vues dans Budget, sans activer les deux composants en développement.
- Usage d’Urbanist, des tailles et graisses prescrites, de la palette et de la densité de travail demandées.
- Respect des signatures, renvois, statuts, motifs et pièces correspondant à chaque écran réalisé.
- Lecture des listes et détails sur ordinateur ; navigation et cibles tactiles adaptées sur téléphone.
- Aucun module ERP supplémentaire ou fonction issue de l’outil figurant dans le moodboard.

Une démonstration UI peut présenter les états des parcours avec des données de démonstration identifiées. Elle ne prouve pas l’envoi réel d’emails, la persistance, la protection des accès ou l’exécution des opérations métier. Indiquer séparément ces niveaux d’avancement.

## 12. Ordre de réalisation et consignes pour Codex ou Claude Code

L’ordre ci-dessous organise le travail ; il n’ajoute ni fonctionnalités ni échéancier contractuel.

1. **Lire et inspecter.** Lire ce référentiel, puis examiner le code existant avant de modifier la structure. Repérer les éléments déjà conformes et les manques correspondant au périmètre.
2. **Poser le socle UI.** Mettre en place la charte, les composants de navigation, les listes, les panneaux de détail, les formulaires, les états et la structure responsive. Respecter la séparation entre le contexte global ERP et le composant Budget actif. Ajouter uniquement les pages de développement prévues pour Prévision et Exécution.
3. **Représenter l’accès.** Construire le parcours de connexion et les surfaces autorisées selon les acteurs et périmètres documentés. Ne pas confondre une simulation de rôle avec une autorisation serveur effective.
4. **Construire les parcours de préparation et de validation sous Budget.** Exercices, taux et échéances, besoins, ressources, répartitions, imputation, circuit des budgets, dossier société et consolidation. Conserver leurs relations et les statuts exacts.
5. **Construire le circuit de dépense sous Budget.** Rattachement à la ligne approuvée, demande, commande, réception, liquidation, ordonnancement, paiement enregistré et crédit. Garder les règles ouvertes visibles dans le suivi de développement. Ces écrans appartiennent à Budget ; le composant Exécution reste une page en cours de développement.
6. **Compléter le pilotage.** Révisions, alertes, tâches à signer et historique correspondant aux parcours réalisés, sans créer un catalogue d’états ou d’automatisations non demandé.
7. **Vérifier et rendre compte.** Vérifier les parcours concernés, la cohérence du design et les exigences correspondantes. Indiquer les écrans réalisés, les traitements raccordés, les vérifications exécutées et les dépendances restantes.

Avancer sur les parties définies sans soumettre chaque choix de mise en page à une question. Poser une question ciblée uniquement lorsqu’une règle absente conditionne réellement un traitement ou son résultat. Ne pas remplacer cette règle par un comportement silencieux.

Le premier travail attendu est le socle UI/UX du périmètre décrit. La réalisation d’une interface, le raccordement API et la mise en service sont des niveaux distincts. Ne pas lancer automatiquement la construction complète du backend ERP, d’intégrations, d’un système de stock ou d’une seconde application pour remplir des espaces non spécifiés.

## 13. Terminologie de référence


Exercice : année budgétaire. Périmètre : société ou holding délimitant les droits des rôles. Entité budgétaire : structure portant son propre budget. Ligne budgétaire : besoin chiffré avec calendrier et financement. Imputation : rattachement au compte, à la rubrique et à l’analytique. Visa : attestation du besoin. Arbitrage : décision du DGA puis du DG sur le budget retenu. Approbation : décision rendant exécutoire le dossier d’une société et verrouillant ses budgets.

Engagement : réservation du crédit par bon de commande. Liquidation : constat de la dette après rapprochement de la facture, de la commande et de la réception. Ordonnancement : instruction autorisant le trésorier à payer. Budget initial : budget du groupe adopté par le conseil de la holding. Budget révisé : budget initial augmenté des révisions approuvées. Budget des ressources : financement attendu par source. Équilibre : comparaison des ressources avec les dépenses qu’elles financent.
