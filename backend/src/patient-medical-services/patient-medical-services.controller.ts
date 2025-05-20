import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PatientMedicalServicesService } from './patient-medical-services.service';
import { CreatePatientMedicalServiceDto } from './dto/create-patient-medical-service.dto';
import { UpdatePatientMedicalServiceDto } from './dto/update-patient-medical-service.dto';
import { PatientMedicalService } from './interfaces/patient-medical-service.interface';

@Controller('patient-medical-services')
export class PatientMedicalServicesController {
  constructor(private readonly patientMedicalServicesService: PatientMedicalServicesService) {}

  @Post()
  create(@Body() createPatientMedicalServiceDto: CreatePatientMedicalServiceDto): Promise<PatientMedicalService> {
    return this.patientMedicalServicesService.create(createPatientMedicalServiceDto);
  }

  @Get()
  findAll(): Promise<PatientMedicalService[]> {
    return this.patientMedicalServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PatientMedicalService> {
    return this.patientMedicalServicesService.findOne(id);
  }

  @Get('patient/:patientId')
  findByPatientId(@Param('patientId', ParseIntPipe) patientId: number): Promise<PatientMedicalService[]> {
    return this.patientMedicalServicesService.findByPatientId(patientId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientMedicalServiceDto: UpdatePatientMedicalServiceDto,
  ): Promise<PatientMedicalService> {
    return this.patientMedicalServicesService.update(id, updatePatientMedicalServiceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.patientMedicalServicesService.remove(id);
  }
} 