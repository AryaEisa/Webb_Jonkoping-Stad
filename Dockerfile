FROM node:20

WORKDIR /app

COPY . .

RUN npm install


# Any additional PostgreSQL configuration or initialization can be done here

EXPOSE 3000

CMD ["node", "index.js"]
