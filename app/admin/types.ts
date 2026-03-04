export interface Product {
  id: string;
  sku: string;
  name: string;
  collection: string;
  price: number;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  size: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  items: OrderItem[];
  total: number;
  status: "delivered" | "shipped" | "pending" | "processing" | "cancelled";
  date: string;
}

export interface Activity {
  id: string;
  type: "order" | "stock" | "review" | "system";
  message: string;
  time: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface ReadingType {
  id: string;
  name: string;
  tagline: string;
  price: number;
  active: boolean;
  description: string[];
}

export interface ReadingBooking {
  id: string;
  clientName: string;
  clientEmail: string;
  readingType: string;
  date: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string;
  createdAt: string;
}

export interface ReadingAvailability {
  activeDays: number[];
  timeSlots: string[];
  blockedDates: string[];
}
