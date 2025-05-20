import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './interfaces/patient.interface';
import { PatientMedicalService, MedicalServiceStatus } from './interfaces/patient-medical-service.interface';
import { CreatePatientMedicalServiceDto } from './dto/create-patient-medical-service.dto';
import { UpdatePatientMedicalServiceDto } from './dto/update-patient-medical-service.dto';

@Injectable()
export class PatientsService {
  private readonly patients: Patient[] = [
    {
      id: 1,
      firstName: 'María',
      lastName: 'González',
      email: 'maria.gonzalez@email.com',
      phone: '+506 7777-7777',
      dateOfBirth: '1985-05-15',
      gender: 'Femenino',
      address: {
        street: 'Calle Principal 123',
        city: 'San José',
        state: 'San José',
        country: 'Costa Rica',
        zipCode: '10101'
      },
      medicalHistory: {
        conditions: ['Hipertensión', 'Diabetes tipo 2'],
        allergies: ['Penicilina'],
        medications: ['Metformina', 'Losartán'],
        surgeries: ['Apendicectomía']
      },
      insurance: {
        provider: 'INS',
        policyNumber: 'INS123456',
        groupNumber: 'GRP789',
        coverageDetails: 'Cobertura completa'
      },
      emergencyContact: {
        name: 'Juan González',
        relationship: 'Esposo',
        phone: '+506 8888-8888'
      },
      bloodType: 'O+',
      height: 165,
      weight: 65,
      lastCheckup: '2024-01-15',
      preferredLanguage: 'Español',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: 2,
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+506 6666-6666',
      dateOfBirth: '1990-08-20',
      gender: 'Masculino',
      address: {
        street: 'Avenida Central 456',
        city: 'Heredia',
        state: 'Heredia',
        country: 'Costa Rica',
        zipCode: '40101'
      },
      medicalHistory: {
        conditions: ['Asma'],
        allergies: ['Polvo', 'Polen'],
        medications: ['Salbutamol'],
        surgeries: []
      },
      insurance: {
        provider: 'Medismart',
        policyNumber: 'MED789012',
        groupNumber: 'GRP456',
        coverageDetails: 'Cobertura básica'
      },
      emergencyContact: {
        name: 'Ana Rodríguez',
        relationship: 'Hermana',
        phone: '+506 9999-9999'
      },
      bloodType: 'A+',
      height: 180,
      weight: 75,
      lastCheckup: '2024-02-01',
      preferredLanguage: 'Español',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-02-01T00:00:00Z'
    }
  ];

  private readonly patientMedicalServices: PatientMedicalService[] = [
    {
      id: 1,
      patientId: 1,
      medicalServiceId: 1,
      status: MedicalServiceStatus.SCHEDULED,
      scheduledDate: '2024-03-20T10:00:00Z',
      clinicId: 1,
      price: 50000,
      paymentStatus: 'PENDING',
      followUpRequired: false,
      createdAt: '2024-03-15T00:00:00Z',
      updatedAt: '2024-03-15T00:00:00Z'
    },
    {
      id: 2,
      patientId: 1,
      medicalServiceId: 2,
      status: MedicalServiceStatus.COMPLETED,
      scheduledDate: '2024-03-10T14:00:00Z',
      actualDate: '2024-03-10T14:30:00Z',
      clinicId: 2,
      doctorId: 1,
      price: 75000,
      paymentStatus: 'PAID',
      paymentAmount: 75000,
      insuranceCoverage: {
        covered: true,
        coverageAmount: 60000,
        policyNumber: 'INS123456'
      },
      followUpRequired: true,
      followUpDate: '2024-04-10T14:00:00Z',
      createdAt: '2024-03-01T00:00:00Z',
      updatedAt: '2024-03-10T15:00:00Z'
    }
  ];

  findAll(): Promise<Patient[]> {
    return Promise.resolve(this.patients);
  }

  findOne(id: number): Promise<Patient | undefined> {
    const patient = this.patients.find(patient => patient.id === id);
    return Promise.resolve(patient);
  }

  create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const newPatient: Patient = {
      id: this.patients.length + 1,
      ...createPatientDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastCheckup: new Date().toISOString()
    };
    this.patients.push(newPatient);
    return Promise.resolve(newPatient);
  }

  update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient | undefined> {
    const patientIndex = this.patients.findIndex(patient => patient.id === id);
    if (patientIndex === -1) {
      return Promise.resolve(undefined);
    }
    
    const updatedPatient = {
      ...this.patients[patientIndex],
      ...updatePatientDto,
      updatedAt: new Date().toISOString()
    };
    
    this.patients[patientIndex] = updatedPatient;
    return Promise.resolve(updatedPatient);
  }

  remove(id: number): Promise<boolean> {
    const patientIndex = this.patients.findIndex(patient => patient.id === id);
    if (patientIndex === -1) {
      return Promise.resolve(false);
    }
    
    this.patients.splice(patientIndex, 1);
    return Promise.resolve(true);
  }

  findAllMedicalServices(patientId: number): Promise<PatientMedicalService[]> {
    return Promise.resolve(this.patientMedicalServices.filter(service => service.patientId === patientId));
  }

  findOneMedicalService(patientId: number, serviceId: number): Promise<PatientMedicalService | undefined> {
    const service = this.patientMedicalServices.find(
      service => service.patientId === patientId && service.id === serviceId
    );
    return Promise.resolve(service);
  }

  createMedicalService(createDto: CreatePatientMedicalServiceDto): Promise<PatientMedicalService> {
    const newService: PatientMedicalService = {
      id: this.patientMedicalServices.length + 1,
      ...createDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.patientMedicalServices.push(newService);
    return Promise.resolve(newService);
  }

  updateMedicalService(
    patientId: number,
    serviceId: number,
    updateDto: UpdatePatientMedicalServiceDto
  ): Promise<PatientMedicalService | undefined> {
    const serviceIndex = this.patientMedicalServices.findIndex(
      service => service.patientId === patientId && service.id === serviceId
    );
    
    if (serviceIndex === -1) {
      return Promise.resolve(undefined);
    }
    
    const updatedService = {
      ...this.patientMedicalServices[serviceIndex],
      ...updateDto,
      updatedAt: new Date().toISOString()
    };
    
    this.patientMedicalServices[serviceIndex] = updatedService;
    return Promise.resolve(updatedService);
  }

  removeMedicalService(patientId: number, serviceId: number): Promise<boolean> {
    const serviceIndex = this.patientMedicalServices.findIndex(
      service => service.patientId === patientId && service.id === serviceId
    );
    
    if (serviceIndex === -1) {
      return Promise.resolve(false);
    }
    
    this.patientMedicalServices.splice(serviceIndex, 1);
    return Promise.resolve(true);
  }
} 