# Database

PostgreSQL is used as the database for this project.

For local development lets use Docker to run a PostgreSQL container.

## Prerequisites

- Node.js & Yarn [Install Node.js](https://nodejs.org/en/download/)
- Docker & Docker Compose [Install Docker](https://docs.docker.com/get-docker/)
- Prisma ORM [Install Prisma](https://www.prisma.io/docs/getting-started)

## Docker start PostgreSQL

The following command will run a PostgreSQL container: `docker compose up -d`

## Prisma ORM

Setup the DATABASE_URL in the .env file to point to your existing database.

Set `postgresql` provider in the data source block in `schema.prisma` to match your database startup.

Define your schema in `schema.prisma` and run the first migration with `npx prisma migrate dev`

## Prisma Client

Best practice for instantiating Prisma Client with Next.js

<https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices>

## Init Admin user in the database

Since application is running with authentication, we need to create an admin user in the database.

The user/password is `fabio/fabio` when the script `02-sample-admin-user.sql` is executed in the database.

Run it with psql client like `psql -f database/02-sample-admin-user.sql`
