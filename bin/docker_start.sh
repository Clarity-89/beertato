#!/bin/sh

set -ex

# Wait for the database container
# See: https://docs.docker.com/compose/startup-order/
export PGHOST=${DB_HOST:-db}
export PGPORT=${DB_PORT:-5432}

until pg_isready; do
  >&2 echo "Waiting for database connection..."
  sleep 1
done

>&2 echo "Database is up."

npm i -g knex knex-migrate
cd ./server
# Apply database migrations
>&2 echo "Apply database migrations"
knex-migrate up

cd ..
# Start api
>&2 echo "Starting server"
npm run server
serve -s build

