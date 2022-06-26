## NodeJS Application Assessment - Isuru Devinda

Application is developed using NestJS framework and additionally configured swaggerUI package to test APIs and Posgresql client library for the DB access for nestjs.

## Clone Code

#git clone git@github.com:devansdev/course-manager.git
#git checkout master

## Running the app

```bash

#install
$ npm install

Please configure following databse values in .env file:

$POSTGRES_HOST=127.0.0.1
$POSTGRES_PORT=5432
$POSTGRES_USER=postgres
$POSTGRES_PASSWORD=1234
$POSTGRES_DATABASE=node_assignment
$POSTGRES_SYNC=true
$PORT=3001
$MODE=DEV
$RUN_MIGRATIONS=true


# development
$ npm run start
```

After running use this http://localhost:3000/doc to execute APIs

## Test

```bash
# unit tests
$ npm run test
```

## License

Nest is [MIT licensed](LICENSE).
