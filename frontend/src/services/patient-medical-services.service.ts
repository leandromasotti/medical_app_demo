import api from './api';
import { PatientMedicalService } from '../types';

const ENDPOINT = '/patient-medical-services';

export const PatientMedicalServicesService = {
  getAll: () => api.get<PatientMedicalService[]>(ENDPOINT),
  getById: (id: number) => api.get<PatientMedicalService>(`${ENDPOINT}/${id}`),
  create: (patientMedicalService: Omit<PatientMedicalService, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<PatientMedicalService>(ENDPOINT, patientMedicalService),
  update: (id: number, patientMedicalService: Partial<PatientMedicalService>) => 
    api.put<PatientMedicalService>(`${ENDPOINT}/${id}`, patientMedicalService),
  delete: (id: number) => api.delete<boolean>(`${ENDPOINT}/${id}`),
};
