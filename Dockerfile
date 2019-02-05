FROM nginx:alpine
EXPOSE 80 443
COPY web-src /usr/share/nginx/html