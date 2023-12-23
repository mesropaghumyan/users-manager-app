# [Users Manager](http://users-manager-app-p2103901-80b754b04a31688dd2c3016322c43e22dc66.pages.univ-lyon1.fr/#/login)

## 🎯 Objectif
Cette application Angular vise à gérer efficacement des utilisateurs en effectuant des opérations CRUD (Create, Read, Update, Delete) via des requêtes HTTP vers l'API [MockApi](https://657d98f13e3f5b189462cb9b.mockapi.io/api/v1/users). Conçue pour mettre en avant le développement Front-End, elle offre une interface utilisateur intuitive pour une gestion simplifiée des utilisateurs.

## 🧩 Fonctionnalitées

> ⚠️ **Remarque :** La session est gérée localement pour se concentrer sur les aspects Front-End.

### Authentification
- Connexion et inscription des utilisateurs.
- Déconnexion sécurisée.

### Gestion des Utilisateurs
- Ajout, suppression, modification et consultation des détails des utilisateurs.

### Fonctionnalités Avancées
- Filtrage et tri (ascendant/descendant) des utilisateurs par nom, email et profession.
- Ajustement de la pagination (5, 10, 20 utilisateurs par page).

## ⚙️ Technologies
- **Framework :** [Angular 16.2.5](https://www.npmjs.com/package/@angular/cli/v/16.2.5)
- **Design :** [Tailwind CSS](https://tailwindcss.com/docs/guides/angular), [Angular Material](https://material.angular.io/)
- **API :** Utilisation de [MockApi](https://mockapi.io/) pour la création des endpoints nécessaires.

Pour l'API j'ai fait le choix d'utiliser [MockApi](https://mockapi.io/) afin de générer facilement les [endpoints](https://657d98f13e3f5b189462cb9b.mockapi.io/api/v1/users) nécessaire au fonctionnment de l'application.

## 💻 Installation locale

### Clonage du projet :
```bash
git clone https://forge.univ-lyon1.fr/p2103901/users-manager-app.git
```

### Installation des dépendances :
```bash
npm install
```

### Démarrage du serveur local :
```bash
ng serve
```

## 🧑🏻‍💻 Feed back

Ce projet m'a permis de renforcer mes compétences en Angular, notamment sur les observables, et de m'initier à TypeScript, que j'intègre désormais dans mes projets Front-End et Back-End avec Node.js.

## 📥 Contact

Pour toute question ou précision, n'hésitez pas à me contacter : <b>mesrop.aghumyan@etu.univ-lyon1.fr</b>.
