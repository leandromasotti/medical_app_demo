import Link from 'next/link';
import Image from 'next/image';

// This would typically come from an API
const products = [
  {
    id: 1,
    name: 'General Surgery',
    description: 'Comprehensive surgical procedures including appendectomy, hernia repair, and gallbladder removal.',
    price: 5000,
    image: '/images/surgery.jpg',
    category: 'Surgery',
  },
  {
    id: 2,
    name: 'Dental Procedures',
    description: 'Complete dental care solutions including cleanings, fillings, root canals, and cosmetic dentistry.',
    price: 1200,
    image: '/images/dental.jpg',
    category: 'Dental',
  },
  {
    id: 3,
    name: 'Cardiology Services',
    description: 'Heart health diagnostics and treatments including ECG, stress tests, and consultations with specialists.',
    price: 3500,
    image: '/images/cardiology.jpg',
    category: 'Cardiology',
  },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Medical Products & Procedures</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <button className="btn btn-secondary">All Categories</button>
        <button className="btn btn-secondary">Surgery</button>
        <button className="btn btn-secondary">Dental</button>
        <button className="btn btn-secondary">Cardiology</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="relative h-48 w-full">
              <div className={`
                ${product.category === 'Surgery' ? 'bg-blue-100 text-blue-500' : ''}
                ${product.category === 'Dental' ? 'bg-green-100 text-green-500' : ''}
                ${product.category === 'Cardiology' ? 'bg-red-100 text-red-500' : ''}
                h-full w-full flex items-center justify-center
              `}>
                <div className="font-bold text-xl">{product.category} Image</div>
              </div>
            </div>
            <div className="content">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-blue-600 font-bold mb-4">${product.price.toLocaleString()}</p>
              <div className="flex space-x-2">
                <Link href={`/products/${product.id}`} className="btn btn-primary flex-1 text-center">
                  View Details
                </Link>
                <button className="btn btn-secondary px-3">
                  ♡
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
