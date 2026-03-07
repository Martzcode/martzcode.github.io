# 📁 Structure des Pages Additionnelles

Ce dossier centralise les contenus futurs et les éléments structurels du site web.

## 🗂️ Sous-répertoires

- **`/projects`** : Destiné à accueillir les pages HTML détaillées pour chaque projet mis en avant sur le portfolio.
- **`/pages`** : Réservé aux pages statiques indépendantes (ex: page de remerciement, version longue du CV, mentions légales).
- **`/components`** : Destiné au stockage de fragments de code réutilisables ou de futurs templates partagés entre les différentes pages du site.

## 💡 Conseils pour l'évolutivité

Lors de la création de nouvelles pages dans ces dossiers, veillez à :
1. référencer correctement les styles globaux (`../style.css`) et les scripts (`../script.js`).
2. Utiliser les classes Tailwind pour maintenir la cohérence visuelle avec la page d'accueil.
3. Utiliser les icônes stockées dans `/assets/icons` pour la cohérence de la marque.
