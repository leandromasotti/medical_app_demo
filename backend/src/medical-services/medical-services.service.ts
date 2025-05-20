import { Injectable } from '@nestjs/common';
import { CreateMedicalServiceDto } from './dto/create-medical-service.dto';
import { UpdateMedicalServiceDto } from './dto/update-medical-service.dto';
import { MedicalService } from './interfaces/medical-service.interface';

@Injectable()
export class MedicalServicesService {
  private readonly medicalServices: MedicalService[] = [
    {
      id: 1,
      name: 'Consulta Cardiológica',
      description: 'Evaluación completa del sistema cardiovascular por especialistas certificados.',
      longDescription: `
        Nuestra consulta cardiológica ofrece una evaluación exhaustiva de su salud cardiovascular, incluyendo:
        
        - Historia clínica detallada
        - Examen físico completo
        - Electrocardiograma
        - Evaluación de factores de riesgo
        - Recomendaciones personalizadas
        
        Nuestros cardiólogos utilizan tecnología de última generación para proporcionar diagnósticos precisos y planes de tratamiento efectivos.
      `,
      category: 'Cardiología',
      price: 150,
      duration: '1 hora',
      clinicId: 1,
      doctorIds: [1],
      requirements: [
        'Ayuno de 8 horas',
        'Traer estudios previos si los tiene',
        'Lista de medicamentos actuales'
      ],
      preparation: [
        'No consumir cafeína 24 horas antes',
        'Vestir ropa cómoda',
        'Llegar 15 minutos antes'
      ],
      aftercare: [
        'Reposo relativo',
        'Seguir indicaciones del médico',
        'Programar seguimiento según recomendación'
      ],
      risks: [
        'Reacciones alérgicas a medicamentos',
        'Molestias durante el procedimiento'
      ],
      benefits: [
        'Diagnóstico temprano de problemas cardíacos',
        'Prevención de enfermedades cardiovasculares',
        'Plan de tratamiento personalizado'
      ],
      contraindications: [
        'Alergias a medicamentos específicos',
        'Condiciones médicas no controladas'
      ],
      images: [
        '/images/services/cardiology-1.jpg',
        '/images/services/cardiology-2.jpg'
      ],
      rating: 4.9,
      reviews: 234,
      isAvailable: true,
      insuranceCoverage: {
        covered: true,
        coveragePercentage: 80,
        insuranceProviders: ['INS', 'Medismart', 'Blue Cross']
      },
      specializations: [
        'Cardiología general',
        'Electrofisiología',
        'Cardiología preventiva'
      ],
      equipment: [
        'Electrocardiógrafo digital',
        'Monitor de presión arterial',
        'Ecocardiógrafo'
      ],
      certifications: [
        'Certificación en Cardiología',
        'Certificación en Reanimación Cardiopulmonar'
      ],
      location: {
        latitude: 9.9281,
        longitude: -84.0907
      }
    },
    {
      id: 2,
      name: 'Limpieza Dental Profesional',
      description: 'Limpieza dental completa realizada por higienistas certificados.',
      longDescription: `
        Nuestro servicio de limpieza dental profesional incluye:
        
        - Evaluación inicial de la salud bucal
        - Eliminación de placa y sarro
        - Pulido dental
        - Aplicación de flúor
        - Recomendaciones de higiene bucal
        
        Nuestros higienistas dentales utilizan técnicas y equipos modernos para garantizar una limpieza profunda y efectiva.
      `,
      category: 'Odontología',
      price: 80,
      duration: '45 minutos',
      clinicId: 2,
      doctorIds: [2],
      requirements: [
        'Cepillado dental antes de la cita',
        'No comer 1 hora antes'
      ],
      preparation: [
        'Cepillado dental',
        'Uso de hilo dental'
      ],
      aftercare: [
        'Evitar alimentos y bebidas colorantes por 24 horas',
        'Mantener rutina de higiene bucal'
      ],
      risks: [
        'Sensibilidad dental temporal',
        'Molestias en encías sensibles'
      ],
      benefits: [
        'Prevención de caries',
        'Eliminación de manchas',
        'Frescura bucal'
      ],
      contraindications: [
        'Enfermedades periodontales activas',
        'Infecciones bucales'
      ],
      images: [
        '/images/services/dental-1.jpg',
        '/images/services/dental-2.jpg'
      ],
      rating: 4.8,
      reviews: 189,
      isAvailable: true,
      insuranceCoverage: {
        covered: true,
        coveragePercentage: 70,
        insuranceProviders: ['INS', 'Medismart']
      },
      specializations: [
        'Higiene dental',
        'Prevención dental',
        'Educación en salud bucal'
      ],
      equipment: [
        'Equipo de limpieza ultrasónica',
        'Pulidor dental',
        'Aplicador de flúor'
      ],
      certifications: [
        'Certificación en Higiene Dental',
        'Certificación en Prevención Dental'
      ],
      location: {
        latitude: 9.9984,
        longitude: -84.1165
      }
    }
  ];

  findAll(): Promise<MedicalService[]> {
    return Promise.resolve(this.medicalServices);
  }

  findOne(id: number): Promise<MedicalService | undefined> {
    const service = this.medicalServices.find(service => service.id === id);
    return Promise.resolve(service);
  }

  create(createMedicalServiceDto: CreateMedicalServiceDto): Promise<MedicalService> {
    const newService: MedicalService = {
      id: this.medicalServices.length + 1,
      ...createMedicalServiceDto,
      rating: 0,
      reviews: 0,
    };
    this.medicalServices.push(newService);
    return Promise.resolve(newService);
  }

  update(id: number, updateMedicalServiceDto: UpdateMedicalServiceDto): Promise<MedicalService | undefined> {
    const serviceIndex = this.medicalServices.findIndex(service => service.id === id);
    if (serviceIndex === -1) {
      return Promise.resolve(undefined);
    }
    
    const updatedService = {
      ...this.medicalServices[serviceIndex],
      ...updateMedicalServiceDto,
    };
    
    this.medicalServices[serviceIndex] = updatedService;
    return Promise.resolve(updatedService);
  }

  remove(id: number): Promise<boolean> {
    const serviceIndex = this.medicalServices.findIndex(service => service.id === id);
    if (serviceIndex === -1) {
      return Promise.resolve(false);
    }
    
    this.medicalServices.splice(serviceIndex, 1);
    return Promise.resolve(true);
  }
} 