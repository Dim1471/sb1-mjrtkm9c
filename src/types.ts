export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  material?: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface PurchaseFormData {
  fullName: string;
  phoneNumber: string;
  shippingMethod: 'ukrposhta' | 'novaposhta';
  branch: string;
}

export interface SearchResult {
  id: string;
  name: string;
  price: number;
}