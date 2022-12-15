# storefront-api

this is the second project for **Udacity advanced full stack nano-degree**

## 🏁Getting Started <a name = "start"></a>

1. **_Clone the repository_**

```bash
git clone https://github.com/Ahmedmma72/storefront-api.git
```

2. **_Go to the directory of the repository_**

```bash
cd storefront-api
```

3. **install dependencies**

```bash
npm install

```

4. **add `.env` file**

add .env file similar to this

```py
ENV = 'dev'
#ENV = 'test'
SF_POSTGRES_USER= ahmed
SF_POSTGRES_PASSWORD=ahmed
SF_DB_HOST=localhost
SF_DEV_DB="sf_dev"
SF_TEST_DB="sf_test"
SF_DEV_PORT=5001
SF_TEST_PORT=5002
SF_PORT = 3000

PEPPER=your-secret-password
SALT=10

JWT_PRIVATE_KEY=password
```

5. **create the database**

create 2 DBs one for development and other for test

```
 npm run docker:startDev
 npm run docker:startTest
```
6. **run the migrations**

```
npm run migrate:run
```

7. **run the app**

```
npm run start:dev
```

## 🏁Testing <a name = "Testing"></a>

1. **chane the env to test**

```py
ENV = 'test'
```
2. **run the migrations**

```
npm run migrate:reset --env test
npm run migrate:run --env test
```
3. **build the app**

```
npm run build
```
4. **run the tests**

```
npm run jasmine
```


## 🏁Scripts <a name = "Scripts"></a>

- `npm i` install all the packages
- `npm start` to run the app after build
- `npm run build` to compile the ts files
- `npm run jasmine` run the tests
- `npm run start:dev` run app using nodemon
- `npm run migrate:run` up all migrations
- `npm run migrate:reset` reset all migrations
- `npm run docker:startDev` start the dev db
- `npm run docker:startTest` start the test db
- `npm run lint` run eslint
- `npm run format` run prettier
- `npm run fix` fix eslint issues

##
