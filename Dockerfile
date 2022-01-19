FROM node:13.12.0-alpine

ARG ENV_FILE

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci --production
RUN npm install -g serve

COPY . /app
COPY $ENV_FILE /app/

RUN npm run build

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]
