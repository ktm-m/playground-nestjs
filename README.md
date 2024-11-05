# Playground NestJS

## Description

This is a playground to learn how to use NestJS with TypeScript.

## Technologies Stack

- TypeScript
- NestJS
- TypeORM
- PostgreSQL
- Docker

## Prerequisites

- Node.js
- npm
- yarn
- Docker
- Makefile
- TypeScript
- NestJS CLI

## How to install yarn

Run the following command:

```bash
npm install -g yarn
```

## How to install TypeScript

Run the following command:

```bash
npm install -g typescript
```

## How to install NestJS CLI

Run the following command:

```bash
npm install -g @nestjs/cli
```

## Environment Variables

Create a `.env.stage.build` file in the root directory and add the following variables:

```bash
DB_TYPE=postgres
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=admin
DATABASE=playground
JWT_SECRET=secret
JWT_EXPIRES_IN=48h
```

## How to run

Run the following commands:

```bash
make app-up
```

## How to stop

Run the following commands:

```bash
make app-down
```