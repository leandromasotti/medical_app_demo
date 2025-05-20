export interface MedicalService {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  price: number;
  duration: string;
  clinicId: number;
  doctorIds: number[];
  requirements: string[];
  preparation: string[];
  aftercare: string[];
  risks: string[];
  benefits: string[];
  contraindications: string[];
  images: string[];
  rating: number;
  reviews: number;
  isAvailable: boolean;
  insuranceCoverage: {
    covered: boolean;
    coveragePercentage: number;
    insuranceProviders: string[];
  };
  specializations: string[];
  equipment: string[];
  certifications: string[];
  location: {
    latitude: number;
    longitude: number;
  };
} 