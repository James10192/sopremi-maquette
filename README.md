# SOPREMI Maquette

Application web de démonstration pour SOPREMI, pensée comme une maquette de présentation et non comme un produit connecté à la production.

L'objectif du projet est de montrer à l'employeur à quoi pourrait ressembler une future application de pilotage interne pour l'entreprise:

- suivi des projets de prestation minière
- supervision des équipes et des équipements
- validation des actions sensibles par la direction générale
- calcul visuel de la rentabilité
- tableau de bord de reporting

Les données affichées dans l'interface sont fictives. Elles servent uniquement à illustrer le comportement attendu du futur produit.

## Contexte

Le cahier des charges transmis décrit une application de gestion orientée exploitation minière avec plusieurs besoins métiers:

- création et supervision de projets
- enregistrement du personnel et des équipements
- suivi de la présence, de l'absence et de la productivité
- gestion des affectations chantier / engin / chauffeur
- notification et validation par la direction générale
- consolidation des indicateurs de performance

Cette maquette reprend ces axes pour donner une vision claire du produit final, sans complexité backend inutile au stade de la présentation.

## Ce que montre la maquette

La page d'accueil simule un cockpit opérationnel avec:

- un bandeau de marque SOPREMI basé sur le logo officiel
- des indicateurs globaux de supervision
- des cartes de projets avec progression, rentabilité et niveau de risque
- une section validation DG
- une vue du personnel et des équipements
- un journal de reporting et de notifications
- une chaîne de décision qui illustre le workflow métier

L'interface est volontairement dense, car le besoin métier est celui d'un outil de gestion et de contrôle, pas d'une landing page marketing.

## Stack technique

- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- React 19
- Vite
- Tailwind CSS 4
- `lucide-react` pour les icônes
- `pnpm` comme gestionnaire de paquets

La maquette est prête pour évoluer ensuite vers une vraie couche temps réel avec Convex, mais ce n'est pas encore branché dans cette version.

## Branding SOPREMI

Le projet utilise des assets publics récupérés sur le site officiel SOPREMI:

- logo principal
- icône de navigateur

La palette visuelle reprend les tons sombres et les accents orange / teal observés sur le site officiel afin de garder une cohérence avec l'identité visuelle de l'entreprise.

## Structure du projet

- `src/routes/index.tsx` : page principale de la maquette
- `src/routes/about.tsx` : page de présentation du prototype
- `src/routes/__root.tsx` : structure HTML globale, métadonnées et shell de l'application
- `src/components/Header.tsx` : bandeau supérieur et navigation
- `src/components/Footer.tsx` : pied de page
- `src/components/MockDashboard.tsx` : contenu principal de la maquette
- `src/styles.css` : thème visuel global
- `public/brand/` : assets SOPREMI utilisés dans l'interface

## Fonctionnalités simulées

La maquette illustre notamment:

- authentification et séparation des rôles
- validation des projets par la direction générale
- suivi des projets et de leur progression
- état des équipements
- présence du personnel
- indicateurs de rentabilité
- alertes et notifications de supervision

Ces éléments sont présentés en mode visuel. Ils ne sont pas encore reliés à une base de données ni à un moteur de calcul métier.

## Lancement en local

Prérequis:

- Node.js installé
- `pnpm` activé via Corepack

Commande d'installation:

```bash
pnpm install
```

Commande de développement:

```bash
pnpm dev
```

Par défaut, l'application est disponible sur:

- `http://localhost:3000`
- `http://[::1]:3000`

## Build de production

Pour vérifier que le projet compile correctement:

```bash
pnpm build
```

## Test

Les tests sont prévus via Vitest:

```bash
pnpm test
```

À ce stade, la maquette est surtout validée visuellement et par build. Les tests métier seront plus utiles quand la couche de données et les règles de gestion seront ajoutées.

## État actuel

Cette version est volontairement une maquette:

- pas de backend Convex branché
- pas de données persistantes
- pas de workflow réel de validation
- pas de calcul métier final

L'objectif est uniquement de montrer la direction produit, le style d'interface et la logique des écrans.

## Évolution prévue

Les prochaines étapes naturelles seraient:

- brancher Convex pour le temps réel
- ajouter l'authentification
- relier les entités métier à une vraie base de données
- ajouter la création et la modification des projets
- implémenter les validations DG
- ajouter le pointage et les calculs de présence / productivité
- générer des rapports exploitables

## Remarque

Le nom de la maquette peut être adapté si l'entreprise veut présenter une version plus formelle, plus commerciale ou plus technique. Le socle actuel est déjà prêt pour recevoir cette évolution.
