# Mirabell — Test technique

Exercice technique pour le poste de Développeur Frontend React.js chez Mirabell Studio : une plateforme de diffusion de contenus vidéo (interface de consultation) et un dashboard d'administration pour suivre l'activité de la plateforme.

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
| Graphiques   | Recharts / Mantine Charts      |
| Icônes       | Phosphor Icons                 |
| Animations   | Framer Motion                  |
| Tests        | Vitest + React Testing Library |

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
├── .github/workflows/   # CI (lint, format, typecheck, test, build)
├── public/               # Assets statiques servis tels quels
├── src/
│   ├── app/              # Bootstrap de l'application (App, Router, routes)
│   ├── lib/
│   │   └── configs/       # Configuration des libs (React Query, ...)
│   ├── pages/             # Composants de page, associés à une route
│   └── test/              # Setup global des tests
├── .editorconfig
├── .prettierrc
├── eslint.config.js
└── vite.config.ts
```
