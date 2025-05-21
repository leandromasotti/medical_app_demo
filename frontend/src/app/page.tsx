import Link from 'next/link';
import Image from 'next/image';
import { MedicalServicesService } from '@/services/medical-services.service';
import { MedicalService } from '@/types';
import MedicalServiceCard from '@/components/MedicalServiceCard';
import ErrorState from '@/components/ErrorState';

// Fetch featured medical services
async function getFeaturedServices() {
  try {
    const services = await MedicalServicesService.getAll();
    // Return the top 3 services with highest rating
    return services
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  } catch (error) {
    console.error('Error fetching featured services:', error);
    return [];
  }
}

export default async function Home() {
  const featuredServices = await getFeaturedServices();
  return (
    <div className="space-y-8">
      <section className="bg-blue-50 p-8 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Medical Marketplace</h1>
          <p className="text-xl mb-6">
            Find the best medical procedures and products for your healthcare needs
          </p>
          <Link href="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Medical Services</h2>
        {featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map(service => (
              <MedicalServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="col-span-3 text-center py-8">
            <ErrorState 
              title="No featured services available" 
              message="We couldn't find any featured services at the moment."
              actionText="Browse All Services"
              actionLink="/products"
            />
          </div>
        )}
      </section>

      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="text-blue-600 text-4xl mb-2">✓</div>
            <h3 className="font-semibold text-lg mb-2">Quality Care</h3>
            <p>We partner with top-rated medical providers</p>
          </div>
          <div className="text-center p-4">
            <div className="text-blue-600 text-4xl mb-2">$</div>
            <h3 className="font-semibold text-lg mb-2">Transparent Pricing</h3>
            <p>No hidden fees or surprise charges</p>
          </div>
          <div className="text-center p-4">
            <div className="text-blue-600 text-4xl mb-2">★</div>
            <h3 className="font-semibold text-lg mb-2">Patient Satisfaction</h3>
            <p>Highly rated services and procedures</p>
          </div>
        </div>
      </section>
    </div>
  );
}
