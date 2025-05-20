export enum MedicalServiceStatus {
  SCHEDULED = 'SCHEDULED',           // Cita agendada
  CONFIRMED = 'CONFIRMED',           // Cita confirmada
  IN_PROGRESS = 'IN_PROGRESS',       // Servicio en progreso
  COMPLETED = 'COMPLETED',           // Servicio completado
  CANCELLED = 'CANCELLED',           // Servicio cancelado
  RESCHEDULED = 'RESCHEDULED',       // Servicio reagendado
  PENDING_PAYMENT = 'PENDING_PAYMENT', // Pendiente de pago
  PAID = 'PAID',                     // Pagado
  PENDING_RESULTS = 'PENDING_RESULTS', // Pendiente de resultados
  RESULTS_READY = 'RESULTS_READY'    // Resultados listos
}

export interface PatientMedicalService {
  id: number;
  patientId: number;
  medicalServiceId: number;
  status: MedicalServiceStatus;
  scheduledDate: string;
  actualDate?: string;
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
  createdAt: string;
  updatedAt: string;
} 