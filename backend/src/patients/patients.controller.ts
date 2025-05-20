import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreatePatientMedicalServiceDto } from './dto/create-patient-medical-service.dto';
import { UpdatePatientMedicalServiceDto } from './dto/update-patient-medical-service.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }

  // Medical Services endpoints
  @Get(':patientId/medical-services')
  findAllMedicalServices(@Param('patientId') patientId: string) {
    return this.patientsService.findAllMedicalServices(+patientId);
  }

  @Get(':patientId/medical-services/:serviceId')
  findOneMedicalService(
    @Param('patientId') patientId: string,
    @Param('serviceId') serviceId: string
  ) {
    return this.patientsService.findOneMedicalService(+patientId, +serviceId);
  }

  @Post(':patientId/medical-services')
  createMedicalService(
    @Param('patientId') patientId: string,
    @Body() createDto: CreatePatientMedicalServiceDto
  ) {
    return this.patientsService.createMedicalService({
      ...createDto,
      patientId: +patientId
    });
  }

  @Patch(':patientId/medical-services/:serviceId')
  updateMedicalService(
    @Param('patientId') patientId: string,
    @Param('serviceId') serviceId: string,
    @Body() updateDto: UpdatePatientMedicalServiceDto
  ) {
    return this.patientsService.updateMedicalService(+patientId, +serviceId, updateDto);
  }

  @Delete(':patientId/medical-services/:serviceId')
  removeMedicalService(
    @Param('patientId') patientId: string,
    @Param('serviceId') serviceId: string
  ) {
    return this.patientsService.removeMedicalService(+patientId, +serviceId);
  }
} 