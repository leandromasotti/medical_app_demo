import React from 'react';
import Link from 'next/link';
import { MedicalService } from '@/types';
import { formatPrice, truncateText } from '@/utils/path-utils';

interface MedicalServiceCardProps {
  service: MedicalService;
  className?: string;
}

/**
 * A reusable component for displaying a medical service card
 */
const MedicalServiceCard: React.FC<MedicalServiceCardProps> = ({ service, className = '' }) => {
  return (
    <div className={`product-card ${className}`}>
      <div className="relative h-48 w-full">
        {service.images && service.images.length > 0 ? (
          <div className="bg-gray-100 h-full w-full flex items-center justify-center">
            <div className="font-bold text-xl">{service.category} Image</div>
          </div>
        ) : (
          <div className="bg-gray-100 h-full w-full flex items-center justify-center">
            <div className="font-bold text-xl">{service.category} Image</div>
          </div>
        )}
      </div>
      <div className="content p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{service.name}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {service.category}
          </span>
        </div>
        <p className="text-gray-600 mb-2">{truncateText(service.description, 100)}</p>
        <div className="flex items-center gap-2 mb-2">
          <div className="text-yellow-500">{'★'.repeat(Math.floor(service.rating))}</div>
          <span className="text-gray-600 text-sm">{service.rating} ({service.reviews})</span>
        </div>
        <p className="text-blue-600 font-bold mb-4">{formatPrice(service.price)}</p>
        <div className="flex space-x-2">
          <Link href={`/products/${service.id}`} className="btn btn-primary flex-1 text-center">
            View Details
          </Link>
          <button className="btn btn-secondary px-3">
            ♡
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalServiceCard;
