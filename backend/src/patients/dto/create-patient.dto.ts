export class CreatePatientDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    medications: string[];
    surgeries: string[];
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    coverageDetails: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  bloodType: string;
  height: number;
  weight: number;
  preferredLanguage: string;
  isActive: boolean;
} 