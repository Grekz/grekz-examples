# Spring Boot + Java: CRUD example

## Prerequisite

Have a PostgreSQL database running somewhere. In this example I'm running the database in the "grekz-examples" repository, in the folder [postgres-db-docker-compose](https://github.com/Grekz/grekz-examples/tree/main/postgres-db-docker-compose). For running that you'll need [Docker](https://www.docker.com/).

## Run the project

You can quickly run the project by pasting the following command to your terminal:

```bash
./gradlew bootRun
```

In case you are having some problems, you can try running these commands:

```bash
./gradlew clean
./gradlew build
```

## GET Request

You can check the GET method by copying this to your terminal:

```bash
curl -X GET --location "http://localhost:8080/api/v1/user"
```

## POST Request

You can check the POST method by copying this to your terminal:

```bash
curl -X POST --location "http://localhost:8080/api/v1/user" \
    -H "Content-Type: application/json" \
    -d '{
          "name": "grekz",
          "email": "fake-email@my-fake-emails.com"
        }'
```
