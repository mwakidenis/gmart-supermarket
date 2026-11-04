FROM node:latest
WORKDIR /app/server
COPY . .
RUN npm install -g nodemon
RUN npm install
EXPOSE 3000
CMD ["nodemon", "app.js"]