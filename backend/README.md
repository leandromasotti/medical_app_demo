# Medical Marketplace Backend

This is the backend API for the Medical Marketplace, built with NestJS and TypeScript.

## Overview

The Medical Marketplace backend provides a RESTful API for managing medical services, doctors, clinics, patients, and patient medical services. It's built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Project Structure

```
backend/
├── src/                      # Source code
│   ├── app.controller.ts     # Main app controller
│   ├── app.module.ts         # Main app module
│   ├── app.service.ts        # Main app service
│   ├── main.ts               # Application entry point
│   ├── clinics/              # Clinics module
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── interfaces/       # TypeScript interfaces
│   │   ├── clinics.controller.ts  # API endpoints
│   │   ├── clinics.module.ts      # Module definition
│   │   └── clinics.service.ts     # Business logic
│   ├── doctors/              # Doctors module
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── interfaces/       # TypeScript interfaces
│   │   ├── doctors.controller.ts  # API endpoints
│   │   ├── doctors.module.ts      # Module definition
│   │   └── doctors.service.ts     # Business logic
│   ├── medical-services/     # Medical Services module
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── interfaces/       # TypeScript interfaces
│   │   ├── medical-services.controller.ts  # API endpoints
│   │   ├── medical-services.module.ts      # Module definition
│   │   └── medical-services.service.ts     # Business logic
│   ├── patients/             # Patients module
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── interfaces/       # TypeScript interfaces
│   │   ├── patients.controller.ts  # API endpoints
│   │   ├── patients.module.ts      # Module definition
│   │   └── patients.service.ts     # Business logic
│   └── patient-medical-services/  # Patient Medical Services module
│       ├── dto/              # Data Transfer Objects
│       ├── interfaces/       # TypeScript interfaces
│       ├── patient-medical-services.controller.ts  # API endpoints
│       ├── patient-medical-services.module.ts      # Module definition
│       └── patient-medical-services.service.ts     # Business logic
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── postman_collection.json   # Postman collection for API testing
```

## Features

- **RESTful API**: Provides CRUD operations for all entities (clinics, doctors, medical services, patients, patient medical services)
- **Data Validation**: Uses class-validator for DTO validation
- **Swagger Documentation**: API documentation with OpenAPI/Swagger
- **CORS Support**: Configured for cross-origin requests from the frontend
- **TypeScript**: Type-safe code with TypeScript

## How It Works

The backend application is built with NestJS, following a modular architecture. Here's how it works:

1. **Module Structure**:
   - `AppModule`: The root module that imports all other modules
   - `ClinicsModule`: Contains all clinic-related functionality
   - `DoctorsModule`: Contains all doctor-related functionality
   - `MedicalServicesModule`: Contains all medical service-related functionality
   - `PatientsModule`: Contains all patient-related functionality
   - `PatientMedicalServicesModule`: Contains all patient medical service-related functionality

2. **Controller Layer**:
   - Controllers handle HTTP requests and define API endpoints
   - Uses decorators to define routes, HTTP methods, and request/response handling

3. **Service Layer**:
   - Services contain business logic and data access methods
   - Currently uses in-memory arrays for data storage (would use a database in production)

4. **Data Transfer Objects (DTOs)**:
   - Define the structure for creating and updating entities
   - Uses class-validator decorators for input validation

5. **Interfaces**:
   - Define the structure of entity objects

## API Endpoints

The API is available at `http://localhost:3001` and includes the following endpoints:

### Clinics

| Method | Endpoint           | Description                   | Request Body            | Response                 |
|--------|-------------------|-------------------------------|------------------------|--------------------------|
| GET    | /clinics          | Get all clinics               | -                      | Array of Clinic objects  |
| GET    | /clinics/:id      | Get a clinic by ID            | -                      | Clinic object            |
| POST   | /clinics          | Create a new clinic           | CreateClinicDto        | Created Clinic object    |
| PUT    | /clinics/:id      | Update a clinic               | UpdateClinicDto        | Updated Clinic object    |
| DELETE | /clinics/:id      | Delete a clinic               | -                      | -                        |

### Doctors

| Method | Endpoint           | Description                   | Request Body            | Response                 |
|--------|-------------------|-------------------------------|------------------------|--------------------------|
| GET    | /doctors          | Get all doctors               | -                      | Array of Doctor objects  |
| GET    | /doctors/:id      | Get a doctor by ID            | -                      | Doctor object            |
| POST   | /doctors          | Create a new doctor           | CreateDoctorDto        | Created Doctor object    |
| PUT    | /doctors/:id      | Update a doctor               | UpdateDoctorDto        | Updated Doctor object    |
| DELETE | /doctors/:id      | Delete a doctor               | -                      | -                        |

### Medical Services

| Method | Endpoint                | Description                   | Request Body                 | Response                        |
|--------|------------------------|-------------------------------|-----------------------------|---------------------------------|
| GET    | /medical-services      | Get all medical services      | -                           | Array of MedicalService objects |
| GET    | /medical-services/:id  | Get a medical service by ID   | -                           | MedicalService object           |
| POST   | /medical-services      | Create a new medical service  | CreateMedicalServiceDto     | Created MedicalService object   |
| PUT    | /medical-services/:id  | Update a medical service      | UpdateMedicalServiceDto     | Updated MedicalService object   |
| DELETE | /medical-services/:id  | Delete a medical service      | -                           | -                               |

### Patients

| Method | Endpoint           | Description                   | Request Body            | Response                 |
|--------|-------------------|-------------------------------|------------------------|--------------------------|
| GET    | /patients          | Get all patients             | -                      | Array of Patient objects |
| GET    | /patients/:id      | Get a patient by ID          | -                      | Patient object           |
| POST   | /patients          | Create a new patient         | CreatePatientDto       | Created Patient object   |
| PUT    | /patients/:id      | Update a patient             | UpdatePatientDto       | Updated Patient object   |
| DELETE | /patients/:id      | Delete a patient             | -                      | -                        |

### Patient Medical Services

| Method | Endpoint                           | Description                            | Request Body                        | Response                               |
|--------|-----------------------------------|----------------------------------------|------------------------------------|-----------------------------------------|
| GET    | /patient-medical-services          | Get all patient medical services       | -                                  | Array of PatientMedicalService objects |
| GET    | /patient-medical-services/:id      | Get a patient medical service by ID    | -                                  | PatientMedicalService object           |
| POST   | /patient-medical-services          | Create a new patient medical service   | CreatePatientMedicalServiceDto     | Created PatientMedicalService object   |
| PUT    | /patient-medical-services/:id      | Update a patient medical service       | UpdatePatientMedicalServiceDto     | Updated PatientMedicalService object   |
| DELETE | /patient-medical-services/:id      | Delete a patient medical service       | -                                  | -                                      |

## How to Run

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository (if not already done)
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development Server

Run the development server:

```bash
npm run start:dev
# or
yarn start:dev
```

The API will be available at [http://localhost:3001](http://localhost:3001).

### Building for Production

Build the application for production:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm run start:prod
# or
yarn start:prod
```

## Available Scripts

- `npm run start`: Start the server in standard mode
- `npm run start:dev`: Start the server in development mode with hot-reload
- `npm run start:debug`: Start the server in debug mode
- `npm run start:prod`: Start the server in production mode
- `npm run build`: Build the application for production
- `npm run format`: Format code with Prettier
- `npm run lint`: Run ESLint to check for code quality issues

## API Testing with Postman

A Postman collection is included in the repository (`postman_collection.json`) to help test the API endpoints. To use it:

1. Import the collection into Postman
2. Make sure the backend server is running
3. Use the collection to test the various endpoints

## Data Storage

Currently, the application uses in-memory arrays to store data. In a production environment, you would:

1. Integrate with a database (MongoDB, PostgreSQL, etc.)
2. Create repository classes to handle data access
3. Implement proper error handling and transaction management

Example database integration with TypeORM (not currently implemented):

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsModule } from './clinics/clinics.module';
import { DoctorsModule } from './doctors/doctors.module';
import { MedicalServicesModule } from './medical-services/medical-services.module';
import { PatientsModule } from './patients/patients.module';
import { PatientMedicalServicesModule } from './patient-medical-services/patient-medical-services.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'medical_marketplace',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ClinicsModule,
    DoctorsModule,
    MedicalServicesModule,
    PatientsModule,
    PatientMedicalServicesModule,
  ],
})
export class AppModule {}
```

## Connecting to the Frontend

The backend is configured to accept requests from the frontend running at http://localhost:3000 through CORS configuration in `main.ts`. This allows the frontend to make API requests to the backend without encountering cross-origin issues.

The frontend uses a service-based architecture to interact with the backend API. For more details on how the frontend interacts with the backend, see the `API_INTEGRATION.md` file in the frontend directory.

## Entity Relationships

The backend manages several related entities:

- **Clinics**: Medical facilities that offer services and employ doctors
- **Doctors**: Medical professionals who work at clinics and provide medical services
- **Medical Services**: Procedures, treatments, or consultations offered by clinics and performed by doctors
- **Patients**: Individuals who receive medical services
- **Patient Medical Services**: Records of medical services provided to patients

These entities are related as follows:

- A clinic has many doctors and offers many medical services
- A doctor belongs to a clinic and can perform many medical services
- A medical service can be offered by many clinics and performed by many doctors
- A patient can receive many medical services
- A patient medical service links a patient with a specific medical service, doctor, and potentially a clinic
