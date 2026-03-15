export interface City {
  id: number;
  name: string;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
}

export interface Brand {
  id: number;
  name: string;
  createdAt: string;
}

export interface Account {
  id: number;
  name: string;
  address: string;
  cityId: number;
  city?: City;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  categoryId: number;
  category?: Category;
  brandId: number;
  brand?: Brand;
  quantity: number;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: number;
  accountId: number;
  account?: Account;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  createdAt: string;
}

export interface StockMovement {
  id: number;
  productId: number;
  product?: Product;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  createdAt: string;
}
