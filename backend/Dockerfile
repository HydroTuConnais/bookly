# Étape 1 : Construction de l'application (builder)
FROM node:21-alpine AS builder

WORKDIR /app

# Copier les fichiers package pour installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le code source
COPY . .

# Installer Prisma et générer les fichiers Prisma
RUN npm install -g prisma
RUN npx prisma generate

# Construire l'application
RUN npm run build

# ==========================
# Étape 2 : Conteneur final (production)
FROM node:21-alpine

WORKDIR /app

# Installer le client PostgreSQL
RUN apk add --no-cache postgresql-client

# Copier les fichiers nécessaires depuis l'étape de construction
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Installer les dépendances en mode production
RUN npm ci --only=production

EXPOSE 5000

CMD ["npm", "start"]
