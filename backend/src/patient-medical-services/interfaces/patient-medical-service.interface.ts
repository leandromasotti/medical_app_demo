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
  createdAt: Date;
  updatedAt: Date;
} 