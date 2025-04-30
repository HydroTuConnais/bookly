FROM node:21-alpine

WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY package*.json ./
RUN npm install

COPY . .

COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN npm install -g prisma
RUN npx prisma generate

EXPOSE 5000

CMD ["/start.sh"]