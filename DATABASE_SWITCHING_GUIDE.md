# Guía para Cambiar de Base de Datos

Esta guía te ayudará a cambiar de SQLite a otras bases de datos de forma sencilla.

## 🔄 Cambiar a PostgreSQL

### 1. Instalar las dependencias necesarias

```bash
npm install @prisma/adapter-pg pg
```

### 2. Actualizar el archivo .env

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/alident?schema=public"
```

### 3. Actualizar prisma/schema.prisma

```prisma
datasource db {
  provider = "postgresql"
}
```

### 4. Actualizar src/prisma/prisma.service.ts

Reemplaza el import y el adaptador:

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {
    const databaseUrl = configService.get<string>('DATABASE_URL');
    
    const pool = new Pool({
      connectionString: databaseUrl,
    });
    
    const adapter = new PrismaPg(pool);
    
    super({
      adapter,
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  // ... resto del código
}
```

### 5. Ejecutar las migraciones

```bash
npm run prisma:migrate
```

---

## 🔄 Cambiar a MySQL

### 1. Instalar las dependencias necesarias

```bash
npm install @prisma/adapter-mysql mysql2
```

### 2. Actualizar el archivo .env

```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/alident"
```

### 3. Actualizar prisma/schema.prisma

```prisma
datasource db {
  provider = "mysql"
}
```

### 4. Actualizar src/prisma/prisma.service.ts

Reemplaza el import y el adaptador:

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaMysql } from '@prisma/adapter-mysql';
import mysql from 'mysql2/promise';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {
    const databaseUrl = configService.get<string>('DATABASE_URL');
    
    const pool = mysql.createPool({
      uri: databaseUrl,
    });
    
    const adapter = new PrismaMysql(pool);
    
    super({
      adapter,
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  // ... resto del código
}
```

### 5. Ejecutar las migraciones

```bash
npm run prisma:migrate
```

---

## 🔄 Cambiar a MongoDB

### 1. Instalar las dependencias necesarias

MongoDB no requiere adaptadores adicionales en Prisma, pero necesitas actualizar la configuración.

### 2. Actualizar el archivo .env

```env
DATABASE_URL="mongodb://localhost:27017/alident"
```

### 3. Actualizar prisma/schema.prisma

```prisma
datasource db {
  provider = "mongodb"
}

// IMPORTANTE: Los modelos para MongoDB deben usar @id @db.ObjectId
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 4. Actualizar src/prisma/prisma.service.ts

Para MongoDB, necesitas un adaptador diferente:

```bash
npm install @prisma/adapter-mongodb mongodb
```

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaMongoDB } from '@prisma/adapter-mongodb';
import { MongoClient } from 'mongodb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {
    const databaseUrl = configService.get<string>('DATABASE_URL');
    
    const mongoClient = new MongoClient(databaseUrl);
    
    const adapter = new PrismaMongoDB(mongoClient.db());
    
    super({
      adapter,
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  // ... resto del código
}
```

### 5. Sincronizar el esquema

MongoDB no usa migraciones tradicionales, en su lugar usa:

```bash
npm run db:push
```

---

## 📝 Notas Importantes

1. **Backup de Datos**: Siempre haz backup de tus datos antes de cambiar de base de datos.

2. **Migraciones**: Las migraciones de SQLite no son compatibles con otras bases de datos. Necesitarás crear nuevas migraciones después del cambio.

3. **Tipos de Datos**: Algunos tipos de datos pueden comportarse diferente entre bases de datos. Revisa la [documentación de Prisma](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-field-scalar-types) para más detalles.

4. **Características Específicas**: Cada base de datos tiene características únicas. Por ejemplo:
   - PostgreSQL: Soporte para JSON, arrays, full-text search
   - MySQL: Diferentes engines (InnoDB, MyISAM)
   - MongoDB: Base de datos NoSQL, esquema flexible

5. **Performance**: Considera las implicaciones de rendimiento al elegir tu base de datos:
   - SQLite: Perfecto para desarrollo y aplicaciones pequeñas
   - PostgreSQL: Excelente para aplicaciones grandes con alta concurrencia
   - MySQL: Bueno para aplicaciones web con alto tráfico de lectura
   - MongoDB: Ideal para datos no estructurados o semi-estructurados

## 🧪 Verificación

Después de cambiar la base de datos, verifica que todo funciona correctamente:

1. **Generar cliente de Prisma**:
```bash
npm run prisma:generate
```

2. **Ejecutar migraciones o push**:
```bash
npm run prisma:migrate  # Para SQL databases
# o
npm run db:push         # Para MongoDB
```

3. **Compilar el proyecto**:
```bash
npm run build
```

4. **Iniciar el servidor**:
```bash
npm run start:dev
```

5. **Probar los endpoints**:
```bash
curl http://localhost:3000/api/health
```

## 🔗 Referencias

- [Prisma Database Connectors](https://www.prisma.io/docs/concepts/database-connectors)
- [Prisma Adapters](https://www.prisma.io/docs/orm/overview/databases/database-drivers)
- [Migration Guide](https://www.prisma.io/docs/guides/migrate-to-prisma/migrate-from-typeorm)
