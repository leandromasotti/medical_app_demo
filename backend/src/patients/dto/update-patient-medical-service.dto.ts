import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientMedicalServiceDto } from './create-patient-medical-service.dto';

export class UpdatePatientMedicalServiceDto extends PartialType(CreatePatientMedicalServiceDto) {} 