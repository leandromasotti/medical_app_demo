import { MedicalServiceStatus } from '../interfaces/patient-medical-service.interface';

export class CreatePatientMedicalServiceDto {
  patientId: number;
  medicalServiceId: number;
  status: MedicalServiceStatus;
  scheduledDate: string;
  notes?: string;
  doctorId?: number;
  clinicId: number;
  price: number;
  paymentStatus: 'PENDING' | 'PAID' | 'PARTIALLY_PAID';
  paymentAmount?: number;
  insuranceCoverage?: {
    covered: boolean;
    coverageAmount?: number;
    policyNumber?: string;
  };
  followUpRequired: boolean;
  followUpDate?: string;
} 