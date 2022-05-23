FROM node:16.13.1 AS build

WORKDIR /app

COPY . /app/

RUN npm install --silent
RUN npm install react-scripts -g --silent
RUN npm run build

FROM nginx:1.20.2
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
