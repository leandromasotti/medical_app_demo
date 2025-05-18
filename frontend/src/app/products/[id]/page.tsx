import Image from 'next/image';
import Link from 'next/link';

// This would typically come from an API based on the ID
const products = [
  {
    id: 1,
    name: 'General Surgery',
    description: 'Comprehensive surgical procedures including appendectomy, hernia repair, and gallbladder removal.',
    longDescription: `
      General surgery encompasses a wide range of surgical procedures performed on various parts of the body. Our general surgery services include:
      
      - Appendectomy: Removal of the appendix
      - Hernia repair: Fixing weaknesses in the abdominal wall
      - Gallbladder removal: Treating gallstones and other gallbladder issues
      - Colon surgery: Addressing colon cancer, diverticulitis, and other conditions
      
      Our team of experienced surgeons uses the latest minimally invasive techniques whenever possible to reduce recovery time and improve outcomes.
    `,
    price: 5000,
    image: '/images/surgery.jpg',
    category: 'Surgery',
    provider: 'Central Medical Center',
    location: 'San José, Costa Rica',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Dental Procedures',
    description: 'Complete dental care solutions including cleanings, fillings, root canals, and cosmetic dentistry.',
    longDescription: `
      Our comprehensive dental services cover all aspects of oral health, from routine cleanings to complex restorative procedures. Our dental services include:
      
      - Preventive care: Regular cleanings and examinations
      - Restorative dentistry: Fillings, crowns, and bridges
      - Endodontics: Root canal therapy
      - Cosmetic dentistry: Teeth whitening, veneers, and smile makeovers
      - Oral surgery: Extractions and dental implants
      
      Our dental professionals use state-of-the-art equipment and techniques to ensure your comfort and provide the highest quality care.
    `,
    price: 1200,
    image: '/images/dental.jpg',
    category: 'Dental',
    provider: 'Smile Dental Clinic',
    location: 'San José, Costa Rica',
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: 'Cardiology Services',
    description: 'Heart health diagnostics and treatments including ECG, stress tests, and consultations with specialists.',
    longDescription: `
      Our cardiology department offers comprehensive heart care services, from diagnostic testing to advanced treatments. Our cardiology services include:
      
      - Diagnostic testing: ECG, echocardiogram, stress tests
      - Cardiac imaging: Cardiac CT, MRI, and nuclear medicine studies
      - Interventional procedures: Angioplasty and stent placement
      - Electrophysiology: Diagnosis and treatment of heart rhythm disorders
      - Preventive cardiology: Risk assessment and management
      
      Our team of cardiologists and cardiac specialists are dedicated to providing personalized care to improve and maintain your heart health.
    `,
    price: 3500,
    image: '/images/cardiology.jpg',
    category: 'Cardiology',
    provider: 'Heart & Vascular Institute',
    location: 'San José, Costa Rica',
    rating: 4.7,
    reviews: 156,
  },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
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
          <div className={`
            ${product.category === 'Surgery' ? 'bg-blue-100 text-blue-500' : ''}
            ${product.category === 'Dental' ? 'bg-green-100 text-green-500' : ''}
            ${product.category === 'Cardiology' ? 'bg-red-100 text-red-500' : ''}
            h-full w-full flex items-center justify-center rounded-lg
          `}>
            <div className="font-bold text-2xl">{product.category} Image</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>
          
          <p className="text-gray-600">{product.description}</p>
          
          <div className="flex items-center gap-2">
            <div className="text-yellow-500">{'★'.repeat(Math.floor(product.rating))}</div>
            <span className="text-gray-600">{product.rating} ({product.reviews} reviews)</span>
          </div>
          
          <div className="border-t border-b py-4 my-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Provider</p>
              <p className="font-medium">{product.provider}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="font-medium">{product.location}</p>
            </div>
          </div>
          
          <div className="text-3xl font-bold text-blue-600">
            ${product.price.toLocaleString()}
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
          {product.longDescription.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.filter(p => p.id !== product.id).map(relatedProduct => (
            <Link 
              href={`/products/${relatedProduct.id}`} 
              key={relatedProduct.id}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-32 mb-3 rounded overflow-hidden">
                <div className={`
                  ${relatedProduct.category === 'Surgery' ? 'bg-blue-100 text-blue-500' : ''}
                  ${relatedProduct.category === 'Dental' ? 'bg-green-100 text-green-500' : ''}
                  ${relatedProduct.category === 'Cardiology' ? 'bg-red-100 text-red-500' : ''}
                  h-full w-full flex items-center justify-center
                `}>
                  <div className="font-bold text-sm">{relatedProduct.category}</div>
                </div>
              </div>
              <h3 className="font-semibold">{relatedProduct.name}</h3>
              <p className="text-blue-600 font-medium">${relatedProduct.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
