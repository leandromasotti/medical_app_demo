import api from './api';
import { Doctor } from '../types';

const ENDPOINT = '/doctors';

export const DoctorsService = {
  getAll: () => api.get<Doctor[]>(ENDPOINT),
  getById: (id: number) => api.get<Doctor>(`${ENDPOINT}/${id}`),
  create: (doctor: Omit<Doctor, 'id'>) => api.post<Doctor>(ENDPOINT, doctor),
  update: (id: number, doctor: Partial<Doctor>) => api.put<Doctor>(`${ENDPOINT}/${id}`, doctor),
  delete: (id: number) => api.delete<boolean>(`${ENDPOINT}/${id}`),
};
