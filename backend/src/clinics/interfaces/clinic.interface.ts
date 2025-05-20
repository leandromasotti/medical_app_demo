export interface Clinic {
  id: number;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  phone: string;
  email: string;
  website: string;
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  services: string[];
  specialties: string[];
  facilities: string[];
  rating: number;
  reviews: number;
  images: string[];
  insuranceAccepted: string[];
  languages: string[];
  isVerified: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  emergencyServices: boolean;
  parkingAvailable: boolean;
  wheelchairAccessible: boolean;
} 