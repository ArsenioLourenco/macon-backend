FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 6800

CMD ["npm", "dev"]