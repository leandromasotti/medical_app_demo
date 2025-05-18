# Medical Marketplace Backend

This is the backend API for the Medical Marketplace, built with NestJS and TypeScript.

## Overview

The Medical Marketplace backend provides a RESTful API for managing medical products and procedures. It's built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Project Structure

```
backend/
├── src/                      # Source code
│   ├── products/             # Products module
│   │   ├── dto/              # Data Transfer Objects
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── interfaces/       # TypeScript interfaces
│   │   │   └── product.interface.ts
│   │   ├── products.controller.ts  # API endpoints
│   │   ├── products.module.ts      # Module definition
│   │   └── products.service.ts     # Business logic
│   ├── app.controller.ts     # Main app controller
│   ├── app.module.ts         # Main app module
│   ├── app.service.ts        # Main app service
│   └── main.ts               # Application entry point
├── package.json              # Project dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## Features

- **RESTful API**: Provides CRUD operations for medical products
- **Data Validation**: Uses class-validator for DTO validation
- **Swagger Documentation**: API documentation with OpenAPI/Swagger
- **CORS Support**: Configured for cross-origin requests from the frontend
- **TypeScript**: Type-safe code with TypeScript

## How It Works

The backend application is built with NestJS, following a modular architecture. Here's how it works:

1. **Module Structure**:
   - `AppModule`: The root module that imports all other modules
   - `ProductsModule`: Contains all product-related functionality

2. **Controller Layer**:
   - `ProductsController`: Handles HTTP requests and defines API endpoints
   - Uses decorators to define routes, HTTP methods, and request/response handling

3. **Service Layer**:
   - `ProductsService`: Contains business logic and data access methods
   - Currently uses an in-memory array for data storage (would use a database in production)

4. **Data Transfer Objects (DTOs)**:
   - `CreateProductDto`: Defines the structure for creating new products
   - `UpdateProductDto`: Defines the structure for updating existing products
   - Uses class-validator decorators for input validation

5. **Interfaces**:
   - `Product`: Defines the structure of a product entity

## API Endpoints

The API is available at `http://localhost:3001/api` and includes the following endpoints:

| Method | Endpoint           | Description                   | Request Body            | Response                 |
|--------|-------------------|-------------------------------|------------------------|--------------------------|
| GET    | /api/products     | Get all products              | -                      | Array of Product objects |
| GET    | /api/products/:id | Get a product by ID           | -                      | Product object           |
| POST   | /api/products     | Create a new product          | CreateProductDto       | Created Product object   |
| PUT    | /api/products/:id | Update a product              | UpdateProductDto       | Updated Product object   |
| DELETE | /api/products/:id | Delete a product              | -                      | -                        |

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

The API will be available at [http://localhost:3001/api](http://localhost:3001/api).

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

## Swagger Documentation

The API documentation is available at [http://localhost:3001/api](http://localhost:3001/api) when the server is running. This documentation is generated using Swagger/OpenAPI and provides:

- A list of all available endpoints
- Request and response schemas
- The ability to test API endpoints directly from the browser

## Data Storage

Currently, the application uses an in-memory array to store product data. In a production environment, you would:

1. Integrate with a database (MongoDB, PostgreSQL, etc.)
2. Create repository classes to handle data access
3. Implement proper error handling and transaction management

Example database integration with TypeORM (not currently implemented):

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

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
    ProductsModule,
  ],
})
export class AppModule {}
```

## Connecting to the Frontend

The backend is configured to accept requests from the frontend running at http://localhost:3000 through CORS configuration in `main.ts`. This allows the frontend to make API requests to the backend without encountering cross-origin issues.
