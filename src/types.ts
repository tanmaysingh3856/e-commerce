export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  carbonFootprint: number;
  recyclable: boolean;
  certifications: string[];
  sustainablePackaging: boolean;
  category: string;
  rating: number;
  priceId?: string; // Stripe price ID
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  recyclableOnly: boolean;
  sustainablePackagingOnly: boolean;
  maxCarbonFootprint: number;
  category: string;
  minRating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}