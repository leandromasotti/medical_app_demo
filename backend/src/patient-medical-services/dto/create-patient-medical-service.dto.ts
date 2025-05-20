import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PatientMedicalServiceStatus } from '../interfaces/patient-medical-service.interface';

export class CreatePatientMedicalServiceDto {
  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsNumber()
  @IsNotEmpty()
  medicalServiceId: number;

  @IsEnum(PatientMedicalServiceStatus)
  @IsNotEmpty()
  status: PatientMedicalServiceStatus;

  @IsString()
  @IsOptional()
  notes?: string;
} 