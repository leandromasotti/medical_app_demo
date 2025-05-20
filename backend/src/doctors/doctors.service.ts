import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './interfaces/doctor.interface';

@Injectable()
export class DoctorsService {
  private readonly doctors: Doctor[] = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Pérez',
      specialization: 'Cardiología',
      licenseNumber: 'CR12345',
      email: 'juan.perez@medical.com',
      phone: '+506 8888-8888',
      clinicId: 1,
      yearsOfExperience: 15,
      education: [
        'Universidad de Costa Rica - Medicina',
        'Universidad de Harvard - Especialización en Cardiología'
      ],
      languages: ['Español', 'Inglés'],
      rating: 4.9,
      reviews: 156,
      image: '/images/doctors/doctor1.jpg',
      availability: {
        days: ['Lunes', 'Miércoles', 'Viernes'],
        hours: '8:00 AM - 4:00 PM'
      },
      bio: 'Cardiólogo con más de 15 años de experiencia en el tratamiento de enfermedades cardíacas.',
      certifications: [
        'Board Certified in Cardiology',
        'Advanced Cardiac Life Support'
      ],
      isAvailable: true
    },
    {
      id: 2,
      firstName: 'María',
      lastName: 'Rodríguez',
      specialization: 'Dermatología',
      licenseNumber: 'CR67890',
      email: 'maria.rodriguez@medical.com',
      phone: '+506 7777-7777',
      clinicId: 1,
      yearsOfExperience: 10,
      education: [
        'Universidad Nacional - Medicina',
        'Universidad de Barcelona - Especialización en Dermatología'
      ],
      languages: ['Español', 'Inglés', 'Francés'],
      rating: 4.8,
      reviews: 98,
      image: '/images/doctors/doctor2.jpg',
      availability: {
        days: ['Martes', 'Jueves', 'Sábado'],
        hours: '9:00 AM - 5:00 PM'
      },
      bio: 'Dermatóloga especializada en el tratamiento de enfermedades de la piel y procedimientos cosméticos.',
      certifications: [
        'Board Certified in Dermatology',
        'Cosmetic Dermatology Certification'
      ],
      isAvailable: true
    }
  ];

  findAll(): Promise<Doctor[]> {
    return Promise.resolve(this.doctors);
  }

  findOne(id: number): Promise<Doctor | undefined> {
    const doctor = this.doctors.find(doctor => doctor.id === id);
    return Promise.resolve(doctor);
  }

  create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const newDoctor: Doctor = {
      id: this.doctors.length + 1,
      ...createDoctorDto,
      rating: 0,
      reviews: 0,
    };
    this.doctors.push(newDoctor);
    return Promise.resolve(newDoctor);
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor | undefined> {
    const doctorIndex = this.doctors.findIndex(doctor => doctor.id === id);
    if (doctorIndex === -1) {
      return Promise.resolve(undefined);
    }
    
    const updatedDoctor = {
      ...this.doctors[doctorIndex],
      ...updateDoctorDto,
    };
    
    this.doctors[doctorIndex] = updatedDoctor;
    return Promise.resolve(updatedDoctor);
  }

  remove(id: number): Promise<boolean> {
    const doctorIndex = this.doctors.findIndex(doctor => doctor.id === id);
    if (doctorIndex === -1) {
      return Promise.resolve(false);
    }
    
    this.doctors.splice(doctorIndex, 1);
    return Promise.resolve(true);
  }
} 