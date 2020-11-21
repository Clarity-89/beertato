FROM node:12-stretch

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . ./

RUN npm run build

COPY ./bin/*.sh /
RUN chmod +x /*.sh

RUN apt-get update && apt-get install -f -y postgresql-client

EXPOSE 5000

CMD ["/bin/serve_static.sh"]
