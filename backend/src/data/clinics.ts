import { Clinic } from '../clinics/interfaces/clinic.interface';

export const clinics: Clinic[] = [
  {
    id: 1,
    name: 'Clínica del Valle',
    description: 'Centro médico especializado en atención integral',
    address: {
      street: 'Av. Insurgentes Sur 1234',
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'México',
      zipCode: '03800',
    },
    phone: '+52 55 1234 5678',
    email: 'contacto@clinicadelvalle.com',
    website: 'https://clinicadelvalle.com',
    operatingHours: {
      monday: { open: '08:00', close: '20:00' },
      tuesday: { open: '08:00', close: '20:00' },
      wednesday: { open: '08:00', close: '20:00' },
      thursday: { open: '08:00', close: '20:00' },
      friday: { open: '08:00', close: '20:00' },
      saturday: { open: '09:00', close: '14:00' },
      sunday: { open: '09:00', close: '14:00' },
    },
    services: ['Consultas', 'Laboratorio', 'Rayos X', 'Ultrasonido'],
    specialties: ['Medicina General', 'Pediatría', 'Ginecología'],
    facilities: ['Estacionamiento', 'Cafetería', 'Sala de espera'],
    rating: 4.5,
    reviews: 150,
    images: ['clinic1.jpg', 'clinic2.jpg'],
    insuranceAccepted: ['Seguros Monterrey', 'GNP', 'AXA'],
    languages: ['Español', 'Inglés'],
    isVerified: true,
    location: {
      latitude: 19.4326,
      longitude: -99.1332,
    },
    emergencyServices: true,
    parkingAvailable: true,
    wheelchairAccessible: true,
  },
  {
    id: 2,
    name: 'Centro Médico Polanco',
    description: 'Centro médico de alta especialidad',
    address: {
      street: 'Av. Presidente Masaryk 456',
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'México',
      zipCode: '11560',
    },
    phone: '+52 55 2345 6789',
    email: 'info@centromedicopolanco.com',
    website: 'https://centromedicopolanco.com',
    operatingHours: {
      monday: { open: '07:00', close: '21:00' },
      tuesday: { open: '07:00', close: '21:00' },
      wednesday: { open: '07:00', close: '21:00' },
      thursday: { open: '07:00', close: '21:00' },
      friday: { open: '07:00', close: '21:00' },
      saturday: { open: '08:00', close: '15:00' },
      sunday: { open: '08:00', close: '15:00' },
    },
    services: ['Consultas', 'Laboratorio', 'Rayos X', 'Resonancia Magnética'],
    specialties: ['Cardiología', 'Neurología', 'Ortopedia'],
    facilities: ['Estacionamiento', 'Cafetería', 'Sala de espera VIP'],
    rating: 4.8,
    reviews: 200,
    images: ['clinic3.jpg', 'clinic4.jpg'],
    insuranceAccepted: ['Seguros Monterrey', 'GNP', 'AXA', 'Mapfre'],
    languages: ['Español', 'Inglés', 'Francés'],
    isVerified: true,
    location: {
      latitude: 19.4285,
      longitude: -99.1977,
    },
    emergencyServices: true,
    parkingAvailable: true,
    wheelchairAccessible: true,
  },
  {
    id: 3,
    name: 'Hospital Santa Fe',
    description: 'Hospital de especialidades médicas',
    address: {
      street: 'Av. Carlos Graef Fernández 154',
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'México',
      zipCode: '05300',
    },
    phone: '+52 55 3456 7890',
    email: 'contacto@hospitalsantafe.com',
    website: 'https://hospitalsantafe.com',
    operatingHours: {
      monday: { open: '24/7', close: '24/7' },
      tuesday: { open: '24/7', close: '24/7' },
      wednesday: { open: '24/7', close: '24/7' },
      thursday: { open: '24/7', close: '24/7' },
      friday: { open: '24/7', close: '24/7' },
      saturday: { open: '24/7', close: '24/7' },
      sunday: { open: '24/7', close: '24/7' },
    },
    services: ['Urgencias', 'Cirugía', 'Terapia Intensiva', 'Laboratorio'],
    specialties: ['Traumatología', 'Neurocirugía', 'Cardiología'],
    facilities: ['Helipuerto', 'Estacionamiento', 'Cafetería'],
    rating: 4.9,
    reviews: 300,
    images: ['clinic5.jpg', 'clinic6.jpg'],
    insuranceAccepted: ['Seguros Monterrey', 'GNP', 'AXA', 'Mapfre', 'Allianz'],
    languages: ['Español', 'Inglés', 'Francés', 'Alemán'],
    isVerified: true,
    location: {
      latitude: 19.3592,
      longitude: -99.2593,
    },
    emergencyServices: true,
    parkingAvailable: true,
    wheelchairAccessible: true,
  },
]; 