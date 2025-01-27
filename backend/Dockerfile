# Étape 1 : Construction de l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Installation des dépendances
COPY package.json package.json ./
RUN npm install

# Copie du code source
COPY . .

# Génération des fichiers Prisma
RUN npx prisma generate

# Compilation du code TypeScript en JavaScript
RUN npm run build

# Étape 2 : Exécution en production
FROM node:20-alpine

WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /app /app

# # Copier le script sh.sh dans l'image
# COPY sh.sh /app/sh.sh

# # Rendre le script exécutable
# RUN chmod +x /app/sh.sh

# # Exécuter le script sh.sh pour appliquer les migrations
# RUN /app/sh.sh

# Exposer le port
EXPOSE 4000

# Nouvelle commande de démarrage
CMD ["npm", "run", "start:prod"]
