import Link from 'next/link';

// Mock data for demonstration purposes
const mockLabTests = [
  { id: 1, name: 'Complete Blood Count (CBC)', date: '2023-10-15', status: 'Completed', result: 'Normal' },
  { id: 2, name: 'Lipid Panel', date: '2023-10-15', status: 'Completed', result: 'Elevated Cholesterol' },
  { id: 3, name: 'Glucose Test', date: '2023-09-01', status: 'Completed', result: 'Normal' },
];

const mockVisits = [
  { id: 1, provider: 'Dr. Maria Rodriguez', specialty: 'Primary Care', date: '2023-10-15', time: '10:00 AM', notes: 'Annual physical examination' },
  { id: 2, provider: 'Dr. Carlos Jimenez', specialty: 'Cardiology', date: '2023-09-05', time: '2:30 PM', notes: 'Follow-up on heart health' },
  { id: 3, provider: 'Dr. Ana Vargas', specialty: 'Dermatology', date: '2023-08-12', time: '11:15 AM', notes: 'Skin condition assessment' },
];

const mockDocuments = [
  { id: 1, name: 'Medical History Summary', date: '2023-10-15', type: 'PDF' },
  { id: 2, name: 'Vaccination Record', date: '2023-09-10', type: 'PDF' },
  { id: 3, name: 'Prescription - Atorvastatin', date: '2023-09-05', type: 'PDF' },
  { id: 4, name: 'Radiology Report - Chest X-Ray', date: '2023-07-22', type: 'PDF' },
];

const mockProviders = [
  { id: 1, name: 'Dr. Maria Rodriguez', specialty: 'Primary Care', clinic: 'Central Medical Center', phone: '+506 2222-1111' },
  { id: 2, name: 'Dr. Carlos Jimenez', specialty: 'Cardiology', clinic: 'Heart & Vascular Institute', phone: '+506 2222-2222' },
  { id: 3, name: 'Dr. Ana Vargas', specialty: 'Dermatology', clinic: 'Skin Health Clinic', phone: '+506 2222-3333' },
];

const mockAppointments = [
  { id: 1, provider: 'Dr. Maria Rodriguez', specialty: 'Primary Care', date: '2023-12-15', time: '9:30 AM', status: 'Scheduled' },
  { id: 2, provider: 'Dr. Carlos Jimenez', specialty: 'Cardiology', date: '2024-01-10', time: '2:00 PM', status: 'Scheduled' },
];

export default function HealthPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Health Dashboard</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <p className="text-lg">
          Welcome to your personal health dashboard. Here you can access your medical records, track appointments, and manage your healthcare information.
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
          {mockAppointments.length > 0 ? (
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
                  {mockAppointments.map((appointment) => (
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
          {mockVisits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockVisits.map((visit) => (
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
          {mockProviders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockProviders.map((provider) => (
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
