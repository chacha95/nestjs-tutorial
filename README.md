# Nestjs-Tutorial

## Local Environment

### Installation dependecies

```bash
$ yarn
```

### Development Tools

db migration

```bash
# reset schema
$ yarn db:reset

# create migration
$ yarn db:makeMigration "MIGRATION MESSAGE"

# apply migration
$ yarn db:migrate
```

### setup infra
```bash
$ docker-compose up -d
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
