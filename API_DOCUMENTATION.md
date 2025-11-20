# API Documentation - Sistema de Gestión Odontológica

## Base URL
```
http://localhost:3000/api
```

## Autenticación
*La autenticación será implementada en el futuro con JWT*

---

## 🏥 Endpoints Principales

### Health Check
```http
GET /api/health
```

Respuesta:
```json
{
  "status": "ok",
  "timestamp": "2025-11-20T16:45:27.444Z",
  "environment": "development"
}
```

---

## 👥 Pacientes (Patients)

### Listar Pacientes
```http
GET /api/patients?page=1&limit=50&status=active
```

Query Parameters:
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Límite de resultados (default: 50)
- `status` (opcional): Estado del paciente (active, inactive, archived)

Respuesta:
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 50,
    "totalPages": 2
  }
}
```

### Obtener Paciente
```http
GET /api/patients/:id
```

Respuesta incluye:
- Datos del paciente
- Tutor (si aplica)
- Dependientes
- Últimas 10 citas
- Últimas 10 historias clínicas
- Planes de tratamiento
- Cuenta financiera

### Buscar Pacientes
```http
GET /api/patients/search?q=Juan
```

Busca por: nombre, apellido, documento, email, teléfono

### Crear Paciente
```http
POST /api/patients
Content-Type: application/json

{
  "firstName": "Juan",
  "lastName": "Pérez",
  "documentType": "DNI",
  "documentNumber": "12345678",
  "dateOfBirth": "1990-05-15",
  "gender": "male",
  "primaryPhone": "+34123456789",
  "email": "juan.perez@example.com",
  "address": "Calle Principal 123",
  "city": "Madrid",
  "postalCode": "28001",
  "emergencyPhone": "+34111222333",
  "occupation": "Ingeniero",
  "bloodType": "O+",
  "allergies": "[\"Penicilina\"]",
  "chronicDiseases": "[\"Diabetes Tipo 2\"]",
  "currentMedications": "[\"Metformina 500mg\"]",
  "isPregnant": false,
  "gdprConsent": true,
  "referralSource": "referral",
  "language": "es"
}
```

### Actualizar Paciente
```http
PATCH /api/patients/:id
Content-Type: application/json

{
  "phone": "+34999888777",
  "status": "inactive"
}
```

### Eliminar Paciente
```http
DELETE /api/patients/:id
```

---

## 👨‍⚕️ Odontólogos (Dentists)

### Listar Odontólogos
```http
GET /api/dentists?status=active
```

Query Parameters:
- `status` (opcional): Estado (active, inactive, vacation)

### Obtener Odontólogo
```http
GET /api/dentists/:id
```

Respuesta incluye:
- Datos del odontólogo
- Horarios
- Últimas 20 citas
- Últimos 10 planes de tratamiento
- Asignaciones de consultorio

### Crear Odontólogo
```http
POST /api/dentists
Content-Type: application/json

{
  "firstName": "María",
  "lastName": "García",
  "documentType": "DNI",
  "documentNumber": "87654321",
  "dateOfBirth": "1985-03-20",
  "phone": "+34987654321",
  "email": "maria.garcia@clinica.com",
  "licenseNumber": "COD-12345",
  "specialties": "[\"Ortodoncia\", \"Estética dental\"]",
  "yearsOfExperience": 10,
  "certifications": "[\"Certificado en Invisalign\"]",
  "hireDate": "2015-01-15",
  "contractType": "fixed",
  "commissionPercentage": 20,
  "productivityBonus": 500
}
```

### Actualizar Odontólogo
```http
PATCH /api/dentists/:id
Content-Type: application/json

{
  "status": "vacation",
  "commissionPercentage": 25
}
```

### Eliminar Odontólogo
```http
DELETE /api/dentists/:id
```

---

## 📅 Citas (Appointments)

### Listar Citas
```http
GET /api/appointments?startDate=2025-11-25&endDate=2025-11-30&dentistId=1&status=scheduled
```

Query Parameters:
- `startDate` (opcional): Fecha inicio (YYYY-MM-DD)
- `endDate` (opcional): Fecha fin (YYYY-MM-DD)
- `dentistId` (opcional): ID del odontólogo
- `patientId` (opcional): ID del paciente
- `status` (opcional): Estado (scheduled, confirmed, in_progress, completed, cancelled, no_show)

### Obtener Cita
```http
GET /api/appointments/:id
```

Respuesta incluye:
- Datos de la cita
- Datos del paciente
- Datos del odontólogo
- Datos del consultorio
- Sesiones de tratamiento

### Crear Cita
```http
POST /api/appointments
Content-Type: application/json

{
  "patientId": 1,
  "dentistId": 1,
  "officeId": 1,
  "appointmentDate": "2025-11-25",
  "startTime": "10:00",
  "endTime": "10:30",
  "duration": 30,
  "appointmentType": "first_consultation",
  "notes": "Primera consulta - revisión general",
  "specialInstructions": "Paciente nervioso, ser paciente"
}
```

Tipos de cita (`appointmentType`):
- `first_consultation`: Primera consulta
- `followup`: Seguimiento
- `treatment`: Tratamiento
- `emergency`: Emergencia
- `control`: Control

### Actualizar Cita
```http
PATCH /api/appointments/:id
Content-Type: application/json

{
  "status": "confirmed",
  "notes": "Paciente confirmó asistencia"
}
```

### Cancelar Cita
```http
PATCH /api/appointments/:id
Content-Type: application/json

{
  "status": "cancelled",
  "cancellationReason": "Paciente no puede asistir",
  "cancelledBy": "patient"
}
```

### Eliminar Cita
```http
DELETE /api/appointments/:id
```

---

## 🦷 Tratamientos (Treatments)

### Listar Tratamientos
```http
GET /api/treatments?category=preventive&isActive=true
```

Query Parameters:
- `category` (opcional): Categoría del tratamiento
- `isActive` (opcional): Si está activo (true/false)

Categorías disponibles:
- `preventive`: Preventivo
- `restorative`: Restaurativo
- `surgical`: Quirúrgico
- `orthodontics`: Ortodoncia
- `aesthetic`: Estético
- `prosthetics`: Prótesis
- `periodontics`: Periodoncia
- `pediatric`: Odontopediatría

### Obtener Tratamiento
```http
GET /api/treatments/:id
```

### Crear Tratamiento
```http
POST /api/treatments
Content-Type: application/json

{
  "code": "LIMP-001",
  "name": "Limpieza Dental Profesional",
  "description": "Limpieza dental completa con ultrasonido y pulido",
  "category": "preventive",
  "estimatedDuration": 45,
  "basePrice": 50.00,
  "promotionalPrice": 40.00,
  "supplyCost": 5.00,
  "requiredSpecialty": "General",
  "requiredEquipment": "[\"Ultrasonido\", \"Kit de limpieza\"]",
  "typicalSessions": 1,
  "supplies": "[{\"item\":\"Pasta profiláctica\",\"quantity\":1}]",
  "isActive": true
}
```

### Actualizar Tratamiento
```http
PATCH /api/treatments/:id
Content-Type: application/json

{
  "basePrice": 55.00,
  "isActive": true
}
```

### Eliminar Tratamiento
```http
DELETE /api/treatments/:id
```

---

## 🦷 Odontogramas (Dental Charts)

### Listar Odontogramas
```http
GET /api/odontograms
```

### Obtener Odontograma
```http
GET /api/odontograms/:id
```

### Crear Odontograma
```http
POST /api/odontograms
Content-Type: application/json

{
  "patientId": 1,
  "date": "2025-11-20",
  "teethData": "{\"11\":{\"status\":\"healthy\",\"surfaces\":{}},\"12\":{\"status\":\"carious\",\"surfaces\":{\"occlusal\":\"carious\"}}}",
  "notes": "Se detecta caries en pieza 12"
}
```

Formato de `teethData`:
- Objeto JSON con estado de cada diente
- Numeración FDI (11-18, 21-28, 31-38, 41-48 para permanentes)
- Estados: healthy, carious, filled, missing, endodontics, crown, implant

### Actualizar Odontograma
```http
PATCH /api/odontograms/:id
Content-Type: application/json

{
  "teethData": "{...}",
  "notes": "Actualización después de tratamiento"
}
```

### Eliminar Odontograma
```http
DELETE /api/odontograms/:id
```

---

## 📋 Historias Clínicas (Clinical Histories)

### Listar Historias Clínicas
```http
GET /api/clinical-histories
```

### Obtener Historia Clínica
```http
GET /api/clinical-histories/:id
```

### Crear Historia Clínica
```http
POST /api/clinical-histories
Content-Type: application/json

{
  "patientId": 1,
  "dentistId": 1,
  "visitDate": "2025-11-20",
  "chiefComplaint": "Dolor en molar inferior derecho",
  "symptoms": "Dolor al masticar, sensibilidad al frío",
  "currentIllnessHistory": "Dolor iniciado hace 3 días",
  "extraoralExam": "Sin alteraciones visibles",
  "intraoralExam": "Caries profunda en pieza 46",
  "palpation": "Sin dolor a la palpación",
  "percussion": "Dolor positivo a la percusión vertical",
  "mobility": "Sin movilidad",
  "primaryDiagnosis": "Caries dental profunda pieza 46",
  "secondaryDiagnoses": "[\"Pulpitis reversible\"]",
  "icd10Codes": "[\"K02.1\"]",
  "evolutionNotes": "Se recomienda tratamiento de conducto",
  "proceduresPerformed": "[\"Radiografía periapical\"]",
  "observations": "Paciente nervioso, se aplicó anestesia tópica",
  "attachments": "[{\"type\":\"xray\",\"url\":\"xray_46.jpg\"}]"
}
```

### Actualizar Historia Clínica
```http
PATCH /api/clinical-histories/:id
Content-Type: application/json

{
  "evolutionNotes": "Paciente regresó para seguimiento",
  "observations": "Mejora significativa"
}
```

### Eliminar Historia Clínica
```http
DELETE /api/clinical-histories/:id
```

---

## 💰 Pagos (Payments)

### Listar Pagos
```http
GET /api/payments
```

### Obtener Pago
```http
GET /api/payments/:id
```

### Crear Pago
```http
POST /api/payments
Content-Type: application/json

{
  "patientId": 1,
  "paymentDate": "2025-11-20",
  "amount": 150.00,
  "paymentMethod": "cash",
  "reference": "REC-001",
  "concept": "advance",
  "relatedTreatment": "Limpieza dental",
  "receiptNumber": "REC-2025-001",
  "notes": "Anticipo para tratamiento de ortodoncia"
}
```

Métodos de pago (`paymentMethod`):
- `cash`: Efectivo
- `debit_card`: Tarjeta de débito
- `credit_card`: Tarjeta de crédito
- `transfer`: Transferencia bancaria
- `financing_internal`: Financiamiento interno
- `financing_external`: Financiamiento externo
- `insurance`: Seguro dental
- `mixed`: Mixto

Conceptos (`concept`):
- `advance`: Anticipo
- `installment`: Cuota
- `final_balance`: Saldo final

### Actualizar Pago
```http
PATCH /api/payments/:id
Content-Type: application/json

{
  "status": "reversed",
  "notes": "Pago devuelto por cancelación de tratamiento"
}
```

### Eliminar Pago
```http
DELETE /api/payments/:id
```

---

## 📦 Inventario (Inventory)

### Listar Productos
```http
GET /api/inventory
```

### Obtener Producto
```http
GET /api/inventory/:id
```

### Crear Producto
```http
POST /api/inventory
Content-Type: application/json

{
  "code": "RES-001",
  "name": "Resina Compuesta A2",
  "description": "Resina fotopolimerizable color A2",
  "category": "dental_materials",
  "unit": "jeringa",
  "suppliers": "[1, 2]",
  "unitCost": 25.00,
  "salePrice": 35.00,
  "currentStock": 50,
  "minimumStock": 10,
  "maximumStock": 100,
  "location": "Almacén A - Estante 3",
  "expirationDate": "2026-12-31",
  "lotNumber": "LOT-2025-001"
}
```

Categorías de inventario:
- `dental_materials`: Materiales dentales
- `anesthetics`: Anestésicos
- `disposables`: Material desechable
- `medications`: Medicamentos
- `cleaning`: Material de limpieza
- `office_supplies`: Material de oficina

### Actualizar Producto
```http
PATCH /api/inventory/:id
Content-Type: application/json

{
  "currentStock": 45,
  "unitCost": 26.00
}
```

### Eliminar Producto
```http
DELETE /api/inventory/:id
```

---

## 🏥 Seguros (Insurance)

### Listar Seguros/Coberturas
```http
GET /api/insurance
```

### Obtener Seguro
```http
GET /api/insurance/:id
```

### Crear Cobertura de Seguro
```http
POST /api/insurance
Content-Type: application/json

{
  "patientId": 1,
  "insuranceCompanyId": 1,
  "policyNumber": "POL-123456",
  "affiliateNumber": "AFF-789012",
  "validFrom": "2025-01-01",
  "validUntil": "2025-12-31",
  "coveragePercentage": 80,
  "annualLimit": 2000.00,
  "remainingLimit": 2000.00,
  "status": "active"
}
```

### Actualizar Cobertura
```http
PATCH /api/insurance/:id
Content-Type: application/json

{
  "remainingLimit": 1500.00,
  "status": "active"
}
```

### Eliminar Cobertura
```http
DELETE /api/insurance/:id
```

---

## 📊 Códigos de Estado HTTP

- `200 OK`: Operación exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Error en los datos enviados
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error del servidor

## 🔒 Validaciones

Todos los endpoints POST y PATCH incluyen validación automática de datos mediante `class-validator`:

- Campos requeridos no pueden estar vacíos
- Emails deben tener formato válido
- Fechas deben estar en formato ISO (YYYY-MM-DD)
- Números deben ser del tipo correcto (Int, Float)
- Campos booleanos deben ser true/false

## 📝 Notas Importantes

1. **Campos JSON**: Muchos campos almacenan datos complejos en formato JSON (arrays, objetos). Asegúrate de enviarlos como strings JSON válidos.

2. **Relaciones**: Las relaciones entre entidades se manejan mediante IDs. Asegúrate de que los registros relacionados existan antes de crear referencias.

3. **Fechas**: Todas las fechas se almacenan en UTC y se devuelven en formato ISO 8601.

4. **Paginación**: Los endpoints de listado soportan paginación para optimizar el rendimiento.

5. **Soft Delete**: Por ahora se usa eliminación física (DELETE). En producción, considera implementar soft delete.

## 🚀 Próximas Funcionalidades

- Autenticación con JWT
- Sistema de roles y permisos
- Reportes y analíticas
- Sistema de notificaciones
- Integración con pasarelas de pago
- API para comunicaciones (SMS, Email, WhatsApp)
- Dashboard en tiempo real
- Exportación de datos (PDF, Excel)
