import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientMedicalServiceDto } from './dto/create-patient-medical-service.dto';
import { UpdatePatientMedicalServiceDto } from './dto/update-patient-medical-service.dto';
import { PatientMedicalService, PatientMedicalServiceStatus } from './interfaces/patient-medical-service.interface';

@Injectable()
export class PatientMedicalServicesService {
  // In-memory database for simplicity
  private readonly patientMedicalServices: PatientMedicalService[] = [
    {
      id: 1,
      patientId: 1,
      medicalServiceId: 1,
      status: PatientMedicalServiceStatus.SCHEDULED,
      notes: 'Initial consultation',
      createdAt: new Date('2025-05-01'),
      updatedAt: new Date('2025-05-01')
    },
    {
      id: 2,
      patientId: 1,
      medicalServiceId: 2,
      status: PatientMedicalServiceStatus.COMPLETED,
      notes: 'Follow-up appointment completed successfully',
      createdAt: new Date('2025-04-15'),
      updatedAt: new Date('2025-04-20')
    },
    {
      id: 3,
      patientId: 2,
      medicalServiceId: 3,
      status: PatientMedicalServiceStatus.SCHEDULED,
      notes: 'Annual checkup',
      createdAt: new Date('2025-05-10'),
      updatedAt: new Date('2025-05-10')
    },
    {
      id: 4,
      patientId: 2,
      medicalServiceId: 4,
      status: PatientMedicalServiceStatus.CANCELLED,
      notes: 'Patient requested cancellation',
      createdAt: new Date('2025-04-01'),
      updatedAt: new Date('2025-04-05')
    }
  ];

  create(createPatientMedicalServiceDto: CreatePatientMedicalServiceDto): Promise<PatientMedicalService> {
    const newPatientMedicalService: PatientMedicalService = {
      id: this.patientMedicalServices.length + 1,
      ...createPatientMedicalServiceDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.patientMedicalServices.push(newPatientMedicalService);
    return Promise.resolve(newPatientMedicalService);
  }

  findAll(): Promise<PatientMedicalService[]> {
    return Promise.resolve(this.patientMedicalServices);
  }

  findOne(id: number): Promise<PatientMedicalService> {
    const patientMedicalService = this.patientMedicalServices.find(service => service.id === id);
    if (!patientMedicalService) {
      throw new NotFoundException(`Patient medical service with ID ${id} not found`);
    }
    return Promise.resolve(patientMedicalService);
  }

  findByPatientId(patientId: number): Promise<PatientMedicalService[]> {
    const services = this.patientMedicalServices.filter(service => service.patientId === patientId);
    return Promise.resolve(services);
  }

  update(id: number, updatePatientMedicalServiceDto: UpdatePatientMedicalServiceDto): Promise<PatientMedicalService> {
    const serviceIndex = this.patientMedicalServices.findIndex(service => service.id === id);
    if (serviceIndex === -1) {
      throw new NotFoundException(`Patient medical service with ID ${id} not found`);
    }

    const updatedService = {
      ...this.patientMedicalServices[serviceIndex],
      ...updatePatientMedicalServiceDto,
      updatedAt: new Date(),
    };

    this.patientMedicalServices[serviceIndex] = updatedService;
    return Promise.resolve(updatedService);
  }

  remove(id: number): Promise<boolean> {
    const serviceIndex = this.patientMedicalServices.findIndex(service => service.id === id);
    if (serviceIndex === -1) {
      throw new NotFoundException(`Patient medical service with ID ${id} not found`);
    }

    this.patientMedicalServices.splice(serviceIndex, 1);
    return Promise.resolve(true);
  }
}
