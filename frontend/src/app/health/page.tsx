'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DoctorsService } from '@/services/doctors.service';
import { PatientsService } from '@/services/patients.service';
import { PatientMedicalServicesService } from '@/services/patient-medical-services.service';
import { Doctor, Patient, PatientMedicalService, PatientMedicalServiceStatus } from '@/types';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';

// Mock data for demonstration purposes - we'll keep these for now as the backend
// might not have all the data structures we need for this page
const mockLabTests = [
  { id: 1, name: 'Complete Blood Count (CBC)', date: '2023-10-15', status: 'Completed', result: 'Normal' },
  { id: 2, name: 'Lipid Panel', date: '2023-10-15', status: 'Completed', result: 'Elevated Cholesterol' },
  { id: 3, name: 'Glucose Test', date: '2023-09-01', status: 'Completed', result: 'Normal' },
];

const mockDocuments = [
  { id: 1, name: 'Medical History Summary', date: '2023-10-15', type: 'PDF' },
  { id: 2, name: 'Vaccination Record', date: '2023-09-10', type: 'PDF' },
  { id: 3, name: 'Prescription - Atorvastatin', date: '2023-09-05', type: 'PDF' },
  { id: 4, name: 'Radiology Report - Chest X-Ray', date: '2023-07-22', type: 'PDF' },
];

export default function HealthPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patientServices, setPatientServices] = useState<PatientMedicalService[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);

  // For demo purposes, we'll use a fixed patient ID
  const patientId = 1;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch doctors
        const doctorsData = await DoctorsService.getAll();
        setDoctors(doctorsData);
        
        // Fetch patient data
        const patientData = await PatientsService.getById(patientId);
        setPatient(patientData);
        
        // Fetch patient medical services
        const servicesData = await PatientMedicalServicesService.getAll();
        const patientServicesData = servicesData.filter(service => service.patientId === patientId);
        setPatientServices(patientServicesData);
      } catch (err) {
        console.error('Error fetching health data:', err);
        setError('Failed to load health data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // For demo purposes, we'll create mock appointments and visits based on the patient services
  // In a real app, these would come from the backend with proper scheduling information
  const mockAppointmentData = [
    { serviceId: 1, doctorId: 1, date: '2025-06-01', time: '9:00 AM' },
    { serviceId: 2, doctorId: 2, date: '2025-06-15', time: '2:30 PM' }
  ];
  
  const mockVisitData = [
    { serviceId: 3, doctorId: 3, date: '2025-04-10', time: '11:00 AM', notes: 'Regular checkup. Blood pressure normal.' },
    { serviceId: 4, doctorId: 1, date: '2025-03-22', time: '3:15 PM', notes: 'Follow-up visit. Patient reports improvement in symptoms.' }
  ];

  // Convert patient services to appointments using mock data
  const appointments = patientServices
    .filter(service => service.status === PatientMedicalServiceStatus.SCHEDULED)
    .map(service => {
      const mockData = mockAppointmentData.find(m => m.serviceId === service.medicalServiceId) || 
                      { doctorId: 1, date: '2025-06-01', time: '9:00 AM' };
      return {
        id: service.id,
        provider: doctors.find(d => d.id === mockData.doctorId)?.firstName + ' ' + 
                 doctors.find(d => d.id === mockData.doctorId)?.lastName || 'Unknown Doctor',
        specialty: doctors.find(d => d.id === mockData.doctorId)?.specialization || 'Unknown Specialty',
        date: mockData.date,
        time: mockData.time,
        status: 'Scheduled'
      };
    });

  // Convert patient services to visits using mock data
  const visits = patientServices
    .filter(service => service.status === PatientMedicalServiceStatus.COMPLETED)
    .map(service => {
      const mockData = mockVisitData.find(m => m.serviceId === service.medicalServiceId) || 
                      { doctorId: 1, date: '2025-04-10', time: '11:00 AM', notes: 'Regular checkup.' };
      return {
        id: service.id,
        provider: doctors.find(d => d.id === mockData.doctorId)?.firstName + ' ' + 
                 doctors.find(d => d.id === mockData.doctorId)?.lastName || 'Unknown Doctor',
        specialty: doctors.find(d => d.id === mockData.doctorId)?.specialization || 'Unknown Specialty',
        date: mockData.date,
        time: mockData.time,
        notes: service.notes || mockData.notes || 'No notes available'
      };
    });

  // Convert doctors to providers
  const providers = doctors.map(doctor => ({
    id: doctor.id,
    name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
    specialty: doctor.specialization,
    clinic: doctor.clinicId ? `Clinic #${doctor.clinicId}` : 'Unknown Clinic',
    phone: doctor.phone || 'Not available'
  }));

  if (loading) {
    return <LoadingState message="Loading your health dashboard..." />;
  }

  if (error) {
    return <ErrorState title="Error" message={error} actionText="Try Again" actionLink="/health" />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Health Dashboard</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <p className="text-lg">
          Welcome {patient?.firstName} to your personal health dashboard. Here you can access your medical records, track appointments, and manage your healthcare information.
        </p>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="btn btn-primary p-4 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">📋</span>
          <span>Schedule Appointment</span>
        </button>
        <button className="btn btn-primary p-4 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">💊</span>
          <span>Request Prescription</span>
        </button>
        <button className="btn btn-primary p-4 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">📄</span>
          <span>View Test Results</span>
        </button>
        <button className="btn btn-primary p-4 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">📞</span>
          <span>Contact Provider</span>
        </button>
      </div>
      
      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Upcoming Appointments</h2>
          <button className="bg-white text-blue-600 px-4 py-1 rounded text-sm font-medium">View All</button>
        </div>
        <div className="p-4">
          {appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.provider}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.specialty}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(appointment.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 space-x-2">
                        <button className="hover:underline">Reschedule</button>
                        <button className="hover:underline">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No upcoming appointments scheduled.
            </div>
          )}
        </div>
      </div>
      
      {/* Recent Lab Tests */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Recent Lab Tests</h2>
          <button className="bg-white text-blue-600 px-4 py-1 rounded text-sm font-medium">View All</button>
        </div>
        <div className="p-4">
          {mockLabTests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockLabTests.map((test) => (
                    <tr key={test.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{test.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(test.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {test.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{test.result}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        <button className="hover:underline">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No lab tests available.
            </div>
          )}
        </div>
      </div>
      
      {/* Recent Visits */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Recent Visits</h2>
          <button className="bg-white text-blue-600 px-4 py-1 rounded text-sm font-medium">View All</button>
        </div>
        <div className="p-4">
          {visits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visits.map((visit) => (
                <div key={visit.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">{visit.provider}</h3>
                      <p className="text-sm text-gray-500">{visit.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{new Date(visit.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">{visit.time}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{visit.notes}</p>
                  <div className="mt-3 flex justify-end">
                    <button className="text-blue-600 hover:underline text-sm">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No recent visits recorded.
            </div>
          )}
        </div>
      </div>
      
      {/* Medical Documents */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Medical Documents</h2>
          <button className="bg-white text-blue-600 px-4 py-1 rounded text-sm font-medium">View All</button>
        </div>
        <div className="p-4">
          {mockDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockDocuments.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4 flex flex-col">
                  <div className="flex-1">
                    <div className="bg-gray-100 h-24 mb-3 flex items-center justify-center rounded">
                      <span className="text-gray-500 text-2xl">📄</span>
                    </div>
                    <h3 className="font-medium truncate" title={doc.name}>{doc.name}</h3>
                    <p className="text-sm text-gray-500">{new Date(doc.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-400">{doc.type}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t flex justify-between">
                    <button className="text-blue-600 hover:underline text-sm">View</button>
                    <button className="text-blue-600 hover:underline text-sm">Download</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No documents available.
            </div>
          )}
        </div>
      </div>
      
      {/* My Healthcare Providers */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">My Healthcare Providers</h2>
          <button className="bg-white text-blue-600 px-4 py-1 rounded text-sm font-medium">View All</button>
        </div>
        <div className="p-4">
          {providers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {providers.map((provider) => (
                <div key={provider.id} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">
                        {provider.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold">{provider.name}</h3>
                      <p className="text-sm text-gray-500">{provider.specialty}</p>
                      <p className="text-sm text-gray-500">{provider.clinic}</p>
                      <p className="text-sm text-gray-500">{provider.phone}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t flex justify-between">
                    <button className="text-blue-600 hover:underline text-sm">Schedule Appointment</button>
                    <button className="text-blue-600 hover:underline text-sm">Message</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No healthcare providers assigned.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
