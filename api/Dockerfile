FROM node:12-stretch

WORKDIR /app

COPY ./api /app/api
COPY ./*.json /app/
RUN npm ci


COPY ./bin/docker_start.sh /start.sh
RUN apt-get update && apt-get install -f -y postgresql-client
RUN chmod +x /start.sh

CMD ["/start.sh"]

EXPOSE 3005
