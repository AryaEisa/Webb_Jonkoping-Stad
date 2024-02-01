FROM node:17-alpine

WORKDIR /app

COPY . .

RUN npm install

FROM postgres:13.4

WORKDIR /app

COPY . .

# Any additional PostgreSQL configuration or initialization can be done here

EXPOSE 3000
EXPOSE 5432

CMD ["node", "app.js"]
