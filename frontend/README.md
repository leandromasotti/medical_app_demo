# Medical App Frontend

This is the frontend for the Medical App, a platform for connecting patients with medical services, clinics, and doctors.

## Features

- Browse medical services by category
- View detailed information about medical services
- See clinic and doctor information
- Check insurance coverage for medical services

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: Reusable UI components
- `src/services`: API service files for backend communication
- `src/types`: TypeScript interfaces and types
- `src/utils`: Utility functions

## API Integration

The frontend connects to the backend API using the service files in `src/services`. Each entity (clinics, doctors, medical services, etc.) has its own service file with methods for CRUD operations.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Components

- `MedicalServiceCard`: Displays a card for a medical service
- `ErrorState`: Displays an error message with an action button
- `LoadingState`: Displays a loading spinner with a message

## Styling

The project uses Tailwind CSS for styling. Custom styles are defined in `src/app/globals.css`.

## TypeScript

The project uses TypeScript for type safety. Type definitions are in `src/types/index.ts`.
