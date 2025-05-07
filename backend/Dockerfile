# Étape 1 : Construction de l'application
FROM node:21-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

COPY start.sh /start.sh
RUN chmod +x /start.sh

# Génération des fichiers Prisma
RUN npm prisma generate

# Compilation du code TypeScript en JavaScript
RUN npm run build

# Étape 2 : Exécution en production
FROM node:21-alpine

WORKDIR /app

# Installer les dépendances nécessaires
RUN apk add --no-cache postgresql-client

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /app /app

# Exposer le port
EXPOSE 5000

# Nouvelle commande de démarrage
CMD ["npm", "start"]