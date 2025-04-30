# Étape 1 : Utiliser une image de Node.js pour construire le projet
FROM node:21 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Supprimer les lignes 21 à 24 dans le fichier ReactBlockSpec.d.ts
RUN sed -i '21,24d' node_modules/@blocknote/react/types/src/schema/ReactBlockSpec.d.ts

# Construire le projet
RUN npm run build

# Étape 2 : Utiliser une image pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers statiques générés dans le dossier de build vers le répertoire de Nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

# Démarrer Nginx pour servir les fichiers statiques
CMD ["nginx", "-g", "daemon off;"]