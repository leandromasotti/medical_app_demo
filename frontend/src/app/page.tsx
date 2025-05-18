import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
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
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="product-card">
            <div className="relative h-48 w-full">
              <div className="bg-blue-100 h-full w-full flex items-center justify-center">
                <div className="text-blue-500 font-bold text-xl">Surgery Image</div>
              </div>
            </div>
            <div className="content">
              <h3 className="text-xl font-semibold">General Surgery</h3>
              <p className="text-gray-600 mb-2">Comprehensive surgical procedures</p>
              <p className="text-blue-600 font-bold mb-4">$5,000</p>
              <Link href="/products/1" className="btn btn-primary block text-center">
                View Details
              </Link>
            </div>
          </div>

          <div className="product-card">
            <div className="relative h-48 w-full">
              <div className="bg-green-100 h-full w-full flex items-center justify-center">
                <div className="text-green-500 font-bold text-xl">Dental Image</div>
              </div>
            </div>
            <div className="content">
              <h3 className="text-xl font-semibold">Dental Procedures</h3>
              <p className="text-gray-600 mb-2">Complete dental care solutions</p>
              <p className="text-blue-600 font-bold mb-4">$1,200</p>
              <Link href="/products/2" className="btn btn-primary block text-center">
                View Details
              </Link>
            </div>
          </div>

          <div className="product-card">
            <div className="relative h-48 w-full">
              <div className="bg-red-100 h-full w-full flex items-center justify-center">
                <div className="text-red-500 font-bold text-xl">Cardiology Image</div>
              </div>
            </div>
            <div className="content">
              <h3 className="text-xl font-semibold">Cardiology Services</h3>
              <p className="text-gray-600 mb-2">Heart health diagnostics and treatments</p>
              <p className="text-blue-600 font-bold mb-4">$3,500</p>
              <Link href="/products/3" className="btn btn-primary block text-center">
                View Details
              </Link>
            </div>
          </div>
        </div>
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
