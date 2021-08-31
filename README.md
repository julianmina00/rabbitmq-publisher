# This project aims to test RabbitMQ by sendind messages [D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[D[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[D[g[4~[C[C[C[C[C[C[C[C[C[C[C[

## Table of Contents
1. [Description](#description)
2. [Project Structure](#project-structure)
3. [Project Configuration](#project-configuration)
    1. [Environment variables](#environment-variables)
    2. [Application Properties](#application-properties)
    3. [Config folder](#config-folder)
4. [Project Execution](#project-execution)
    1. [Installation](#installation)
    2. [Running the app](#running-the-app)
    3. [Test](#test)
    4. [Dockerize](#dockerize)
5. [Swagger](#swagger)

## Description
This project aims to test RabbitMQ by sending messages

## Project Structure
The structure of this project consists of three parts.
- src folder: Source folder. This one contains the implementation of all features of the project as well as the `main.ts` that is the execution starting point. This folder must also include the unit tests. According to the best practices for NestJS, the unit tests will be added in the same folder that contains the module, service, and/or controller of a feature. The internal structure of the *src folder* is based on the [structure of the NestJS modules](https://docs.nestjs.com/modules).
- test folder: This folder is meant to hold the e2e tests. The implementation of these tests must follow the principles of the [NestJS testing](https://docs.nestjs.com/fundamentals/testing#end-to-end-testing) definition.
- project configuration files (in ./): At the root of the project, some files were added to provide the configuration needed for some additional tools and services needed to get the microservices tested, built, and deployed.

## Project Configuration
The strategy to provide the configuration parameters of values to the application is based on the [NestJS Configuration](https://docs.nestjs.com/techniques/configuration) definition.

### Environment variables
Environment variables may be added to the application by creating the `.env` file at the root folder. This feature is meant to be used in the local environment of the developer. Since the environment variables are not the same for all environments, the `.env` file was excluded from Git and needs to be created manually in the local environment.

This is an example of the `.env` file
```properties
PORT=12345
DATABASE_USER=my-user
DATABASE_PASSWORD=my-user-password
```

For development, testing, and production environments the environment variables must be provided with their proper deployment scripts or procedures.

### Application Properties
To avoid accessing the `process.env` variable, NestJS provides the [ConfigService](https://docs.nestjs.com/techniques/configuration#using-the-configservice). This service allows obtaining any configured variable by calling the get method and providing the variable name.

Example in [main.ts](.\src\main.ts):
```javascript
const configService = app.get(ConfigService);
const port = configService.get('port');
```

### Config folder
The src/config folder is the folder where all code related to configuration must be added. Initially, this folder consists of three files:
- **configuration.ts**: this is for the configurations related to the application or main.ts
- **cors.ts**: this is for configurations related to CORS
- **swagger.ts**: this is for configurations related to Swagger

## Project Execution
As with any NPM based project, it supports commands like install, start, and test. Additionally, the dockerize commands are also supported in this project due to the Dockerfile. These commands may be executed as follow:

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Dockerize
```bash
docker build -t ${REPOSITORY_URL}/${IMAGE_NAME}:${IMAGE_VERSION} .
docker run --name=${APP_NAME} ${REPOSITORY_URL}/${IMAGE_NAME}:${IMAGE_VERSION}
```

## Swagger
The implementation of Swagger (OpenAPI) is based on the [OpenAPI module of NestJS](https://docs.nestjs.com/openapi/introduction). The official documentation may be accessed for further questions.

The Swagger documentation of this project is available on `${HOSTNAME}:${PORT}/api`.
