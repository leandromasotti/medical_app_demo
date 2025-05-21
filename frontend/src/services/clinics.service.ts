import api from './api';
import { Clinic } from '../types';

const ENDPOINT = '/clinics';

export const ClinicsService = {
  getAll: () => api.get<Clinic[]>(ENDPOINT),
  getById: (id: number) => api.get<Clinic>(`${ENDPOINT}/${id}`),
  create: (clinic: Omit<Clinic, 'id'>) => api.post<Clinic>(ENDPOINT, clinic),
  update: (id: number, clinic: Partial<Clinic>) => api.put<Clinic>(`${ENDPOINT}/${id}`, clinic),
  delete: (id: number) => api.delete<boolean>(`${ENDPOINT}/${id}`),
};
