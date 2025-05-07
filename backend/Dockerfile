# Étape 1 : Construction de l'application
FROM node:21-alpine AS builder

WORKDIR /app

# Copier les fichiers package pour installer les dépendances
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

# Génération des fichiers Prisma
RUN npm install -g prisma
RUN npx prisma generate

RUN npm run build

FROM node:21-alpine

WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY --from=builder /app /app

EXPOSE 5000

CMD ["npm", "start"]