FROM node:21-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm install -g prisma
RUN npx prisma generate
RUN npm run build

# ==========================
FROM node:21-alpine

WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

RUN npm ci --only=production

EXPOSE 5000
CMD ["npm", "start"]
