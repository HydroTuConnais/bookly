# Étape 1 : Construction de l'application
FROM node:21-alpine AS builder

WORKDIR /app

# Copier les fichiers package pour installer les dépendances
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

# Génération des fichiers Prisma
RUN npx prisma generate

# Compilation du code TypeScript en JavaScript
RUN npm run build

# Étape 2 : Exécution en production
FROM node:21-alpine

WORKDIR /app

# Installer les dépendances nécessaires
RUN apk add --no-cache postgresql-client

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/start.sh ./start.sh
RUN chmod +x ./start.sh

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# Exposer le port
EXPOSE 5000

# Commande de démarrage
CMD ["npm", "start"]