import type { Account, Product, City, Category, Brand } from "@/../../shared/types";

export const mockCities: City[] = [
  { id: 1, name: "کراچی", createdAt: new Date().toISOString() },
  { id: 2, name: "لاہور", createdAt: new Date().toISOString() },
  { id: 3, name: "اسلام آباد", createdAt: new Date().toISOString() },
  { id: 4, name: "ملتان", createdAt: new Date().toISOString() },
  { id: 5, name: "فیصل آباد", createdAt: new Date().toISOString() },
];

export const mockCategories: Category[] = [
  { id: 1, name: "الیکٹرانکس", createdAt: new Date().toISOString() },
  { id: 2, name: "کپڑے", createdAt: new Date().toISOString() },
  { id: 3, name: "کھانے کی چیزیں", createdAt: new Date().toISOString() },
  { id: 4, name: "گھریلو سامان", createdAt: new Date().toISOString() },
];

export const mockBrands: Brand[] = [
  { id: 1, name: "سیمسنگ", createdAt: new Date().toISOString() },
  { id: 2, name: "ایپل", createdAt: new Date().toISOString() },
  { id: 3, name: "سونی", createdAt: new Date().toISOString() },
  { id: 4, name: "لینوو", createdAt: new Date().toISOString() },
];

export const mockAccounts: Account[] = [
  {
    id: 1,
    name: "احمد ہارڈویئر سٹور",
    address: "بازار علی پور، کراچی",
    cityId: 1,
    balance: 50000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "علی الیکٹرانکس",
    address: "بازار قسطنطنیہ، لاہور",
    cityId: 2,
    balance: 75000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "فاطمہ جنرل سٹور",
    address: "بازار مین، اسلام آباد",
    cityId: 3,
    balance: 30000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "سیمسنگ گیلکسی A12",
    sku: "SKU-SAMSUNG-A12-001",
    categoryId: 1,
    brandId: 1,
    quantity: 15,
    unitPrice: 25000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "ایپل آئی فون 13",
    sku: "SKU-APPLE-IP13-001",
    categoryId: 1,
    brandId: 2,
    quantity: 8,
    unitPrice: 120000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "سونی ہیڈفونز",
    sku: "SKU-SONY-HEAD-001",
    categoryId: 1,
    brandId: 3,
    quantity: 25,
    unitPrice: 5000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "لینوو لیپ ٹاپ",
    sku: "SKU-LENOVO-LAP-001",
    categoryId: 1,
    brandId: 4,
    quantity: 5,
    unitPrice: 60000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
