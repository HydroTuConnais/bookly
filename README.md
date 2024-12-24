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

## 📦 Installation et exécution (FRONT)

### Prérequis :
- Node.js v16 ou supérieur
- SQLite
- Un éditeur de code (Visual Studio Code recommandé)

### Étapes :
1. Clonez le dépôt :
   ```bash
   git clone https://gitlab.com/hydro-dev/bookly.git bookly
   cd bookly
   ```

2. Installez les dépendances pour le front-end :
   ```bash
   cd client
   npm install
   ```

3. Installez les dépendances pour le back-end :
   ```bash
   cd server
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

## 📦 Installation et exécution (BACK)

### Prérequis :
- Node.js v16 ou supérieur
- Postgres
- Prisma CLI

### Étapes :
1. Installez les dépendances pour le back-end :
   ```bash
   cd server
   npm install
   ```
   
2. Configurez les variables d'environnement :
   Créez un fichier `.env` dans le dossier `server` avec les clés suivantes :
   ```
   SERVER_PORT=5000
   JWT_SECRET=votre_secret
   DATABASE_URL="postgresql://(username):(password)@localhost:5432/(database name)"
   ```

3. Modifiez le schéma Prisma (`prisma/schema.prisma`) pour définir vos modèles de données.

4. Migrate votre base de données :
   ```bash
   npx prisma migrate dev --name init
   ```

5. Mettre a jours votre base de données :
   ```bash
   npx prisma migrate dev --name
   ```

6. Lancez le serveur back-end :
   ```bash
   npm run dev
   ```

7. Pour visualiser la base de donnée simplement :
   ```bash
   npx prisma studio
   ```

---

## 🔒 Authentification JWT
- **Connexion** : Lorsqu'un utilisateur se connecte, un JWT est généré et envoyé au client. Ce token est stocké dans le localStorage.
- **Middleware de protection** : Les routes nécessitant une authentification sont protégées par un middleware qui vérifie le JWT dans le header `Authorization`.

---

## 📖 API Routes

| Method | Endpoint                    | Body                                                              | Header            | Response                                                                                                                                                        | Response Code        | Description                                          | Sécurisé |
|--------|-----------------------------|-------------------------------------------------------------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|------------------------------------------------------|----------|
| POST   | /auth/register               | { <br> &nbsp;&nbsp;email: String, <br> &nbsp;&nbsp;password: String <br> }                |                   | { <br> &nbsp;&nbsp;"id": String, <br> &nbsp;&nbsp;"email": String, <br> &nbsp;&nbsp;"name": String, <br> &nbsp;&nbsp;"password": String, <br> &nbsp;&nbsp;"createdAt": TimeStamp, <br> &nbsp;&nbsp;"updatedAt": TimeStamp <br> }         | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">201</span> Created          | Inscrire un utilisateur                             | ❌        |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">400</span>                  | Email and password are required                     |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">409</span>                  | Email already exists                                |          |
| POST   | /auth/login                  | { <br> &nbsp;&nbsp;email: String, <br> &nbsp;&nbsp;password: String <br> }                |                   | { <br> &nbsp;&nbsp;"token": String <br> }                                                                                                                                   | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Connecter un utilisateur                            | ❌        |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">400</span>                  | Email and password are required                     |          |
| GET    | /auth/check                  |                                                                   | Author: String     | { <br> &nbsp;&nbsp;"isAuthenticated": Bool <br> }                                                                                                                           | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Check si le token est encore valide                 | ✅        |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">400</span>                  | Token required                                      |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">401</span>                  | Token invalide ou expiré                            |          |
| POST   | /documents                   | { <br> &nbsp;&nbsp;"title": String, <br> &nbsp;&nbsp;"userId": String <br> }              | Author: String     | { <br> &nbsp;&nbsp;"id": String, <br> &nbsp;&nbsp;"title": String, <br> &nbsp;&nbsp;"userId": String, <br> &nbsp;&nbsp;"isArchived": Bool, <br> &nbsp;&nbsp;"parentDocumentId": String, <br> &nbsp;&nbsp;"content": String, <br> &nbsp;&nbsp;"coverImage": String, <br> &nbsp;&nbsp;"icon": String, <br> &nbsp;&nbsp;"isPublished": Bool, <br> &nbsp;&nbsp;"createdAt": TimeStamp, <br> &nbsp;&nbsp;"updatedAt": TimeStamp <br> } | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">201</span> Created          | Crée un nouveau document                            | ✅        |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">400</span>                  | Title and userId are required                       |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">400</span>                  | Document parent pas existant                        |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">404</span>                  | Error creating document                             |          |
| GET    | /documents/:id               |                                                                   | Author: String, <br> UserId: String |                                                                                                                                                                | <span style="color:green">200</span> OK                    |                                                      | ✅        |
| PUT    | /documents/:id               | { <br> &nbsp;&nbsp;"title": String, <br> &nbsp;&nbsp;"content": String <br> }             | Author: String, <br> UserId: String | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">202</span> Accepted         | Modifier le contenu ou le titre d’un document      | ✅        |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">401</span>                  | Unauthorized or Not Found                           |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">404</span>                  | Error updating document                             |          |
| DELETE | /documents/:id               |                                                                   | Author: String, <br> UserId: String | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Delete a document                                   | ✅        |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">401</span>                  | Unauthorized or Not Found                           |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">500</span>                  | Error deleting document                             |          |
| POST   | /documents/:id/archive       |                                                                   | Author: String, <br> UserId: String | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Archive a document                                  | ✅        |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">401</span>                  | Unauthorized or Not Found                           |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">500</span>                  | Error finding parent document                       |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">500</span>                  | Error recursive archiving document                  |          |
| POST   | /documents/:id/restore       |                                                                   | Author: String, <br> UserId: String | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Restore an archived document                        | ✅        |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">401</span>                  | Unauthorized or Not Found                           |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">500</span>                  | Error restore document                              |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">500</span>                  | Error recursive restore document                    |          |
| GET    | /sidebar           |                                                                   | Author: String,<br> UserId: String | [ <br> &nbsp;&nbsp;{ <br> &nbsp;&nbsp;&nbsp;&nbsp;"id": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"title": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"userId": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"isArchived": Bool, <br> &nbsp;&nbsp;&nbsp;&nbsp;"parentDocumentId": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"content": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"coverImage": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"icon": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"isPublished": Bool, <br> &nbsp;&nbsp;&nbsp;&nbsp;"createdAt": TimeStamp, <br> &nbsp;&nbsp;&nbsp;&nbsp;"updatedAt": TimeStamp <br> &nbsp;&nbsp;} <br> ] | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Get documents for the sidebar                        | ✅        |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">500</span>                  | Error getting sidebar documents                     |          |
| GET    | /documents/trash             |                                                                   | Author: String     | [ <br> &nbsp;&nbsp;{ <br> &nbsp;&nbsp;&nbsp;&nbsp;"id": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"title": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"userId": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"isArchived": Bool, <br> &nbsp;&nbsp;&nbsp;&nbsp;"parentDocumentId": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"content": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"coverImage": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"icon": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"isPublished": Bool, <br> &nbsp;&nbsp;&nbsp;&nbsp;"createdAt": TimeStamp, <br> &nbsp;&nbsp;&nbsp;&nbsp;"updatedAt": TimeStamp <br> &nbsp;&nbsp;} <br> ] | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Get archived document                               | ✅        |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">500</span>                  | Error getting archived documents                    |          |
| POST   | /documents/:id/shared       | { <br> &nbsp;&nbsp;"sharedEmail": String <br> }                   | Author: String, <br> UserId: String | { <br> &nbsp;&nbsp;"success": Bool <br> }                                                                                                                                    | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Share a document with another user                  | ✅        |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">400</span>                  | Shared email is required                            |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">401</span>                  | Unauthorized or Not Found                           |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">404</span>                  | Shared user not found                               |          |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">500</span>                  | Error sharing document                              |          |
| GET    | /documents/shared           |                                                                   | Author: String, <br> UserId: String | [ <br> &nbsp;&nbsp;{ <br> &nbsp;&nbsp;&nbsp;&nbsp;"id": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"title": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"userId": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"isArchived": Bool, <br> &nbsp;&nbsp;&nbsp;&nbsp;"parentDocumentId": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"content": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"coverImage": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"icon": String, <br> &nbsp;&nbsp;&nbsp;&nbsp;"isPublished": Bool, <br> &nbsp;&nbsp;&nbsp;&nbsp;"createdAt": TimeStamp, <br> &nbsp;&nbsp;&nbsp;&nbsp;"updatedAt": TimeStamp <br> &nbsp;&nbsp;} <br> ] | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">200</span> OK               | Get documents shared with the user                  | ✅        |
|        |                             |                                                                   |                   |                                                                                                                                                                | &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">500</span>                  | Error getting shared documents                      |          |


<br>
<br>

## MCD Diagram

![MCD Diagram](https://lucid.app/publicSegments/view/0bc5ec68-4ea6-4086-b0db-4ecc48fda31a/image.png)

---


# Modèle Logique de Données (MLD)

---


### Table `User`
| Nom de colonne  | Type        | Contraintes               |
|------------------|-------------|---------------------------|
| `id`            | `UUID`      | PK, Généré par défaut     |
| `email`         | `String`    | Unique, Non NULL          |
| `name`          | `String`    | Optionnel                 |
| `password`      | `String`    | Non NULL                  |
| `createdAt`     | `DateTime`  | Défaut : `now()`          |
| `updatedAt`     | `DateTime`  | Mis à jour automatiquement |

#### Relations :
- **1:N** avec `Document` (via `documents`).
- **N:N** avec `Document` pour les documents partagés (via `sharedDocuments` et la relation nommée `"SharedDocuments"`).

---

### Table `Document`
| Nom de colonne       | Type        | Contraintes                |
|-----------------------|-------------|----------------------------|
| `id`                 | `UUID`      | PK, Généré par défaut      |
| `title`              | `String`    | Non NULL                   |
| `userId`             | `UUID`      | FK vers `User(id)`         |
| `isArchived`         | `Boolean`   | Défaut : `false`           |
| `parentDocumentId`   | `UUID`      | FK vers `Document(id)` (relation récursive) |
| `content`            | `String`    | Optionnel                  |
| `coverImage`         | `String`    | Optionnel                  |
| `icon`               | `String`    | Optionnel                  |
| `isPublished`        | `Boolean`   | Défaut : `false`           |
| `urlPublished`       | `String`    | Unique, Optionnel          |
| `createdAt`          | `DateTime`  | Défaut : `now()`           |
| `updatedAt`          | `DateTime`  | Mis à jour automatiquement |

#### Relations :
- **N:1** avec `User` (via `ownerUser`).
- **N:N** avec `User` pour les documents partagés (via `sharedUsers` et la relation nommée `"SharedDocuments"`).
- **1:N** avec elle-même pour les documents enfants (via `parentDocument` et `children`).

#### Index :
- `idx_documents_by_user` : sur `userId`.
- `idx_documents_by_user_parent` : sur `userId, parentDocumentId`.

---

## Relations entre Tables

- **User** (1) ↔ (N) **Document** : Un utilisateur peut posséder plusieurs documents.
- **User** (N) ↔ (N) **Document** (via `sharedDocuments`) : Les documents peuvent être partagés entre plusieurs utilisateurs.
- **Document** (1) ↔ (N) **Document** : Relation parent-enfant pour structurer les documents.

---

### Looping MLD

#### **User**
```plaintext
User = (
    id UUID, 
    email VARCHAR(255), 
    name VARCHAR(255), 
    password VARCHAR(255), 
    createdAt TIMESTAMP, 
    updatedAt TIMESTAMP
);

Document = (
    id UUID, 
    title VARCHAR(255), 
    userId UUID, 
    isArchived BOOLEAN, 
    parentDocumentId UUID, 
    content TEXT, 
    coverImage VARCHAR(255), 
    icon VARCHAR(255), 
    isPublished BOOLEAN, 
    urlPublished VARCHAR(255), 
    createdAt TIMESTAMP, 
    updatedAt TIMESTAMP
);


SharedDocuments = (
    userId UUID, 
    documentId UUID
);

Lien_1 = (#id [User], #userId [Document]);
Lien_2 = (#id [Document], #parentDocumentId [Document]);
Lien_3 = (#userId [SharedDocuments], #id [User]);
Lien_4 = (#documentId [SharedDocuments], #id [Document]);

```

## 🤝 Contribution

Les contributions sont les bienvenues !  
Créez une branche, proposez vos modifications via une **Pull Request** et nous serons heureux de les examiner. 😊

---

## 🧑‍💻 Auteur

- **Martig Antonin**

---

**Merci d'avoir exploré ce projet !** 🌟