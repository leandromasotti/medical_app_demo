import api from './api';
import { Patient } from '../types';

const ENDPOINT = '/patients';

export const PatientsService = {
  getAll: () => api.get<Patient[]>(ENDPOINT),
  getById: (id: number) => api.get<Patient>(`${ENDPOINT}/${id}`),
  create: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => api.post<Patient>(ENDPOINT, patient),
  update: (id: number, patient: Partial<Patient>) => api.put<Patient>(`${ENDPOINT}/${id}`, patient),
  delete: (id: number) => api.delete<boolean>(`${ENDPOINT}/${id}`),
};
