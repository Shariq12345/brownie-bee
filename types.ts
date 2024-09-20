export interface Products {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
  isFeatured: boolean;
  isArchived: boolean;
  category: string;
  weight: string;
  flavor: string;
  quantity: number;
  description: string;
  discount: number;
}

export interface Offers {
  id: string;
  name: string;
  code: string;
  discount: number;
}

export interface Review {
  id: string;
  content: string;
  userName: string;
  emailAddress: string;
  rating: number;
  productId: string;
  createdAt: string;
}

export interface Category {
  id: string;
  billboardId: string;
  billboardLabel: string;
  name: string;
}

export interface Weight {
  id: string;
  name: string;
  value: string;
}

export interface Flavor {
  id: string;
  name: string;
  value: string;
}

export interface Orders {
  id: string;
  isPaid: boolean;
  phone: string;
  orderItems: Products[];
  address: string;
  order_status: string;
  userId: string;
  cakeMessage?: string; // Message to write on the cake
  note?: string; // Additional note
}