# Alident Backend - Sistema de Gestión Odontológica

Backend completo para un sistema de gestión de clínica dental construido con NestJS, Prisma ORM y SQLite (fácilmente configurable para PostgreSQL, MySQL, MongoDB, etc.).

## 🏥 Sistema Completo de Gestión Odontológica

Este backend implementa un sistema integral para la gestión de clínicas dentales que incluye:

### 👥 Gestión de Personas
- **Pacientes**: Datos personales, información médica, historial odontológico, preferencias
- **Odontólogos**: Datos profesionales, especialidades, comisiones, horarios
- **Personal Administrativo**: Recepcionistas, asistentes, roles y permisos

### 🏢 Estructura Clínica
- **Consultorios**: Gestión de salas, equipamiento, asignaciones
- **Equipamiento**: Inventario, mantenimiento, estado operativo

### 🦷 Servicios Odontológicos
- **Catálogo de Tratamientos**: 70+ procedimientos dentales organizados por categoría
- **Odontograma Digital**: Registro visual del estado dental de cada paciente
- **Historia Clínica**: Anamnesis, exámenes, diagnósticos, evoluciones

### 📅 Gestión de Citas
- **Agenda Digital**: Sistema completo de agendamiento y recordatorios
- **Estados de Cita**: Tracking desde agendamiento hasta finalización
- **Sala de Espera Virtual**: Control de flujo de pacientes

### 💰 Sistema Financiero
- **Presupuestos**: Generación automática desde planes de tratamiento
- **Pagos**: Múltiples métodos, seguimiento de transacciones
- **Financiamiento**: Planes de pago personalizados
- **Facturación**: Emisión de facturas con cumplimiento fiscal
- **Cajas**: Control de apertura y cierre, arqueos
- **Cuentas por Cobrar**: Gestión de saldos pendientes

### 📦 Inventario
- **Productos e Insumos**: Materiales dentales, anestésicos, desechables
- **Control de Stock**: Alertas de stock mínimo, vencimientos
- **Movimientos**: Entradas, salidas, consumo en tratamientos
- **Órdenes de Compra**: Gestión de proveedores

### 💼 Recursos Humanos
- **Nómina**: Cálculo automático de salarios y comisiones
- **Asistencia**: Control de horarios y ausencias
- **Comisiones**: Sistema de comisiones por tratamiento para odontólogos

### 🏥 Seguros Dentales
- **Aseguradoras**: Gestión de convenios y coberturas
- **Pólizas**: Vinculación con pacientes, límites anuales
- **Autorización de Tratamientos**: Seguimiento de aprobaciones

### 📊 Comunicaciones
- **Notificaciones Automáticas**: Recordatorios de citas, cobros
- **Plantillas de Mensajes**: SMS, Email, WhatsApp
- **Historial**: Registro de todas las comunicaciones

### 🎯 Marketing y Fidelización
- **Programas de Puntos**: Sistema de lealtad de clientes
- **Campañas**: Promociones y descuentos segmentados
- **Cupones**: Códigos de descuento

### 🔐 Seguridad y Auditoría
- **Usuarios del Sistema**: Roles y permisos granulares
- **Logs de Auditoría**: Registro de todas las operaciones
- **GDPR**: Cumplimiento de protección de datos

## 🚀 Características Técnicas

- ✅ **NestJS**: Framework progresivo de Node.js para construir aplicaciones server-side eficientes y escalables
- ✅ **Prisma ORM**: ORM moderno de próxima generación con soporte para múltiples bases de datos
- ✅ **SQLite**: Base de datos ligera por defecto (fácilmente cambiar a PostgreSQL, MySQL, MongoDB)
- ✅ **TypeScript**: Tipado estático para mayor seguridad y productividad
- ✅ **Validación**: Validación automática de datos con class-validator y class-transformer
- ✅ **CORS**: Configuración de CORS lista para producción
- ✅ **Modular**: Arquitectura modular escalable con separación de responsabilidades
- ✅ **RESTful API**: API REST completa con más de 50 endpoints
- ✅ **Migraciones**: Sistema de migraciones de base de datos con Prisma
- ✅ **Documentación**: Documentación completa de API y guías de configuración

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

El sistema cuenta con más de 50 endpoints REST organizados en los siguientes módulos:

### Módulos Principales
- **`/api/patients`**: Gestión de pacientes (CRUD completo, búsqueda)
- **`/api/dentists`**: Gestión de odontólogos
- **`/api/appointments`**: Gestión de citas (filtros por fecha, dentista, paciente)
- **`/api/treatments`**: Catálogo de tratamientos
- **`/api/odontograms`**: Odontogramas digitales
- **`/api/clinical-histories`**: Historias clínicas
- **`/api/payments`**: Gestión de pagos
- **`/api/inventory`**: Control de inventario
- **`/api/insurance`**: Seguros dentales

### Health Check
```http
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

### Documentación Completa

Para ver la documentación completa de todos los endpoints, incluyendo:
- Parámetros de entrada
- Formatos de respuesta
- Ejemplos de uso
- Códigos de error

Consulta: **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**

## 🗄️ Base de Datos y Modelos

El sistema incluye **40+ modelos de datos** completamente implementados en `prisma/schema.prisma`, incluyendo:

### Modelos Principales
- **Patient**: Pacientes con datos personales, médicos y administrativos
- **Dentist**: Odontólogos con especialidades y configuración laboral
- **Appointment**: Citas con estados y seguimiento completo
- **Treatment**: Catálogo de tratamientos con precios y duraciones
- **Odontogram**: Odontogramas digitales con estado de cada diente
- **ClinicalHistory**: Historias clínicas completas
- **Payment**: Pagos con múltiples métodos
- **FinancingPlan**: Planes de financiamiento
- **Invoice**: Facturas con cumplimiento fiscal
- **Product**: Inventario de productos e insumos
- **InsuranceCompany**: Aseguradoras y coberturas
- **SystemUser**: Usuarios del sistema con roles y permisos
- **AuditLog**: Logs de auditoría
- Y muchos más...

### Relaciones Complejas
El esquema incluye relaciones sofisticadas como:
- Pacientes con tutores y dependientes
- Planes de tratamiento con múltiples ítems
- Sesiones de tratamiento vinculadas a citas
- Movimientos de inventario ligados a tratamientos
- Sistema de comisiones para odontólogos

Para ver el esquema completo: `prisma/schema.prisma`

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
