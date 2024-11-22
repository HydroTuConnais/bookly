# NotionLite - React + Express + JWT

Ce projet est une application de gestion de projets et de documents inspirée de Notion. Elle utilise **React** pour le front-end, **Express** pour le back-end, et **JWT (JSON Web Tokens)** pour la gestion de l'authentification.

---

## 🚀 Fonctionnalités

### Front-End (React) :
- Interface utilisateur simple et intuitive.
- Création, édition et suppression de notes.
- Gestion des utilisateurs via un système de connexion/déconnexion.
- Interface réactive pour une expérience utilisateur optimale.

### Back-End (Express) :
- API REST pour gérer les utilisateurs et les notes.
- Authentification sécurisée via JWT.
- Validation et gestion des requêtes via **middleware**.
- Base de données structurée pour stocker les utilisateurs et les notes.

---

## 📂 Structure du projet

### Front-End
```
/src
  |-- /components    # Composants React (Login, Notes, etc.)
  |-- /pages         # Pages principales (Dashboard, Login)
  |-- /services      # Gestion des appels API
  |-- /utils         # Utilitaires (gestion des tokens, etc.)
  |-- App.js         # Entrée principale de l'application
```

### Back-End
```
/server
  |-- /routes        # Routes pour utilisateurs et notes
  |-- /controllers   # Logique des API (CRUD)
  |-- /models        # Modèles de la base de données
  |-- /middleware    # Middleware pour la gestion des requêtes et l'authentification
  |-- server.js      # Entrée principale du serveur Express
```

---

## 🛠️ Technologies utilisées

### Front-End :
- React
- React Router
- Axios (pour les appels API)
- CSS (ou une librairie CSS comme Tailwind)

### Back-End :
- Node.js
- Express.js
- SQLite
- JWT (JSON Web Token) pour l'authentification
- Bcrypt pour le hachage des mots de passe

---

## 📦 Installation et exécution

### Prérequis :
- Node.js v16 ou supérieur
- SQLite
- Un éditeur de code (Visual Studio Code recommandé)

### Étapes :
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/username/notionlite.git
   cd notionlite
   ```

2. Installez les dépendances pour le front-end :
   ```bash
   cd client
   npm install
   ```

3. Installez les dépendances pour le back-end :
   ```bash
   cd ../server
   npm install
   ```

4. Configurez les variables d'environnement :
   Créez un fichier `.env` dans le dossier 

server

 avec les clés suivantes :
   ```
   SERVER_PORT=5000
   JWT_SECRET=votre_secret
   ```

5. Lancez le serveur back-end :
   ```bash
   cd server
   npm run dev
   ```

6. Lancez le front-end :
   ```bash
   cd client
   npm start
   ```

7. Ouvrez votre navigateur à l'adresse suivante :
   ```
   http://localhost:3000
   ```

---

## 🔒 Authentification JWT

- **Connexion** : Lorsqu'un utilisateur se connecte, un JWT est généré et envoyé au client. Ce token est stocké dans le localStorage.
- **Middleware de protection** : Les routes nécessitant une authentification sont protégées par un middleware qui vérifie le JWT dans le header `Authorization`.

---

## 📖 API Routes

### Utilisateurs
- `POST /api/auth/register` : Crée un nouvel utilisateur.
- `POST /api/auth/login` : Connecte un utilisateur et renvoie un token JWT.

### Notes
- `GET /api/notes` : Récupère toutes les notes de l'utilisateur.
- `POST /api/notes` : Crée une nouvelle note.
- `PUT /api/notes/:id` : Met à jour une note.
- `DELETE /api/notes/:id` : Supprime une note.

---

## 📋 To-Do

- [ ] Ajouter des tests unitaires.
- [ ] Implémenter la gestion des fichiers (upload).
- [ ] Ajouter une interface de recherche de notes.

---

## 🤝 Contribution

Les contributions sont les bienvenues !  
Créez une branche, proposez vos modifications via une **Pull Request** et nous serons heureux de les examiner. 😊

---

## 🧑‍💻 Auteur

- **Martig Antonin**

---

**Merci d'avoir exploré ce projet !** 🌟