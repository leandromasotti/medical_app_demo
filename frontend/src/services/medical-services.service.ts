import api from './api';
import { MedicalService } from '../types';

const ENDPOINT = '/medical-services';

export const MedicalServicesService = {
  getAll: () => api.get<MedicalService[]>(ENDPOINT),
  getById: (id: number) => api.get<MedicalService>(`${ENDPOINT}/${id}`),
  create: (medicalService: Omit<MedicalService, 'id'>) => api.post<MedicalService>(ENDPOINT, medicalService),
  update: (id: number, medicalService: Partial<MedicalService>) => api.put<MedicalService>(`${ENDPOINT}/${id}`, medicalService),
  delete: (id: number) => api.delete<boolean>(`${ENDPOINT}/${id}`),
};
