export class CreateDoctorDto {
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
  image: string;
  availability: {
    days: string[];
    hours: string;
  };
  bio: string;
  certifications: string[];
  isAvailable: boolean;
} 