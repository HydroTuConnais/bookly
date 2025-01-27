# Étape 1 : Construction de l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Installation des dépendances
COPY package.json package.json ./
RUN npm install

# Copie du code source
COPY . .

# Compilation du code TypeScript en JavaScript
RUN npm run build

# Étape 2 : Exécution en production
FROM node:20-alpine

WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /app /app

# Exposer le port
EXPOSE 4000

# Nouvelle commande de démarrage
CMD ["npm", "run", "start:prod"]
