FROM node:8-alpine
WORKDIR /app
ENV PORT 80
ENV DB_HOST db
EXPOSE 80
ADD package*  ./
RUN npm i
ADD . .
CMD npm start