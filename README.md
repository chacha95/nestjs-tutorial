# Nestjs-Tutorial

## Local Environment

### Installation dependecies

```bash
$ yarn
```

### setup env and db

```bash
# set env
$ export $(cat .env | xargs) 2>/dev/null
```

### setup infra

```bash
$ docker-compose up -d
```

### db migration

```bash
# create migration file
yarn prisma migrate dev --schema ./prisma/schema.prisma
# migration
$ yarn prisma migrate dev --schema ./prisma/schema.prisma
```

### Running the app

```bash
# development
$ yarn run start:local

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
