# Development build
FROM node as dev
EXPOSE 4200
WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY ./ /app/

RUN npm run buildProd

# Production build
FROM nginx:alpine as prod
COPY --from=dev /app/dist/out/ /usr/share/nginx/html/

