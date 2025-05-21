import Image from 'next/image';
import Link from 'next/link';
import { MedicalServicesService } from '@/services/medical-services.service';
import { ClinicsService } from '@/services/clinics.service';
import { MedicalService, Clinic } from '@/types';

// Clinic Info Component
async function ClinicInfo({ clinicId }: { clinicId: number }) {
  const clinic = await getClinic(clinicId);
  
  return (
    <div className="border-t border-b py-4 my-4 grid grid-cols-2 gap-4">
      <div>
        <p className="text-gray-500 text-sm">Provider</p>
        <p className="font-medium">{clinic ? clinic.name : 'Loading...'}</p>
      </div>
      <div>
        <p className="text-gray-500 text-sm">Location</p>
        <p className="font-medium">
          {clinic ? `${clinic.address.city}, ${clinic.address.country}` : 'Loading...'}
        </p>
      </div>
    </div>
  );
}

// Related Services Component
async function RelatedServices({ serviceId, category }: { serviceId: number, category: string }) {
  const relatedServices = await getRelatedServices(serviceId, category);
  
  if (relatedServices.length === 0) {
    return <p>No related services found.</p>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {relatedServices.map(relatedService => (
        <Link 
          href={`/products/${relatedService.id}`} 
          key={relatedService.id}
          className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative h-32 mb-3 rounded overflow-hidden">
            <div className="bg-gray-100 h-full w-full flex items-center justify-center">
              <div className="font-bold text-sm">{relatedService.category}</div>
            </div>
          </div>
          <h3 className="font-semibold">{relatedService.name}</h3>
          <p className="text-blue-600 font-medium">${relatedService.price.toLocaleString()}</p>
        </Link>
      ))}
    </div>
  );
}

// Use server components to fetch data
async function getMedicalService(id: number) {
  try {
    return await MedicalServicesService.getById(id);
  } catch (error) {
    console.error(`Error fetching medical service with id ${id}:`, error);
    return null;
  }
}

async function getRelatedServices(currentId: number, category: string) {
  try {
    const allServices = await MedicalServicesService.getAll();
    return allServices
      .filter(service => service.id !== currentId && service.category === category)
      .slice(0, 2); // Get up to 2 related services
  } catch (error) {
    console.error('Error fetching related services:', error);
    return [];
  }
}

async function getClinic(clinicId: number) {
  try {
    return await ClinicsService.getById(clinicId);
  } catch (error) {
    console.error(`Error fetching clinic with id ${clinicId}:`, error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const serviceId = parseInt(params.id);
  const service = await getMedicalService(serviceId);
  
  if (!service) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-4">The product you are looking for does not exist.</p>
        <Link href="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <Link href="/products" className="text-blue-600 hover:underline flex items-center gap-1">
        ← Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-80 md:h-full rounded-lg overflow-hidden">
          {service.images && service.images.length > 0 ? (
            <div className="bg-gray-100 h-full w-full flex items-center justify-center rounded-lg">
              <div className="font-bold text-2xl">{service.category} Image</div>
            </div>
          ) : (
            <div className="bg-gray-100 h-full w-full flex items-center justify-center rounded-lg">
              <div className="font-bold text-2xl">{service.category} Image</div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{service.name}</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {service.category}
            </span>
          </div>
          
          <p className="text-gray-600">{service.description}</p>
          
          <div className="flex items-center gap-2">
            <div className="text-yellow-500">{'★'.repeat(Math.floor(service.rating))}</div>
            <span className="text-gray-600">{service.rating} ({service.reviews} reviews)</span>
          </div>
          
          <ClinicInfo clinicId={service.clinicId} />
          
          <div className="text-3xl font-bold text-blue-600">
            ${service.price.toLocaleString()}
          </div>
          
          <div className="flex gap-3">
            <button className="btn btn-primary flex-1">Schedule Consultation</button>
            <button className="btn btn-secondary px-4">♡</button>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">About This Service</h2>
        <div className="prose max-w-none">
          {service.longDescription.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        {/* Additional service details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.requirements.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Requirements</h3>
              <ul className="list-disc pl-5">
                {service.requirements.map((req, i) => (
                  <li key={i} className="mb-1">{req}</li>
                ))}
              </ul>
            </div>
          )}
          
          {service.preparation.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Preparation</h3>
              <ul className="list-disc pl-5">
                {service.preparation.map((prep, i) => (
                  <li key={i} className="mb-1">{prep}</li>
                ))}
              </ul>
            </div>
          )}
          
          {service.benefits.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Benefits</h3>
              <ul className="list-disc pl-5">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="mb-1">{benefit}</li>
                ))}
              </ul>
            </div>
          )}
          
          {service.risks.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Risks</h3>
              <ul className="list-disc pl-5">
                {service.risks.map((risk, i) => (
                  <li key={i} className="mb-1">{risk}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Insurance information */}
        {service.insuranceCoverage && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Insurance Coverage</h3>
            <p className="mb-2">
              {service.insuranceCoverage.covered 
                ? `This service is covered by insurance (up to ${service.insuranceCoverage.coveragePercentage}% coverage).` 
                : 'This service is not typically covered by insurance.'}
            </p>
            {service.insuranceCoverage.insuranceProviders.length > 0 && (
              <div>
                <p className="font-medium">Accepted insurance providers:</p>
                <ul className="list-disc pl-5">
                  {service.insuranceCoverage.insuranceProviders.map((provider, i) => (
                    <li key={i}>{provider}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Services</h2>
        <RelatedServices serviceId={service.id} category={service.category} />
      </div>
    </div>
  );
}
