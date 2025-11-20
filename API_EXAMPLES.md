# API Examples

Esta guía proporciona ejemplos de uso de la API de Alident Backend.

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### Health Check

Verifica que la API esté funcionando correctamente.

**Request:**
```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-20T15:50:52.240Z",
  "environment": "development"
}
```

---

### Welcome Message

Obtiene un mensaje de bienvenida de la API.

**Request:**
```bash
curl http://localhost:3000/api
```

**Response:**
```
Welcome to Alident Backend API!
```

---

## Users API

### Crear un Usuario

**Endpoint:** `POST /api/users`

**Request:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "name": "Juan Pérez"
  }'
```

**Response:**
```json
{
  "id": 1,
  "email": "usuario@ejemplo.com",
  "name": "Juan Pérez",
  "createdAt": "2025-11-20T15:54:24.268Z",
  "updatedAt": "2025-11-20T15:54:24.268Z"
}
```

---

### Obtener Todos los Usuarios

**Endpoint:** `GET /api/users`

**Request:**
```bash
curl http://localhost:3000/api/users
```

**Response:**
```json
[
  {
    "id": 1,
    "email": "usuario@ejemplo.com",
    "name": "Juan Pérez",
    "createdAt": "2025-11-20T15:54:24.268Z",
    "updatedAt": "2025-11-20T15:54:24.268Z"
  },
  {
    "id": 2,
    "email": "otro@ejemplo.com",
    "name": "María García",
    "createdAt": "2025-11-20T15:55:10.123Z",
    "updatedAt": "2025-11-20T15:55:10.123Z"
  }
]
```

---

### Obtener un Usuario por ID

**Endpoint:** `GET /api/users/:id`

**Request:**
```bash
curl http://localhost:3000/api/users/1
```

**Response:**
```json
{
  "id": 1,
  "email": "usuario@ejemplo.com",
  "name": "Juan Pérez",
  "createdAt": "2025-11-20T15:54:24.268Z",
  "updatedAt": "2025-11-20T15:54:24.268Z"
}
```

---

### Actualizar un Usuario

**Endpoint:** `PATCH /api/users/:id`

**Request:**
```bash
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos Pérez"
  }'
```

**Response:**
```json
{
  "id": 1,
  "email": "usuario@ejemplo.com",
  "name": "Juan Carlos Pérez",
  "createdAt": "2025-11-20T15:54:24.268Z",
  "updatedAt": "2025-11-20T16:00:15.456Z"
}
```

---

### Eliminar un Usuario

**Endpoint:** `DELETE /api/users/:id`

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

**Response:**
```json
{
  "id": 1,
  "email": "usuario@ejemplo.com",
  "name": "Juan Pérez",
  "createdAt": "2025-11-20T15:54:24.268Z",
  "updatedAt": "2025-11-20T15:54:24.268Z"
}
```

---

## Validación de Datos

La API incluye validación automática de datos. Por ejemplo, si intentas crear un usuario sin un email válido:

**Request:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "email-invalido",
    "name": "Usuario Test"
  }'
```

**Response:**
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email"
  ],
  "error": "Bad Request"
}
```

---

## Manejo de Errores

### Usuario No Encontrado

**Request:**
```bash
curl http://localhost:3000/api/users/999
```

**Response:**
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

### Email Duplicado

Si intentas crear un usuario con un email que ya existe:

**Request:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "name": "Otro Usuario"
  }'
```

**Response:**
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## Uso con Postman

Puedes importar estas peticiones en Postman creando una nueva colección y agregando las siguientes requests:

1. **Health Check** - GET `http://localhost:3000/api/health`
2. **Create User** - POST `http://localhost:3000/api/users`
3. **Get All Users** - GET `http://localhost:3000/api/users`
4. **Get User by ID** - GET `http://localhost:3000/api/users/:id`
5. **Update User** - PATCH `http://localhost:3000/api/users/:id`
6. **Delete User** - DELETE `http://localhost:3000/api/users/:id`

---

## Testing con JavaScript/TypeScript

### Usando Axios

```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Crear un usuario
async function createUser() {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, {
      email: 'test@example.com',
      name: 'Test User',
    });
    console.log('Usuario creado:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
}

// Obtener todos los usuarios
async function getUsers() {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    console.log('Usuarios:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
}
```

### Usando Fetch

```javascript
// Crear un usuario
async function createUser() {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test User',
      }),
    });
    const data = await response.json();
    console.log('Usuario creado:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## Próximos Pasos

- Agregar autenticación JWT
- Implementar paginación para listados
- Agregar filtros y búsqueda
- Implementar más módulos según las necesidades de Alident
- Agregar documentación con Swagger/OpenAPI
