# Playground Fastify

## Description

This is a playground to learn how to use Fastify framework basics.

## Technologies Stack

- TypeScript
- Fastify
- MySQL
- Docker

## Prerequisites

- Node.js
- npm
- Docker
- Makefile
- TypeScript

## How to install NestJS

Run the following command:

```bash
npm install -g @nestjs/cli
```

## Environment Variables

Create a `.env.build` file in the root directory and add the following variables:

```bash
PORT=3000
HOST=0.0.0.0

DB_CLIENT=mysql2
DB_HOST=mysql
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=admin
DATABASE=playground
```

## How to run

Run the following commands:

```bash
make app-up
```
