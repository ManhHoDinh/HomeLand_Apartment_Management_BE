FROM node:18

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . . 

EXPOSE 3000

RUN npm run build

RUN npm install -g bun  

CMD ["bun", "run", "dist/main.js"]