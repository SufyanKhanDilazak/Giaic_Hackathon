// components/Interface.tsx
export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  discountPercent: number;
  isNew: boolean;
  colors: string[];
  sizes: string[];
  additionalImages?: string[];
}

export interface CartItem extends IProduct {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface ProductResult {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}