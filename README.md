# Alident Backend

Backend para sistema Alident construido con NestJS, Prisma ORM y SQLite.

## 🚀 Características

- ✅ **NestJS**: Framework progresivo de Node.js para construir aplicaciones server-side eficientes y escalables
- ✅ **Prisma ORM**: ORM moderno de próxima generación para Node.js y TypeScript
- ✅ **SQLite**: Base de datos ligera y fácil de configurar (configurable para cambiar a PostgreSQL, MySQL, MongoDB, etc.)
- ✅ **TypeScript**: Tipado estático para mayor seguridad y productividad
- ✅ **Variables de entorno**: Configuración flexible mediante archivos .env
- ✅ **Validación**: Validación automática de datos con class-validator
- ✅ **CORS**: Configuración de CORS lista para producción

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/JeremyE7/Alident_backend.git
cd Alident_backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Edita el archivo `.env` según tus necesidades.

4. Generar el cliente de Prisma:
```bash
npm run prisma:generate
```

5. Ejecutar las migraciones de la base de datos:
```bash
npm run prisma:migrate
```

## 🚦 Uso

### Desarrollo

Iniciar el servidor en modo desarrollo (con hot-reload):
```bash
npm run start:dev
```

La aplicación estará disponible en `http://localhost:3000/api`

### Producción

Compilar el proyecto:
```bash
npm run build
```

Iniciar el servidor en modo producción:
```bash
npm run start:prod
```

### Scripts Disponibles

```bash
# Desarrollo
npm run start:dev         # Iniciar en modo desarrollo con watch
npm run start:debug       # Iniciar en modo debug

# Build y Producción
npm run build             # Compilar el proyecto
npm run start:prod        # Iniciar en modo producción

# Prisma
npm run prisma:generate   # Generar cliente de Prisma
npm run prisma:migrate    # Ejecutar migraciones
npm run prisma:studio     # Abrir Prisma Studio (GUI para la base de datos)
npm run db:push           # Sincronizar esquema sin crear migraciones

# Calidad de Código
npm run lint              # Ejecutar ESLint
npm run format            # Formatear código con Prettier

# Testing
npm run test              # Ejecutar tests
npm run test:watch        # Ejecutar tests en modo watch
npm run test:cov          # Ejecutar tests con coverage
```

## 🗄️ Configuración de Base de Datos

El proyecto está configurado para usar **SQLite** por defecto, pero puede cambiar fácilmente a otras bases de datos.

### SQLite (Configuración por defecto)

```env
DATABASE_URL="file:./dev.db"
```

### PostgreSQL

1. Actualizar `.env`:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/alident?schema=public"
```

2. Actualizar `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
}
```

3. Actualizar `src/prisma/prisma.service.ts` para usar el adaptador de PostgreSQL:
```bash
npm install @prisma/adapter-pg pg
```

4. Ejecutar migraciones:
```bash
npm run prisma:migrate
```

### MySQL

1. Actualizar `.env`:
```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/alident"
```

2. Actualizar `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "mysql"
}
```

3. Actualizar el adaptador en `src/prisma/prisma.service.ts`

4. Ejecutar migraciones:
```bash
npm run prisma:migrate
```

### MongoDB

1. Actualizar `.env`:
```env
DATABASE_URL="mongodb://localhost:27017/alident"
```

2. Actualizar `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "mongodb"
}
```

3. Actualizar el adaptador en `src/prisma/prisma.service.ts`

4. Ejecutar sincronización:
```bash
npm run db:push
```

## 📁 Estructura del Proyecto

```
alident_backend/
├── prisma/                 # Esquema y migraciones de Prisma
│   ├── schema.prisma      # Definición del modelo de datos
│   └── migrations/        # Migraciones de base de datos
├── src/
│   ├── prisma/            # Módulo de Prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── app.controller.ts  # Controlador principal
│   ├── app.module.ts      # Módulo raíz de la aplicación
│   ├── app.service.ts     # Servicio principal
│   └── main.ts            # Punto de entrada de la aplicación
├── .env                   # Variables de entorno
├── .env.example           # Ejemplo de variables de entorno
├── nest-cli.json          # Configuración de NestJS CLI
├── tsconfig.json          # Configuración de TypeScript
└── package.json           # Dependencias y scripts
```

## 🔐 Variables de Entorno

El proyecto utiliza las siguientes variables de entorno:

```env
# Configuración de Base de Datos
DATABASE_URL=file:./dev.db

# Configuración de Aplicación
NODE_ENV=development
PORT=3000

# Configuración JWT (para futura autenticación)
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=3600

# Configuración CORS
CORS_ORIGIN=http://localhost:3000
```

## 🔌 Endpoints de la API

### Health Check
```
GET /api/health
```

Respuesta:
```json
{
  "status": "ok",
  "timestamp": "2025-11-20T15:50:52.240Z",
  "environment": "development"
}
```

### Welcome
```
GET /api
```

Respuesta:
```
Welcome to Alident Backend API!
```

## 🧪 Modelo de Datos de Ejemplo

El proyecto incluye un modelo de ejemplo `User` en `prisma/schema.prisma`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Puedes modificar este modelo según las necesidades de tu proyecto.

## 🐳 Docker (Opcional)

Para facilitar el despliegue, puedes crear un `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

## 📝 Prisma Studio

Para explorar y editar los datos de tu base de datos visualmente:

```bash
npm run prisma:studio
```

Esto abrirá una interfaz web en `http://localhost:5555`

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

ISC

## 👥 Autor

JeremyE7

## 🔗 Enlaces Útiles

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
