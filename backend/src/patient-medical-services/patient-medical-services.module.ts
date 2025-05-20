import { Module } from '@nestjs/common';
import { PatientMedicalServicesService } from './patient-medical-services.service';
import { PatientMedicalServicesController } from './patient-medical-services.controller';

@Module({
  controllers: [PatientMedicalServicesController],
  providers: [PatientMedicalServicesService],
})
export class PatientMedicalServicesModule {} 