import { Module } from '@nestjs/common';
import { DoctorsModule } from './doctors/doctors.module';
import { ClinicsModule } from './clinics/clinics.module';
import { MedicalServicesModule } from './medical-services/medical-services.module';
import { PatientsModule } from './patients/patients.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DoctorsModule,
    ClinicsModule,
    MedicalServicesModule,
    PatientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
