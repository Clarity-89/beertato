FROM node:12-stretch

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . ./

RUN npm run build
COPY ./build ./build

EXPOSE 5000

CMD ["npm", "run", "serve"]

