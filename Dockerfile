FROM node:12-stretch

WORKDIR /app

COPY ./ /app/

RUN npm ci

RUN npm run build
COPY ./build /app/build

COPY /usr/local/bin/serve /usr/local/bin/serve

CMD ['./node_modules/serve/bin/serve.js', '-s', 'build']

EXPOSE 5000
