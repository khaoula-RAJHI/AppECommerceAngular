# Build Stage
FROM node:14.17.0-alpine AS build
WORKDIR /app
COPY package*.json /app/
RUN npm install 
COPY . .
RUN npm run build



# Run Stage
FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
