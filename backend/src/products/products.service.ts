import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  // In-memory database for simplicity
  private readonly products: Product[] = [
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

  findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  findOne(id: number): Promise<Product | undefined> {
    const product = this.products.find(product => product.id === id);
    return Promise.resolve(product);
  }

  create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct: Product = {
      id: this.products.length + 1,
      ...createProductDto,
      rating: 0,
      reviews: 0,
    };
    this.products.push(newProduct);
    return Promise.resolve(newProduct);
  }

  update(id: number, updateProductDto: UpdateProductDto): Promise<Product | undefined> {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      return Promise.resolve(undefined);
    }
    
    const updatedProduct = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    
    this.products[productIndex] = updatedProduct;
    return Promise.resolve(updatedProduct);
  }

  remove(id: number): Promise<boolean> {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      return Promise.resolve(false);
    }
    
    this.products.splice(productIndex, 1);
    return Promise.resolve(true);
  }
}
