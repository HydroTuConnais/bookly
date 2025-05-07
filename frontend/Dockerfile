FROM node:21 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN sed -i '21,24d' node_modules/@blocknote/react/types/src/schema/ReactBlockSpec.d.ts

# Construire le projet
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

 COPY certs/haproxy-wildcard.crt /etc/letsencrypt/live/maant.dipsw-ccicampus.dev/haproxy-wildcard.crt
 COPY certs/haproxy-wildcard.key /etc/letsencrypt/live/maant.dipsw-ccicampus.dev/haproxy-wildcard.key

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
