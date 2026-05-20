FROM node:20 AS build
WORKDIR /app
ARG VITE_API_URL=http://localhost:8080
ENV VITE_API_URL=$VITE_API_URL
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
