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
}
