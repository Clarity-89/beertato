FROM node:12-stretch

WORKDIR /app

COPY ./ /app/

RUN npm ci

RUN npm run build
COPY ./build /app/build

COPY ./bin/docker_start.sh /start.sh
RUN apt-get update && apt-get install -f -y postgresql-client
RUN chmod +x /start.sh

CMD ["/start.sh"]

EXPOSE 5000
