FROM node:20-slim

WORKDIR /code/

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 3000

CMD ["node", "-r", "dotenv/config", "build"]
