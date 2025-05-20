import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PatientMedicalServiceStatus } from '../interfaces/patient-medical-service.interface';

export class UpdatePatientMedicalServiceDto {
  @IsEnum(PatientMedicalServiceStatus)
  @IsOptional()
  status?: PatientMedicalServiceStatus;

  @IsString()
  @IsOptional()
  notes?: string;
} 