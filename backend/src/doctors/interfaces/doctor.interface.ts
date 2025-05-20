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
  availability: {
    days: string[];
    hours: string;
  };
  bio: string;
  certifications: string[];
  isAvailable: boolean;
} 