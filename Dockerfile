FROM node:20-bullseye

WORKDIR /apollo-server-keanu

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm","start"]