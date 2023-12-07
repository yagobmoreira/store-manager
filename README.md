# Store Manager Project 🏪

## Description

This repository contains a project focused on building a store management application using Node.js with Express to create a REST API. The application has been developed following architectural patterns, employing a layered architecture (model-service-controller).

### Technologies

![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![nodeJs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![expressJs](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![mySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white)
![chai](https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white)

### Packages
  - camelize (1.0.1)
  - express (4.18.2)
  - joi (17.6.0)
  - mysql2 (2.3.0)
  - docker compose (2.21.0)

### What I learned
  - Structuring an application into layers (Model, Service, Controller).
  - Applying the REST architectural style.
  - Connecting the application to a MySQL database.
  - Developing tests for the application.

## Developing

To run the development application:

1. Clone:
```
git clone git@github.com:yagobmoreira/store-manager.git
cd store_manager
```
2. Containers:
```bash
docker compose up -d --build
```
3. API logs:
```bash
docker logs -n 10 -f store_manager
```
4. Tests:
- Container terminal
```bash
docker exec -it store_manager bash
```
```bash
npm run test:mocha
```
- Locally
```bash
cd backend
npm run test:mocha
```

- Testing API

Import the *thunder-collection_Store_Manager.json* file into your preferred client.

## Contributions

[Yago Moreira](https://www.linkedin.com/in/yagobmoreira/) - /src /tests

[Trybe](https://www.betrybe.com/) - Everything else




