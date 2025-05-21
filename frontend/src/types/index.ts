// Clinic types
export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface OperatingHours {
  [key: string]: {
    open: string;
    close: string;
  };
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Clinic {
  id: number;
  name: string;
  description: string;
  address: Address;
  phone: string;
  email: string;
  website: string;
  operatingHours: OperatingHours;
  services: string[];
  specialties: string[];
  facilities: string[];
  rating: number;
  reviews: number;
  images: string[];
  insuranceAccepted: string[];
  languages: string[];
  isVerified: boolean;
  location: Location;
  emergencyServices: boolean;
  parkingAvailable: boolean;
  wheelchairAccessible: boolean;
}

// Doctor types
export interface Availability {
  days: string[];
  hours: string;
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  licenseNumber: string;
  email: string;
  phone: string;
  clinicId: number;
  yearsOfExperience: number;
  education: string[];
  languages: string[];
  rating: number;
  reviews: number;
  image: string;
  availability: Availability;
  bio: string;
  certifications: string[];
  isAvailable: boolean;
}

// Medical Service types
export interface InsuranceCoverage {
  covered: boolean;
  coveragePercentage: number;
  insuranceProviders: string[];
}

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
  insuranceCoverage: InsuranceCoverage;
  specializations: string[];
  equipment: string[];
  certifications: string[];
  location: Location;
}

// Patient types
export interface MedicalHistory {
  conditions: string[];
  allergies: string[];
  medications: string[];
  surgeries: string[];
}

export interface Insurance {
  provider: string;
  policyNumber: string;
  groupNumber: string;
  coverageDetails: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: Address;
  medicalHistory: MedicalHistory;
  insurance: Insurance;
  emergencyContact: EmergencyContact;
  bloodType: string;
  height: number;
  weight: number;
  lastCheckup: string;
  preferredLanguage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Patient Medical Service types
export enum PatientMedicalServiceStatus {
  REQUESTED = 'REQUESTED',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface PatientMedicalService {
  id: number;
  patientId: number;
  medicalServiceId: number;
  status: PatientMedicalServiceStatus;
  notes?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
