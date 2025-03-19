# NodeJS-MySql-Docker

## Setup

Instalacion de archivo package.json
```console
$ npm init -y
```

Instalacion de Express, Base de datos MySql2 y el entorno .env
```console
$ npm i express mysql2 dotenv
```

Se configura el archivo package.json para que permita ejecutar modulos en el archivo index.js
```txt
 "type": "module",
```

Crear el archivo `.env` con la siguiente configuracion
```txt
MYSQLDB_HOST=mysqldb
MYSQLDB_PASSWORD=12345
MYSQLDB_DATABASE=faztdb

MYSQLDB_LOCAL_PORT=3308
MYSQLDB_DOCKER_PORT=3306

NODE_LOCAL_PORT=4000
NODE_DOCKER_PORT=3000
```

Crear el archivo `docker-compose.yml` con la siguiente configuracion
```txt
version: '3.8'
services:
  mysqldb:
    image: mysql
    env_file: ./.env
    environment:
      - MYSQL_ROOT_PASSWORD=$MYSQLDB_PASSWORD
      - MYSQL_DATABASE=$MYSQLDB_DATABASE
    ports:
      - $MYSQLDB_LOCAL_PORT:$MYSQLDB_DOCKER_PORT

  app:
    build: .
    depends_on:
      - mysqldb
    links:
      - mysqldb
    ports:
      - $NODE_LOCAL_PORT:$NODE_DOCKER_PORT

```

To start the MySql instance and the other services defined in the docker-compose.yml file, run the docker compose up.

```console
$ docker compose up
```

Crear el archivo `Dockerfile` con la siguiente configuracion
```txt
FROM node:20

WORKDIR /myapp
COPY package.json .
RUN npm install

COPY . .
CMD npm start
```

Crear el archivo `.dockerignore` con la siguiente configuracion
```txt
node_modules
```

Reconstruye la imagen docker con el siguiente comando.

```console
$ docker compose up --build
```

Run the App:

```console
$ npm start
```

Visit [http://localhost:4000](http://localhost:4000) in the browser.
