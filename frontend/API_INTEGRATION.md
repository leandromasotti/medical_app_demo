# Frontend-Backend API Integration

This document explains how the frontend interacts with the backend API, detailing which components call which endpoints and how data flows between them.

## API Service Architecture

The frontend uses a service-based architecture to interact with the backend API:

1. **Base API Service** (`src/services/api.ts`): Provides the core HTTP request functionality
2. **Entity-specific Services**: Specialized services for each entity type (clinics, doctors, medical services, etc.)
3. **Component Integration**: React components use these services to fetch and display data

## API Base URL Configuration

The API base URL is configured in the `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

This URL is used by the base API service to construct the full endpoint URLs.

## Base API Service

The `api.ts` file provides a generic API client with methods for common HTTP operations:

```typescript
// src/services/api.ts
export const api = {
  get: async <T>(path: string): Promise<T> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },
  
  post: async <T>(path: string, data: any): Promise<T> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  },
  
  // Additional methods for PUT, DELETE, etc.
}
```

## Entity-Specific Services

Each entity has its own service file that uses the base API service:

### Clinics Service

```typescript
// src/services/clinics.service.ts
import { api } from './api';
import { Clinic } from '@/types';

export const ClinicsService = {
  getAll: () => api.get<Clinic[]>('/clinics'),
  getById: (id: number) => api.get<Clinic>(`/clinics/${id}`),
  create: (data: Omit<Clinic, 'id'>) => api.post<Clinic>('/clinics', data),
  // Additional methods
};
```

### Doctors Service

```typescript
// src/services/doctors.service.ts
import { api } from './api';
import { Doctor } from '@/types';

export const DoctorsService = {
  getAll: () => api.get<Doctor[]>('/doctors'),
  getById: (id: number) => api.get<Doctor>(`/doctors/${id}`),
  create: (data: Omit<Doctor, 'id'>) => api.post<Doctor>('/doctors', data),
  // Additional methods
};
```

### Medical Services Service

```typescript
// src/services/medical-services.service.ts
import { api } from './api';
import { MedicalService } from '@/types';

export const MedicalServicesService = {
  getAll: () => api.get<MedicalService[]>('/medical-services'),
  getById: (id: number) => api.get<MedicalService>(`/medical-services/${id}`),
  create: (data: Omit<MedicalService, 'id'>) => api.post<MedicalService>('/medical-services', data),
  // Additional methods
};
```

### Patients Service

```typescript
// src/services/patients.service.ts
import { api } from './api';
import { Patient } from '@/types';

export const PatientsService = {
  getAll: () => api.get<Patient[]>('/patients'),
  getById: (id: number) => api.get<Patient>(`/patients/${id}`),
  create: (data: Omit<Patient, 'id'>) => api.post<Patient>('/patients', data),
  // Additional methods
};
```

### Patient Medical Services Service

```typescript
// src/services/patient-medical-services.service.ts
import { api } from './api';
import { PatientMedicalService } from '@/types';

export const PatientMedicalServicesService = {
  getAll: () => api.get<PatientMedicalService[]>('/patient-medical-services'),
  getById: (id: number) => api.get<PatientMedicalService>(`/patient-medical-services/${id}`),
  create: (data: Omit<PatientMedicalService, 'id'>) => api.post<PatientMedicalService>('/patient-medical-services', data),
  // Additional methods
};
```

## Component-API Integration

### Home Page (`src/app/page.tsx`)

The home page fetches featured medical services:

```typescript
// In useEffect or similar
const fetchFeaturedServices = async () => {
  try {
    const services = await MedicalServicesService.getAll();
    // Filter or process services as needed
    setFeaturedServices(services);
  } catch (error) {
    setError('Failed to load featured services');
  } finally {
    setLoading(false);
  }
};
```

### Products Page (`src/app/products/page.tsx`)

The products page fetches all medical services:

```typescript
// In useEffect or similar
const fetchMedicalServices = async () => {
  try {
    const services = await MedicalServicesService.getAll();
    setMedicalServices(services);
  } catch (error) {
    setError('Failed to load medical services');
  } finally {
    setLoading(false);
  }
};
```

### Product Detail Page (`src/app/products/[id]/page.tsx`)

The product detail page fetches a specific medical service by ID:

```typescript
// In useEffect or similar
const fetchMedicalService = async (id: number) => {
  try {
    const service = await MedicalServicesService.getById(id);
    setMedicalService(service);
    
    // Fetch related clinic
    if (service.clinicId) {
      const clinic = await ClinicsService.getById(service.clinicId);
      setClinic(clinic);
    }
    
    // Fetch related doctors
    if (service.doctorIds && service.doctorIds.length > 0) {
      const doctorsPromises = service.doctorIds.map(id => DoctorsService.getById(id));
      const doctorsData = await Promise.all(doctorsPromises);
      setDoctors(doctorsData);
    }
  } catch (error) {
    setError('Failed to load medical service details');
  } finally {
    setLoading(false);
  }
};
```

### Search Page (`src/app/search/page.tsx`)

The search page fetches doctors or clinics based on the selected search type:

```typescript
// In useEffect or similar
const fetchData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    if (searchType === 'doctors') {
      const doctorsData = await DoctorsService.getAll();
      setDoctors(doctorsData);
    } else {
      const clinicsData = await ClinicsService.getAll();
      setClinics(clinicsData);
    }
  } catch (err) {
    console.error(`Error fetching ${searchType}:`, err);
    setError(`Failed to load ${searchType}. Please try again later.`);
  } finally {
    setLoading(false);
  }
};
```

### Health Dashboard (`src/app/health/page.tsx`)

The health dashboard fetches patient data, doctors, and patient medical services:

```typescript
// In useEffect or similar
const fetchData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    // Fetch doctors
    const doctorsData = await DoctorsService.getAll();
    setDoctors(doctorsData);
    
    // Fetch patient data
    const patientData = await PatientsService.getById(patientId);
    setPatient(patientData);
    
    // Fetch patient medical services
    const servicesData = await PatientMedicalServicesService.getAll();
    const patientServicesData = servicesData.filter(service => service.patientId === patientId);
    setPatientServices(patientServicesData);
  } catch (err) {
    console.error('Error fetching health data:', err);
    setError('Failed to load health data. Please try again later.');
  } finally {
    setLoading(false);
  }
};
```

## API Endpoints Summary

| Frontend Component | Backend Endpoint | HTTP Method | Description |
|-------------------|-----------------|------------|-------------|
| Home Page | `/medical-services` | GET | Fetch all medical services (filtered for featured) |
| Products Page | `/medical-services` | GET | Fetch all medical services |
| Product Detail Page | `/medical-services/:id` | GET | Fetch a specific medical service |
| Product Detail Page | `/clinics/:id` | GET | Fetch clinic details for a medical service |
| Product Detail Page | `/doctors/:id` | GET | Fetch doctor details for a medical service |
| Search Page (Doctors) | `/doctors` | GET | Fetch all doctors |
| Search Page (Clinics) | `/clinics` | GET | Fetch all clinics |
| Health Dashboard | `/patients/:id` | GET | Fetch patient details |
| Health Dashboard | `/doctors` | GET | Fetch all doctors |
| Health Dashboard | `/patient-medical-services` | GET | Fetch all patient medical services |

## Error Handling

All API calls are wrapped in try/catch blocks to handle errors gracefully. When an error occurs:

1. The error is logged to the console
2. An error state is set with a user-friendly message
3. The loading state is set to false
4. An error component is displayed to the user

## Loading States

During API calls, a loading state is set to true, which displays a loading spinner or skeleton UI to the user. Once the API call completes (either successfully or with an error), the loading state is set to false.

## Data Flow Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  React      │     │  Service    │     │  Backend    │
│  Component  │────▶│  Layer      │────▶│  API        │
└─────────────┘     └─────────────┘     └─────────────┘
       ▲                   │                   │
       │                   │                   │
       └───────────────────┴───────────────────┘
                 Data Response
```

This architecture provides a clean separation of concerns:
- Components are responsible for UI and state management
- Services handle API communication
- The backend API provides the data

This makes the code more maintainable and easier to test.
