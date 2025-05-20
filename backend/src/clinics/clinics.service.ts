import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Clinic } from './interfaces/clinic.interface';

@Injectable()
export class ClinicsService {
  private readonly clinics: Clinic[] = [
    {
      id: 1,
      name: 'Centro Médico San José',
      description: 'Centro médico integral con servicios de alta calidad y tecnología de punta.',
      address: {
        street: 'Avenida Central 123',
        city: 'San José',
        state: 'San José',
        country: 'Costa Rica',
        zipCode: '10101'
      },
      phone: '+506 2222-2222',
      email: 'info@centromedicosj.com',
      website: 'www.centromedicosj.com',
      operatingHours: {
        'Lunes': { open: '7:00 AM', close: '7:00 PM' },
        'Martes': { open: '7:00 AM', close: '7:00 PM' },
        'Miércoles': { open: '7:00 AM', close: '7:00 PM' },
        'Jueves': { open: '7:00 AM', close: '7:00 PM' },
        'Viernes': { open: '7:00 AM', close: '7:00 PM' },
        'Sábado': { open: '8:00 AM', close: '2:00 PM' },
        'Domingo': { open: '9:00 AM', close: '1:00 PM' }
      },
      services: [
        'Consultas médicas',
        'Laboratorio clínico',
        'Radiología',
        'Farmacia',
        'Fisioterapia'
      ],
      specialties: [
        'Cardiología',
        'Dermatología',
        'Ginecología',
        'Pediatría',
        'Ortopedia'
      ],
      facilities: [
        'Estacionamiento',
        'Acceso para discapacitados',
        'Cafetería',
        'Sala de espera climatizada',
        'WiFi gratuito'
      ],
      rating: 4.8,
      reviews: 245,
      images: [
        '/images/clinics/clinic1-1.jpg',
        '/images/clinics/clinic1-2.jpg',
        '/images/clinics/clinic1-3.jpg'
      ],
      insuranceAccepted: [
        'INS',
        'Medismart',
        'Blue Cross',
        'Metropolitan'
      ],
      languages: ['Español', 'Inglés'],
      isVerified: true,
      location: {
        latitude: 9.9281,
        longitude: -84.0907
      },
      emergencyServices: true,
      parkingAvailable: true,
      wheelchairAccessible: true
    },
    {
      id: 2,
      name: 'Clínica Dental Sonrisa',
      description: 'Clínica dental especializada en todos los tratamientos odontológicos.',
      address: {
        street: 'Calle Principal 456',
        city: 'Heredia',
        state: 'Heredia',
        country: 'Costa Rica',
        zipCode: '40101'
      },
      phone: '+506 3333-3333',
      email: 'info@clinicasonrisa.com',
      website: 'www.clinicasonrisa.com',
      operatingHours: {
        'Lunes': { open: '8:00 AM', close: '6:00 PM' },
        'Martes': { open: '8:00 AM', close: '6:00 PM' },
        'Miércoles': { open: '8:00 AM', close: '6:00 PM' },
        'Jueves': { open: '8:00 AM', close: '6:00 PM' },
        'Viernes': { open: '8:00 AM', close: '6:00 PM' },
        'Sábado': { open: '9:00 AM', close: '1:00 PM' }
      },
      services: [
        'Limpieza dental',
        'Blanqueamiento',
        'Ortodoncia',
        'Implantes dentales',
        'Endodoncia'
      ],
      specialties: [
        'Odontología general',
        'Ortodoncia',
        'Periodoncia',
        'Endodoncia',
        'Odontopediatría'
      ],
      facilities: [
        'Estacionamiento',
        'Sala de espera',
        'WiFi gratuito',
        'TV en sala de espera'
      ],
      rating: 4.9,
      reviews: 178,
      images: [
        '/images/clinics/clinic2-1.jpg',
        '/images/clinics/clinic2-2.jpg'
      ],
      insuranceAccepted: [
        'INS',
        'Medismart',
        'Blue Cross'
      ],
      languages: ['Español', 'Inglés'],
      isVerified: true,
      location: {
        latitude: 9.9984,
        longitude: -84.1165
      },
      emergencyServices: true,
      parkingAvailable: true,
      wheelchairAccessible: true
    }
  ];

  findAll(): Promise<Clinic[]> {
    return Promise.resolve(this.clinics);
  }

  findOne(id: number): Promise<Clinic | undefined> {
    const clinic = this.clinics.find(clinic => clinic.id === id);
    return Promise.resolve(clinic);
  }

  create(createClinicDto: CreateClinicDto): Promise<Clinic> {
    const newClinic: Clinic = {
      id: this.clinics.length + 1,
      ...createClinicDto,
      rating: 0,
      reviews: 0,
    };
    this.clinics.push(newClinic);
    return Promise.resolve(newClinic);
  }

  update(id: number, updateClinicDto: UpdateClinicDto): Promise<Clinic | undefined> {
    const clinicIndex = this.clinics.findIndex(clinic => clinic.id === id);
    if (clinicIndex === -1) {
      return Promise.resolve(undefined);
    }
    
    const updatedClinic = {
      ...this.clinics[clinicIndex],
      ...updateClinicDto,
    };
    
    this.clinics[clinicIndex] = updatedClinic;
    return Promise.resolve(updatedClinic);
  }

  remove(id: number): Promise<boolean> {
    const clinicIndex = this.clinics.findIndex(clinic => clinic.id === id);
    if (clinicIndex === -1) {
      return Promise.resolve(false);
    }
    
    this.clinics.splice(clinicIndex, 1);
    return Promise.resolve(true);
  }
} 