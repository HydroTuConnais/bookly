# Étape 1 : Conteneur final (production)
FROM node:21-alpine

WORKDIR /app

# Installer le client PostgreSQL si nécessaire dans le conteneur
RUN apk add --no-cache postgresql-client

# Copier les fichiers nécessaires depuis l'étape de build (si le build a déjà été effectué)
COPY ./dist ./dist
COPY ./prisma ./prisma
COPY ./node_modules ./node_modules
COPY ./package*.json ./

RUN chmod +x ./start.sh

# Exposer le port de l'application
EXPOSE 5000

# Lancer l'application
CMD ["npm", "start"]
