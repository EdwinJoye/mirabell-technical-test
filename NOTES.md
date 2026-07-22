# Notes de développement

## Choix fonctionnels et techniques

- **Stack** : React 19, TypeScript, Vite, Mantine, Tailwind CSS, TanStack Query, Zustand, Zod, Framer Motion.
- **Deux dashboards en un**, accessibles via un switch en haut à droite de la barre du dashboard : une vue **Globale** (activité de toute la plateforme) et une vue **par film** (analytics détaillées d'un film sélectionné). Ce choix m'a semblé plus pertinent qu'un dashboard unique et générique : un admin qui surveille la santé globale de la plateforme et un admin qui creuse la performance d'un film précis n'ont pas les mêmes besoins ni les mêmes indicateurs à regarder.
- **Deux "modes" dans Explore également** : une vue de découverte (ce que l'application propose directement — film à la une, "Continue Watching", recommandations par genre) et une vue catalogue (ce qu'on obtient quand on cherche soi-même — recherche, filtre par genre/popularité, grille avec scroll infini). L'idée est de couvrir à la fois la découverte passive et la recherche active, comme sur une vraie plateforme de streaming.
- **Données** : le catalogue (Livrable 1) utilise la vraie API TMDb. Pour le dashboard (Livrable 2), j'ai complété les données TMDb par des données fictives que j'ai générées moi-même — TMDb ne fournit aucune donnée d'usage de plateforme (vues, temps de visionnage, appareils, rétention, etc.), donc j'ai dû les simuler pour que le dashboard ait quelque chose de crédible à afficher.
- Je me suis inspiré de quelques designs vus notamment sur Dribbble pour l'esthétique générale de l'interface.

## Arbitrages réalisés

- Dans le dashboard, l'ordre des cards suit une logique de mise en page / équilibre visuel plutôt qu'un ordre strictement fonctionnel ou hiérarchique des données. J'en ai bien conscience — j'aurais voulu concilier les deux (un ordre à la fois logique et visuellement équilibré), mais je n'ai pas eu le temps de le retravailler.

## Difficultés rencontrées

- Le point le plus problématique a été de faire cohabiter Mantine et Tailwind CSS pour le responsive : certains composants Mantine imposent leurs styles via du CSS non rattaché à un "layer" CSS, ce qui fait qu'une classe Tailwind censée s'appliquer seulement à partir d'un breakpoint ne prenait parfois jamais le dessus. Une fois le mécanisme compris, ça se contourne bien, mais ça m'a fait perdre du temps au début.
- Garder un jeu de données mock volumineux (192 films) cohérent (pourcentages qui somment à 100, vues qui correspondent aux totaux affichés ailleurs dans l'app) a demandé un peu de rigueur.

## Points que j'aurais aimé développer davantage

- Réconcilier l'ordre des cards du dashboard entre logique métier et équilibre visuel (voir arbitrage ci-dessus).
- Une meilleure séparation admin / utilisateur — pour l'instant le lien vers le dashboard est un lien de navigation comme un autre, sans notion de rôle.
- Davantage de tests automatisés.

## Améliorations envisagées pour une version ultérieure

- Remplacer les données mock du dashboard par une vraie API/backend.
- Virtualiser la grille du catalogue pour supporter un très grand nombre de films sans dégrader les performances.
- Ajouter une gestion des rôles (utilisateur / admin) réelle.

## Informations pratiques

- L'application est déployée sur Vercel : https://mirabell-technical-test.vercel.app/
- Un token d'accès TMDb (`VITE_TMDB_ACCESS_TOKEN`) est nécessaire pour faire fonctionner l'application — voir le `README.md` pour la configuration.
- L'historique de commits est disponible pour suivre l'avancée du travail au fur et à mesure plutôt que juste le résultat final.

En espérant que l'ensemble du travail vous convienne !
