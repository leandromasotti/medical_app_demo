'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DoctorsService } from '@/services/doctors.service';
import { ClinicsService } from '@/services/clinics.service';
import { Doctor, Clinic } from '@/types';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';

// Type for availability display
interface AvailabilityDisplay {
  day: string;
  hours: string;
}

// Helper function to convert doctor availability to display format
const formatDoctorAvailability = (doctor: Doctor): AvailabilityDisplay[] => {
  if (!doctor.availability || !doctor.availability.days) {
    return [];
  }
  
  return doctor.availability.days.map(day => ({
    day,
    hours: doctor.availability.hours || '9:00 AM - 5:00 PM'
  }));
};

// Helper function to convert clinic operating hours to display format
const formatClinicHours = (clinic: Clinic): AvailabilityDisplay[] => {
  if (!clinic.operatingHours) {
    return [];
  }
  
  return Object.entries(clinic.operatingHours).map(([day, hours]) => ({
    day,
    hours: `${hours.open} - ${hours.close}`
  }));
};

export default function SearchPage() {
  const [searchType, setSearchType] = useState<'doctors' | 'clinics'>('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedItem, setSelectedItem] = useState<Doctor | Clinic | null>(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Type guard functions to check the type of selectedItem
  const isDoctor = (item: Doctor | Clinic | null): item is Doctor => {
    return item !== null && 'specialization' in item;
  };
  
  const isClinic = (item: Doctor | Clinic | null): item is Clinic => {
    return item !== null && 'specialties' in item;
  };

  // Fetch doctors and clinics from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (searchType === 'doctors') {
          const doctorsData = await DoctorsService.getAll();
          setDoctors(doctorsData);
        } else {
          const clinicsData = await ClinicsService.getAll();
          setClinics(clinicsData);
        }
      } catch (err) {
        console.error(`Error fetching ${searchType}:`, err);
        setError(`Failed to load ${searchType}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [searchType]);

  // Get all unique specialties
  const doctorSpecialties = Array.from(new Set(doctors.map(doctor => doctor.specialization)));
  const clinicSpecialties = Array.from(new Set(clinics.flatMap(clinic => clinic.specialties || [])));
  const specialties = searchType === 'doctors' ? doctorSpecialties : clinicSpecialties;

  // Filter results based on search query and selected specialty
  const filteredResults = searchType === 'doctors' 
    ? doctors.filter(doctor => 
        (searchQuery === '' || 
         doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
         doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) || 
         doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedSpecialty === '' || doctor.specialization === selectedSpecialty)
      )
    : clinics.filter(clinic => 
        (searchQuery === '' || 
         clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         (clinic.specialties && clinic.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())))) &&
        (selectedSpecialty === '' || (clinic.specialties && clinic.specialties.includes(selectedSpecialty)))
      );

  const handleScheduleAppointment = () => {
    setShowScheduleForm(true);
    setSelectedItem(null);
  };

  const handleProceedToPayment = () => {
    setShowScheduleForm(false);
    setShowPaymentForm(true);
  };

  const handleCompletePayment = () => {
    alert('Payment successful! Your appointment has been scheduled.');
    setShowPaymentForm(false);
    setAppointmentDate('');
    setAppointmentTime('');
  };

  const handleBackToResults = () => {
    setSelectedItem(null);
    setShowScheduleForm(false);
    setShowPaymentForm(false);
  };

  if (loading) {
    return <LoadingState message={`Loading ${searchType}...`} />;
  }

  if (error) {
    return <ErrorState title="Error" message={error} actionText="Try Again" actionLink="/search" />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Search Medical Services</h1>
      
      {/* Search Type Toggle */}
      <div className="flex space-x-4 mb-6">
        <button 
          className={`px-6 py-2 rounded-full ${searchType === 'doctors' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => {
            setSearchType('doctors');
            setSelectedSpecialty('');
            setSelectedItem(null);
          }}
        >
          Doctors
        </button>
        <button 
          className={`px-6 py-2 rounded-full ${searchType === 'clinics' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => {
            setSearchType('clinics');
            setSelectedSpecialty('');
            setSelectedItem(null);
          }}
        >
          Clinics
        </button>
      </div>
      
      {/* Search and Filter Controls */}
      {!selectedItem && !showScheduleForm && !showPaymentForm && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder={`Search for ${searchType}...`}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
            <select
              id="specialty"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      {/* Search Results */}
      {!selectedItem && !showScheduleForm && !showPaymentForm && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            {filteredResults.length} {searchType} found
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-gray-100 h-40 flex items-center justify-center">
                  <div className="text-gray-400 text-5xl">
                    {searchType === 'doctors' ? '👨‍⚕️' : '🏥'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">
                    {isDoctor(item) 
                      ? `Dr. ${item.firstName} ${item.lastName}` 
                      : isClinic(item) ? item.name : ''}
                  </h3>
                  {isDoctor(item) ? (
                    <p className="text-gray-600 mb-2">{item.specialization}</p>
                  ) : isClinic(item) && item.specialties ? (
                    <p className="text-gray-600 mb-2">{item.specialties.join(', ')}</p>
                  ) : null}
                  <div className="flex items-center mb-3">
                    <div className="text-yellow-500 mr-1">{'★'.repeat(Math.floor(item.rating))}</div>
                    <span className="text-gray-600">{item.rating} ({item.reviews} reviews)</span>
                  </div>
                  <button 
                    className="btn btn-primary w-full"
                    onClick={() => setSelectedItem(item)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Doctor/Clinic Details */}
      {selectedItem && !showScheduleForm && !showPaymentForm && (
        <div>
          <button 
            className="text-blue-600 hover:underline flex items-center mb-6"
            onClick={handleBackToResults}
          >
            ← Back to results
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div className="md:col-span-1">
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                <div className="text-gray-400 text-7xl">
                  {isDoctor(selectedItem) ? '👨‍⚕️' : '🏥'}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4 mb-4">
                <h2 className="font-bold text-xl mb-2">
                  {isDoctor(selectedItem) 
                    ? `Dr. ${selectedItem.firstName} ${selectedItem.lastName}` 
                    : isClinic(selectedItem) ? selectedItem.name : ''}
                </h2>
                {isDoctor(selectedItem) ? (
                  <p className="text-gray-600 mb-4">{selectedItem.specialization}</p>
                ) : isClinic(selectedItem) && selectedItem.specialties ? (
                  <p className="text-gray-600 mb-4">{selectedItem.specialties.join(', ')}</p>
                ) : null}
                
                <div className="flex items-center mb-4">
                  <div className="text-yellow-500 mr-1">{'★'.repeat(Math.floor(selectedItem.rating))}</div>
                  <span className="text-gray-600">{selectedItem.rating} ({selectedItem.reviews} reviews)</span>
                </div>
                
                <button 
                  className="btn btn-primary w-full"
                  onClick={handleScheduleAppointment}
                >
                  Schedule Appointment
                </button>
              </div>
              
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-bold text-lg mb-3">Contact Information</h3>
                <div className="space-y-2">
                  {isClinic(selectedItem) && selectedItem.address && (
                    <p className="flex items-start">
                      <span className="text-gray-500 mr-2">📍</span>
                      <span>
                        {`${selectedItem.address.street}, ${selectedItem.address.city}, ${selectedItem.address.state}, ${selectedItem.address.country}`}
                      </span>
                    </p>
                  )}
                  <p className="flex items-start">
                    <span className="text-gray-500 mr-2">📞</span>
                    <span>{selectedItem.phone}</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-gray-500 mr-2">✉️</span>
                    <span>{selectedItem.email}</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
              {isDoctor(selectedItem) ? (
                <>
                  {/* Doctor Details */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-bold text-lg mb-3">About Dr. {selectedItem.lastName}</h3>
                    <p className="text-gray-600 mb-4">
                      Dr. {selectedItem.lastName} is a highly qualified {selectedItem.specialization.toLowerCase()} specialist with {selectedItem.yearsOfExperience} years of experience in diagnosing and treating a wide range of conditions. {selectedItem.bio || 'They are committed to providing personalized care to all patients.'}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="font-medium text-gray-700">Education</h4>
                        <p className="text-gray-600">
                          {selectedItem.education ? selectedItem.education.join(', ') : 'Information not available'}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">Languages</h4>
                        <p className="text-gray-600">
                          {selectedItem.languages ? selectedItem.languages.join(', ') : 'Information not available'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Availability */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-bold text-lg mb-3">Availability</h3>
                    <div className="space-y-2">
                      {formatDoctorAvailability(selectedItem).map((slot, index) => (
                        <div key={index} className="flex justify-between border-b pb-2">
                          <span className="font-medium">{slot.day}</span>
                          <span className="text-gray-600">{slot.hours}</span>
                        </div>
                      ))}
                      {formatDoctorAvailability(selectedItem).length === 0 && (
                        <p className="text-gray-600">Availability information not provided.</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Clinic Details */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-bold text-lg mb-3">About {selectedItem.name}</h3>
                    <p className="text-gray-600 mb-4">
                      {selectedItem.description || `${selectedItem.name} is a leading medical facility specializing in ${selectedItem.specialties?.join(', ') || 'various medical services'}. The clinic is equipped with state-of-the-art technology and staffed by experienced healthcare professionals dedicated to providing high-quality care.`}
                    </p>
                  </div>
                  
                  {/* Services */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-bold text-lg mb-3">Services</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedItem.services?.map((service, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-blue-500 mr-2">✓</span>
                          <span>{service}</span>
                        </li>
                      ))}
                      {(!selectedItem.services || selectedItem.services.length === 0) && (
                        <p className="text-gray-600">Services information not provided.</p>
                      )}
                    </ul>
                  </div>
                  
                  {/* Hours & Insurance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="font-bold text-lg mb-3">Hours</h3>
                      <div className="space-y-2">
                        {formatClinicHours(selectedItem).map((slot, index) => (
                          <div key={index} className="flex justify-between border-b pb-2">
                            <span className="font-medium">{slot.day}</span>
                            <span className="text-gray-600">{slot.hours}</span>
                          </div>
                        ))}
                        {formatClinicHours(selectedItem).length === 0 && (
                          <p className="text-gray-600">Hours information not provided.</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="font-bold text-lg mb-3">Insurance Accepted</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.insuranceAccepted?.map((ins, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {ins}
                          </span>
                        ))}
                        {(!selectedItem.insuranceAccepted || selectedItem.insuranceAccepted.length === 0) && (
                          <p className="text-gray-600">Insurance information not provided.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Schedule Appointment Form */}
      {showScheduleForm && !showPaymentForm && (
        <div>
          <button 
            className="text-blue-600 hover:underline flex items-center mb-6"
            onClick={handleBackToResults}
          >
            ← Back to results
          </button>
          
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Schedule an Appointment</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <input
                  type="date"
                  id="date"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                <select
                  id="time"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                >
                  <option value="">Select a time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Appointment Summary</h3>
                <p className="mb-1"><span className="font-medium">Service:</span> Consultation</p>
                <p className="mb-1"><span className="font-medium">Price:</span> $150.00</p>
                <p className="mb-1"><span className="font-medium">Duration:</span> 30 minutes</p>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  className="btn btn-secondary"
                  onClick={handleBackToResults}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleProceedToPayment}
                  disabled={!appointmentDate || !appointmentTime}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Payment Form */}
      {showPaymentForm && (
        <div>
          <button 
            className="text-blue-600 hover:underline flex items-center mb-6"
            onClick={() => {
              setShowPaymentForm(false);
              setShowScheduleForm(true);
            }}
          >
            ← Back to scheduling
          </button>
          
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input
                  type="text"
                  id="cardName"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                <input
                  type="text"
                  id="expDate"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-2">Order Summary</h3>
              <div className="flex justify-between mb-1">
                <span>Consultation</span>
                <span>$150.00</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Tax</span>
                <span>$19.50</span>
              </div>
              <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                <span>Total</span>
                <span>$169.50</span>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setShowPaymentForm(false);
                  setShowScheduleForm(true);
                }}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCompletePayment}
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
