# Monster Slayer - Projet Vue.js

## Description

**Monster Slayer** est un mini-jeu de type RPG développé en Vue.js où le joueur combat un monstre. Le jeu inclut des mécanismes de base tels que les attaques, la guérison et un journal de combat pour suivre les actions en temps réel.

Ce projet utilise Vue 3 et Vite pour un développement rapide et efficace et s'inscrit dans un processus d'auto-formation de l'auteur (via Udemy dans le cas présent).

## Fonctionnalités

- Attaque normale (2d6 dégâts)
- Attaque spéciale (dégâts plus puissants)
- Action de guérison pour restaurer des points de santé
- Journal de combat affichant les actions du joueur et du monstre
- Barres de santé réactives pour le joueur et le monstre

## Installation

1. Assurez-vous que Node.js et npm sont installés sur votre machine.

2. Clonez ce dépôt ou copiez les fichiers dans un nouveau dossier :

   ```bash
   git clone https://github.com/votre-utilisateur/monster-slayer.git
   cd monster-slayer

3. Initialisez le projet Node.js et installez les dépendances :

   ```bash
    npm install

4. Démarrez le serveur de développement avec Vite :

   ```bash
    npm run dev

Accédez à l'application via http://localhost:3000.

## Utilisation

* L'interface utilisateur présente des boutons pour réaliser une attaque normale, une attaque spéciale, se soigner ou abdiquer.
* Les barres de santé du monstre et du joueur changent dynamiquement en fonction des dégâts ou de la guérison.
* Le journal de combat liste les actions effectuées par le joueur et le monstre.

## Structure du projet

``` bash
.
├── index.html        # Page principale du jeu
├── package.json      # Fichier de configuration npm
├── src/
│   ├── App.vue       # Composant principal Vue.js
│   ├── main.js       # Point d'entrée du projet Vue.js
├── styles.css        # Fichier de styles
├── README.md         # Ce fichier
└── vite.config.js    # Configuration de Vite
```

## Dépendances

## Commandes npm
