# Medical Marketplace

A marketplace application for medical products and procedures built with Next.js for the frontend and Nest.js for the backend.

## Project Structure

```

├── frontend/         # Next.js frontend application
├── backend/          # Nest.js backend API
```

## Features

- Browse medical products and procedures
- View detailed information about each product
- Filter products by category
- RESTful API for product management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd backend
npm install
```

### Running the Application

#### Frontend (Next.js)

```bash
cd frontend
npm run dev
```

The frontend will be available at http://localhost:3000

#### Backend (Nest.js)

```bash
cd backend
npm run start:dev
```

The backend API will be available at http://localhost:3001

The API documentation (Swagger) will be available at http://localhost:3001/api

## API Endpoints

- `GET /doctors` - Get all doctors
- `GET /doctors/:id` - Get a specific doctor by ID
- `POST /doctors` - Create a new doctor
- `PATCH /doctors/:id` - Update a doctor
- `DELETE /doctors/:id` - Delete a doctor

- `GET /clinics` - Get all clinics
- `GET /clinics/:id` - Get a specific clinic by ID
- `POST /clinics` - Create a new clinic
- `PATCH /clinics/:id` - Update a clinic
- `DELETE /clinics/:id` - Delete a clinic

- `GET /medical-services` - Get all medical services
- `GET /medical-services/:id` - Get a specific medical service by ID
- `POST /medical-services` - Create a new medical service
- `PATCH /medical-services/:id` - Update a medical service
- `DELETE /medical-services/:id` - Delete a medical service

- `GET /patients` - Get all patients
- `GET /patients/:id` - Get a specific patient by ID
- `POST /patients` - Create a new patient
- `PATCH /patients/:id` - Update a patient
- `DELETE /patients/:id` - Delete a patient

- `GET /patients/:patientId/medical-services` - Get all medical services for a patient
- `GET /patients/:patientId/medical-services/:serviceId` - Get a specific medical service for a patient
- `POST /patients/:patientId/medical-services` - Create a new medical service for a patient
- `PATCH /patients/:patientId/medical-services/:serviceId` - Update a medical service for a patient
- `DELETE /patients/:patientId/medical-services/:serviceId` - Delete a medical service for a patient

## Technologies Used

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Nest.js
- TypeScript
- Swagger for API documentation
