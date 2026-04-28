# API REST Node.js / Node.js REST API

## Español

API REST desarrollada como práctica académica para aplicar conceptos de desarrollo backend con Node.js, Express, Sequelize y MariaDB. El proyecto implementa una estructura básica de servidor, conexión a base de datos, modelos, controladores, rutas, autenticación con JWT y protección de endpoints.

El sistema permite gestionar información relacionada con personas, usuarios y ciudades mediante operaciones CRUD, además de incluir inicio de sesión y validación de token para proteger las rutas de usuario.

---

## Objetivo del proyecto

El objetivo principal de esta práctica fue construir una API REST funcional usando JavaScript en el entorno Node.js, aplicando una arquitectura organizada por capas:

- configuración del servidor;
- conexión a base de datos;
- definición de modelos con Sequelize;
- separación de rutas y controladores;
- operaciones CRUD;
- autenticación con JSON Web Tokens;
- cifrado de contraseñas con bcrypt;
- uso de middlewares para CORS, JSON y validación de token.

---

## Tecnologías utilizadas

- Node.js
- Express.js
- Sequelize
- MariaDB
- JavaScript
- JSON Web Token (JWT)
- bcrypt
- dotenv
- cors
- nodemon

---

## Entidades principales

### Persona

Representa los datos personales básicos de una persona.

Campos principales:

- `id_persona`
- `nombres`
- `apellidos`
- `fecha_nacimiento`

### Usuario

Representa un usuario asociado a una persona registrada.

Campos principales:

- `id_usuario`
- `contraseña`
- `email`
- `numero_telefono`
- `minibiografia`
- `id_persona`

### Ciudad

Representa ciudades registradas en la base de datos.

Campos principales:

- `id_ciudad`
- `nombre`

---

## Endpoints principales

### Personas

Ruta base:

```http
/api/persona
```

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/persona` | Lista todas las personas |
| GET | `/api/persona/:id` | Consulta una persona por ID |
| GET | `/api/persona/como/:termino` | Busca personas por nombre o apellido |
| POST | `/api/persona` | Crea una nueva persona |
| PUT | `/api/persona/:id` | Actualiza una persona existente |
| DELETE | `/api/persona/:id` | Elimina una persona |

### Usuarios

Ruta base:

```http
/api/usuario
```

| Método | Endpoint | Descripción | Protección |
|---|---|---|---|
| POST | `/api/usuario/login` | Inicia sesión y genera un token JWT | No requiere token |
| GET | `/api/usuario` | Lista todos los usuarios | Requiere token |
| GET | `/api/usuario/:id` | Consulta un usuario por ID | Requiere token |
| GET | `/api/usuario/verificar/:id` | Verifica la contraseña de un usuario | Requiere token |
| GET | `/api/usuario/como/:termino` | Busca usuarios por email | Requiere token |
| POST | `/api/usuario` | Crea un nuevo usuario | Requiere token |
| PUT | `/api/usuario/:id` | Actualiza un usuario existente | Requiere token |
| DELETE | `/api/usuario/:id` | Elimina un usuario | Requiere token |

Para acceder a las rutas protegidas se debe enviar el token en el header:

```http
x-token: <token_jwt>
```

### Ciudades

Ruta base:

```http
/api/ciudad
```

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/ciudad` | Lista todas las ciudades |
| GET | `/api/ciudad/:id` | Consulta una ciudad por ID |
| GET | `/api/ciudad/como/:termino` | Busca ciudades por nombre |
| POST | `/api/ciudad` | Crea una nueva ciudad |
| PUT | `/api/ciudad/:id` | Actualiza una ciudad existente |
| DELETE | `/api/ciudad/:id` | Elimina una ciudad |

---

## Estructura del proyecto

```text
API-REST-NODE/
├── app.js
├── controllers/
│   ├── ciudad.js
│   ├── persona.js
│   └── usuario.js
├── database/
│   └── MariaDbConnection.js
├── helpers/
│   └── generar-jwt.js
├── middlewares/
│   └── validar-jwt.js
├── models/
│   ├── ciudad.js
│   ├── persona.js
│   ├── server.js
│   └── usuario.js
├── routes/
│   ├── ciudad.js
│   ├── persona.js
│   └── usuario.js
├── package.json
└── .gitignore
```

---

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Sxl07/API-REST-NODE.git
cd API-REST-NODE
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
SECRETKEY=tu_clave_secreta_para_jwt
```

### 4. Configurar la base de datos

El proyecto usa MariaDB mediante Sequelize. La conexión actual se encuentra en:

```text
database/MariaDbConnection.js
```

Configuración usada en el proyecto:

```js
database: 'mydb'
user: 'root'
password: ''
host: 'localhost'
port: '3306'
dialect: 'mariadb'
```

Antes de ejecutar la API, asegúrate de tener MariaDB activo y una base de datos llamada `mydb` con las tablas necesarias: `persona`, `usuario` y `ciudad`.

### 5. Ejecutar el servidor

Modo desarrollo con nodemon:

```bash
npm start
```

Ejecución normal con Node.js:

```bash
npm run iniciar
```

Si todo está configurado correctamente, la consola mostrará un mensaje similar a:

```text
Connection OK a MySQL.
Servidor corriendo en puerto 3000
```

---

## Ejemplos de uso

### Crear una persona

```http
POST /api/persona
Content-Type: application/json
```

```json
{
  "nombres": "Sebastián",
  "apellidos": "López",
  "fecha_nacimiento": "2000-01-01"
}
```

### Crear una ciudad

```http
POST /api/ciudad
Content-Type: application/json
```

```json
{
  "nombre": "Cali"
}
```

### Login de usuario

```http
POST /api/usuario/login
Content-Type: application/json
```

```json
{
  "email": "usuario@email.com",
  "contraseña": "123456"
}
```

Respuesta esperada:

```json
{
  "ok": true,
  "msj": "Login OK",
  "token": "token_jwt_generado"
}
```

---

## Estado actual del proyecto

Actualmente el proyecto cuenta con:

- servidor Express configurado;
- conexión a MariaDB con Sequelize;
- modelos para persona, usuario y ciudad;
- rutas separadas por entidad;
- controladores para operaciones CRUD;
- autenticación mediante JWT;
- cifrado de contraseñas con bcrypt;
- middleware para validar tokens en rutas protegidas.

---

## Notas de aprendizaje

Este proyecto fue desarrollado con fines académicos para practicar la construcción de APIs REST. Puede seguir evolucionando con mejoras como:

- mover la configuración de base de datos a variables de entorno;
- agregar validaciones de datos de entrada;
- documentar la API con Swagger/OpenAPI;
- agregar pruebas automatizadas;
- mejorar el manejo global de errores;
- implementar migraciones o scripts SQL para crear las tablas.

---

# English

REST API developed as an academic practice project to apply backend development concepts with Node.js, Express, Sequelize and MariaDB. The project implements a basic server structure, database connection, models, controllers, routes, JWT authentication and protected endpoints.

The system manages people, users and cities through CRUD operations. It also includes login functionality and token validation to protect user-related routes.

---

## Project goal

The main goal of this practice project was to build a functional REST API using JavaScript in the Node.js environment, applying a layered structure:

- server configuration;
- database connection;
- Sequelize model definition;
- route and controller separation;
- CRUD operations;
- JSON Web Token authentication;
- password hashing with bcrypt;
- middleware usage for CORS, JSON parsing and token validation.

---

## Technologies used

- Node.js
- Express.js
- Sequelize
- MariaDB
- JavaScript
- JSON Web Token (JWT)
- bcrypt
- dotenv
- cors
- nodemon

---

## Main entities

### Person

Stores basic personal information.

Main fields:

- `id_persona`
- `nombres`
- `apellidos`
- `fecha_nacimiento`

### User

Represents a user associated with a registered person.

Main fields:

- `id_usuario`
- `contraseña`
- `email`
- `numero_telefono`
- `minibiografia`
- `id_persona`

### City

Stores city records.

Main fields:

- `id_ciudad`
- `nombre`

---

## Main endpoints

### People

Base route:

```http
/api/persona
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/persona` | Lists all people |
| GET | `/api/persona/:id` | Gets one person by ID |
| GET | `/api/persona/como/:termino` | Searches people by first name or last name |
| POST | `/api/persona` | Creates a new person |
| PUT | `/api/persona/:id` | Updates an existing person |
| DELETE | `/api/persona/:id` | Deletes a person |

### Users

Base route:

```http
/api/usuario
```

| Method | Endpoint | Description | Protection |
|---|---|---|---|
| POST | `/api/usuario/login` | Logs in and generates a JWT | No token required |
| GET | `/api/usuario` | Lists all users | Token required |
| GET | `/api/usuario/:id` | Gets one user by ID | Token required |
| GET | `/api/usuario/verificar/:id` | Verifies a user password | Token required |
| GET | `/api/usuario/como/:termino` | Searches users by email | Token required |
| POST | `/api/usuario` | Creates a new user | Token required |
| PUT | `/api/usuario/:id` | Updates an existing user | Token required |
| DELETE | `/api/usuario/:id` | Deletes a user | Token required |

Protected routes require the token in the following header:

```http
x-token: <jwt_token>
```

### Cities

Base route:

```http
/api/ciudad
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/ciudad` | Lists all cities |
| GET | `/api/ciudad/:id` | Gets one city by ID |
| GET | `/api/ciudad/como/:termino` | Searches cities by name |
| POST | `/api/ciudad` | Creates a new city |
| PUT | `/api/ciudad/:id` | Updates an existing city |
| DELETE | `/api/ciudad/:id` | Deletes a city |

---

## Project structure

```text
API-REST-NODE/
├── app.js
├── controllers/
│   ├── ciudad.js
│   ├── persona.js
│   └── usuario.js
├── database/
│   └── MariaDbConnection.js
├── helpers/
│   └── generar-jwt.js
├── middlewares/
│   └── validar-jwt.js
├── models/
│   ├── ciudad.js
│   ├── persona.js
│   ├── server.js
│   └── usuario.js
├── routes/
│   ├── ciudad.js
│   ├── persona.js
│   └── usuario.js
├── package.json
└── .gitignore
```

---

## Local installation and execution

### 1. Clone the repository

```bash
git clone https://github.com/Sxl07/API-REST-NODE.git
cd API-REST-NODE
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root with the following variables:

```env
PORT=3000
SECRETKEY=your_jwt_secret_key
```

### 4. Configure the database

The project uses MariaDB through Sequelize. The current connection file is located at:

```text
database/MariaDbConnection.js
```

Current configuration:

```js
database: 'mydb'
user: 'root'
password: ''
host: 'localhost'
port: '3306'
dialect: 'mariadb'
```

Before running the API, make sure MariaDB is running and that a database named `mydb` exists with the required tables: `persona`, `usuario` and `ciudad`.

### 5. Run the server

Development mode with nodemon:

```bash
npm start
```

Regular execution with Node.js:

```bash
npm run iniciar
```

If everything is configured correctly, the console should display something similar to:

```text
Connection OK a MySQL.
Servidor corriendo en puerto 3000
```

---

## Usage examples

### Create a person

```http
POST /api/persona
Content-Type: application/json
```

```json
{
  "nombres": "Sebastián",
  "apellidos": "López",
  "fecha_nacimiento": "2000-01-01"
}
```

### Create a city

```http
POST /api/ciudad
Content-Type: application/json
```

```json
{
  "nombre": "Cali"
}
```

### User login

```http
POST /api/usuario/login
Content-Type: application/json
```

```json
{
  "email": "usuario@email.com",
  "contraseña": "123456"
}
```

Expected response:

```json
{
  "ok": true,
  "msj": "Login OK",
  "token": "generated_jwt_token"
}
```

---

## Current project status

The project currently includes:

- configured Express server;
- MariaDB connection with Sequelize;
- models for person, user and city;
- routes separated by entity;
- controllers for CRUD operations;
- JWT authentication;
- password hashing with bcrypt;
- middleware for token validation in protected routes.

---

## Learning notes

This project was developed for academic purposes to practice REST API development. It can continue evolving with improvements such as:

- moving database configuration to environment variables;
- adding input validation;
- documenting the API with Swagger/OpenAPI;
- adding automated tests;
- improving global error handling;
- adding migrations or SQL scripts to create the required tables.
