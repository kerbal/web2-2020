# web2-2020
Web 2 course project

## UI wireframe
https://balsamiq.cloud/s4s3ttq/p7pntcn 

## PRD
https://docs.google.com/document/d/1QUdW2dCNp6_FV-QdDfIoGfpqMgQo-aKnlwhgF_9SJAE/edit?usp=sharing

## Installation
```bash
$ yarn global install lerna
$ lerna bootstrap
```

### Front-end
```bash
$ cd packages/client (packages/api-server)
$ yarn dev
```

### Back-end
Config `.env` file

```bash
$ cd packages/api-server
$ sequelize db:create
$ sequelize db:migrate
$ sequelize db:seed:all
$ yarn dev
```