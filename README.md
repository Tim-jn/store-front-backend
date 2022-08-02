# StoreFront Backend

## Description

Your job is to architect the database of an online store, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.

The requirements have been collected into requirements document.

## Usage

* ### Setup postgreSQL database :

  * Connect as postgres user : `psql -U postgres;`

  * Create a database : `CREATE DATABASE storefront;` and a second one for testing `CREATE DATABASE storefront_test;`

  * Connect to the database : `\c storefront;`

* ### Step 1 : 

Clone this repository.

* ### Step 2 : 

Install the dependencies with `npm run install` or `yarn install`.

* ### Step 3 : 

Create .env file, containing all the required parameters to create connection to postgresql database
If the ENV variable is equal to test, the storefront_test database will be used instead of the storefront database. The file should look like this :

```POSTGRES_HOST = localhost
POSTGRES_DB = storefront
POSTGRES_TEST_DB = storefront_test
POSTGRES_USER = postgres
POSTGRES_PASSWORD = password
POSTGRES_PORT = 5432
BCRYPT_PASSWORD = password
SALT_ROUND = 10
TOKEN_SECRET = secret
ENV = dev
```

* ### Step 4 : 

    * Run the server : `npm run watch` or `yarn watch`
    * The database will run on port 5432. You can access the server on https://localhost:3000.

## Endpoints

#### Users

```
Index route : '/users' [GET] [token required]
```
```
Show route : '/users/:id' [GET] [token required]
```
```
Create route : '/users' [POST] [token required]
```
```
Delete route : '/users/:id' [DELETE] [token required]
```

#### Products

```
Index route : '/products' [GET]
```
```
Show route : '/products/:id' [GET]
```
```
Create route : '/products' [POST] [token required]
```
```
Delete route : '/products/:id' [DELETE] [token required]
```

#### Orders

```
Current Order by user (args: user id) : '/orders/:id' [GET] [token required]
```

## Commands

* Start server : `npm run start` or `yarn start`
* Run tests : `npm run test` or `yarn test`
* Watch server : `npm run watch` or `yarn watch`



