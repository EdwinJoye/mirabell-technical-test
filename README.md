# Mirabell — Test technique

Exercice technique pour le poste de Développeur Frontend React.js chez Mirabell Studio : une plateforme de diffusion de contenus vidéo (interface de consultation) et un dashboard d'administration pour suivre l'activité de la plateforme.

## Fonctionnalités

- **Accueil** (`/`) — page de présentation.
- **Explore** (`/explore`) — catalogue de films alimenté par l'API TMDb : recherche, filtre par genre/popularité, film mis en avant, ligne "Continue Watching", recommandations par genre, grille avec scroll infini. Entièrement responsive.
- **Dashboard** (`/dashboard`) — analytics de la plateforme (vues, temps de visionnage, appareils, genres, top films) et par film (vues, rétention, appareils, fidélité des spectateurs, téléchargements hors-ligne, momentum). Données simulées via des fichiers JSON, consommées comme le serait une vraie API.
- Performance : pages chargées en lazy-loading (code-splitting par route), images TMDb dimensionnées selon leur usage, posters/backdrops en chargement différé natif (`loading="lazy"`).

## Stack

| Layer        | Technologie                    |
| ------------ | ------------------------------ |
| Framework    | React 19                       |
| Langage      | TypeScript                     |
| Build tool   | Vite                           |
| UI library   | Mantine v9                     |
| Styling      | Tailwind CSS v4                |
| Routing      | React Router                   |
| Server state | TanStack Query                 |
| Client state | Zustand                        |
| Validation   | Zod                            |
| Graphiques   | Recharts / Mantine Charts      |
| Icônes       | Phosphor Icons                 |
| Animations   | Framer Motion                  |
| Tests        | Vitest + React Testing Library |

## Configuration

L'application consomme l'API [TMDb](https://www.themoviedb.org/documentation/api). Créer un fichier `.env` à la racine du projet avec un token d'accès TMDb :

```
VITE_TMDB_ACCESS_TOKEN=votre_token_tmdb
```

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Tests

```bash
npm run test
```

## Build

```bash
npm run build
```

## Qualité de code

| Commande               | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run lint`         | Analyse statique (ESLint, règles type-aware)    |
| `npm run format`       | Formate le code avec Prettier                   |
| `npm run format:check` | Vérifie le formatage sans modifier les fichiers |
| `npm run test`         | Lance les tests (Vitest)                        |

### Pre-commit hooks

[Husky](https://typicode.github.io/husky/) et [lint-staged](https://github.com/okonet/lint-staged) sont configurés pour lancer automatiquement ESLint (`--fix`) et Prettier sur les fichiers stagés avant chaque commit. Le hook s'installe automatiquement à l'exécution de `npm install` (script `prepare`) — aucune action manuelle n'est nécessaire après le clone.

### Intégration continue

Une CI GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) rejoue `lint`, `format:check`, le typecheck, les tests et le build sur chaque push et pull request vers `main`.

## Structure

```
.
├── .github/workflows/    # CI (lint, format, typecheck, test, build)
├── public/                # Assets statiques servis tels quels
├── src/
│   ├── app/               # Bootstrap de l'application (App, routes, lazy pages)
│   ├── components/        # Composants UI, organisés par domaine
│   │   ├── dashboard/        # Cards/rows du dashboard (sous-dossiers movie/ et global/)
│   │   ├── explore/          # Toolbar, hero, bannières de la page Explore
│   │   ├── movie/            # Cartes films, overlay de détails
│   │   ├── layout/            # Navbar, layout partagé
│   │   └── ui/                 # Composants génériques réutilisables (boutons, tooltips, ...)
│   ├── features/          # Logique métier par domaine (hooks, services, types, store)
│   │   ├── catalog/          # Catalogue TMDb (recherche, pagination)
│   │   ├── dashboard/         # Données mock du dashboard (JSON + service)
│   │   ├── genres/
│   │   ├── movie-details/
│   │   ├── navbar/
│   │   ├── scroll/
│   │   ├── watch-progress/
│   │   └── watch-status/
│   ├── layouts/            # Layout partagé (navbar, structure de page)
│   ├── lib/
│   │   ├── configs/          # Configuration des libs (React Query, TMDb)
│   │   ├── theme/              # Thème Mantine, constantes de couleur, helpers de hover
│   │   └── tmdb/                 # Client HTTP TMDb, schémas Zod, types
│   ├── pages/              # Composants de page, associés à une route
│   └── test/                # Setup global des tests
├── .editorconfig
├── .prettierrc
├── eslint.config.js
└── vite.config.ts
```
