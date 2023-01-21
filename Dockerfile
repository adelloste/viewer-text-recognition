# Stage 1: build the frontend
FROM node:14 as build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY patches ./patches

RUN yarn

COPY . .

RUN yarn build

# Stage 2: build an nginx container
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf