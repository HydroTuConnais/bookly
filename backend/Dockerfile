FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

RUN npm install --save-dev ts-node typescript

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app /app

RUN npm install --only=production
RUN npm install ts-node typescript --save
RUN npm install -g ts-node


EXPOSE 4000

CMD ["ts-node", "app.ts"]