FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build   # собираем prod билд

# dist/ будет использоваться Nginx через volume
