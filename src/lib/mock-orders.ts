export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  variant?: {
    size?: string;
    color?: string;
    material?: string;
  };
  subtotal: number;
}

export interface Order {
  id: string;
  orderId: string;
  userId: string;
  orderDate: Date;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderId: "ORD-2024-1001",
    userId: "user-1",
    orderDate: new Date("2024-12-15"),
    status: "delivered",
    totalAmount: 42500,
    subtotal: 40000,
    tax: 2500,
    shippingCost: 0,
    discount: 0,
    items: [
      {
        id: "item-1",
        orderId: "ORD-2024-1001",
        productId: "prod-001",
        productName: "Premium Leather Handbag",
        productImage: "/images/handbag-1.jpg",
        quantity: 1,
        unitPrice: 25000,
        variant: {
          color: "Burgundy",
          material: "Genuine Leather",
        },
        subtotal: 25000,
      },
      {
        id: "item-2",
        orderId: "ORD-2024-1001",
        productId: "prod-002",
        productName: "Gold Plated Bracelet",
        productImage: "/images/bracelet-1.jpg",
        quantity: 1,
        unitPrice: 15000,
        variant: {
          color: "Gold",
          material: "18K Gold Plated",
        },
        subtotal: 15000,
      },
    ],
    shippingAddress: {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 9876543210",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    billingAddress: {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 9876543210",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    paymentMethod: "Credit Card - Visa ***1234",
    trackingNumber: "TRACK-2024-123456",
    estimatedDeliveryDate: new Date("2024-12-20"),
    createdAt: new Date("2024-12-15"),
    updatedAt: new Date("2024-12-18"),
  },
  {
    id: "2",
    orderId: "ORD-2024-1002",
    userId: "user-1",
    orderDate: new Date("2024-12-10"),
    status: "shipped",
    totalAmount: 55000,
    subtotal: 52000,
    tax: 3000,
    shippingCost: 0,
    discount: 0,
    items: [
      {
        id: "item-3",
        orderId: "ORD-2024-1002",
        productId: "prod-003",
        productName: "Silk Evening Dress",
        productImage: "/images/dress-1.jpg",
        quantity: 1,
        unitPrice: 35000,
        variant: {
          size: "M",
          color: "Midnight Blue",
          material: "100% Silk",
        },
        subtotal: 35000,
      },
      {
        id: "item-4",
        orderId: "ORD-2024-1002",
        productId: "prod-004",
        productName: "Diamond Earrings",
        productImage: "/images/earrings-1.jpg",
        quantity: 1,
        unitPrice: 17000,
        variant: {
          material: "18K Gold with Diamonds",
        },
        subtotal: 17000,
      },
    ],
    shippingAddress: {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 9876543210",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    billingAddress: {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 9876543210",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    paymentMethod: "Credit Card - Mastercard ***5678",
    trackingNumber: "TRACK-2024-123457",
    estimatedDeliveryDate: new Date("2024-12-22"),
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-16"),
  },
  {
    id: "3",
    orderId: "ORD-2024-1003",
    userId: "user-1",
    orderDate: new Date("2024-12-05"),
    status: "processing",
    totalAmount: 28500,
    subtotal: 27000,
    tax: 1500,
    shippingCost: 0,
    discount: 0,
    items: [
      {
        id: "item-5",
        orderId: "ORD-2024-1003",
        productId: "prod-005",
        productName: "Cashmere Shawl",
        productImage: "/images/shawl-1.jpg",
        quantity: 1,
        unitPrice: 12000,
        variant: {
          color: "Cream",
          material: "100% Cashmere",
        },
        subtotal: 12000,
      },
      {
        id: "item-6",
        orderId: "ORD-2024-1003",
        productId: "prod-006",
        productName: "Pearl Necklace",
        productImage: "/images/necklace-1.jpg",
        quantity: 1,
        unitPrice: 15000,
        variant: {
          material: "Freshwater Pearls",
        },
        subtotal: 15000,
      },
    ],
    shippingAddress: {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 9876543210",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    billingAddress: {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 9876543210",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    paymentMethod: "Net Banking - HDFC Bank",
    trackingNumber: undefined,
    estimatedDeliveryDate: undefined,
    createdAt: new Date("2024-12-05"),
    updatedAt: new Date("2024-12-15"),
  },
  {
    id: "4",
    orderId: "ORD-2024-1004",
    userId: "user-1",
    orderDate: new Date("2024-11-28"),
    status: "delivered",
    totalAmount: 18500,
    subtotal: 17500,
    tax: 1000,
    shippingCost: 0,
    discount: 0,
    items: [
      {
        id: "item-7",
        orderId: "ORD-2024-1004",
        productId: "prod-007",
        productName: "Designer Sunglasses",
        productImage: "/images/sunglasses-1.jpg",
        quantity: 1,
        unitPrice: 9500,
        variant: {
          color: "Black",
          material: "UV Protected",
        },
        subtotal: 9500,
      },
      {
        id: "item-8",
        orderId: "ORD-2024-1004",
        productId: "prod-008",
        productName: "Silk Scarf",
        productImage: "/images/scarf-1.jpg",
        quantity: 1,
        unitPrice: 8000,
        variant: {
          color: "Emerald Green",
          material: "100% Silk",
        },
        subtotal: 8000,
      },
    ],
    shippingAddress: {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 9876543210",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    billingAddress: {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 9876543210",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    paymentMethod: "UPI - Google Pay",
    trackingNumber: "TRACK-2024-123458",
    estimatedDeliveryDate: new Date("2024-12-02"),
    createdAt: new Date("2024-11-28"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "5",
    orderId: "ORD-2024-1005",
    userId: "user-1",
    orderDate: new Date("2024-11-20"),
    status: "cancelled",
    totalAmount: 32000,
    subtotal: 30000,
    tax: 2000,
    shippingCost: 0,
    discount: 0,
    items: [
      {
        id: "item-9",
        orderId: "ORD-2024-1005",
        productId: "prod-009",
        productName: "Wool Coat",
        productImage: "/images/coat-1.jpg",
        quantity: 1,
        unitPrice: 20000,
        variant: {
          size: "L",
          color: "Charcoal Grey",
          material: "100% Wool",
        },
        subtotal: 20000,
      },
      {
        id: "item-10",
        orderId: "ORD-2024-1005",
        productId: "prod-010",
        productName: "Leather Gloves",
        productImage: "/images/gloves-1.jpg",
        quantity: 1,
        unitPrice: 10000,
        variant: {
          size: "M",
          color: "Black",
          material: "Genuine Leather",
        },
        subtotal: 10000,
      },
    ],
    shippingAddress: {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 9876543210",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    billingAddress: {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 9876543210",
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
    },
    paymentMethod: "Refunded",
    trackingNumber: undefined,
    estimatedDeliveryDate: undefined,
    createdAt: new Date("2024-11-20"),
    updatedAt: new Date("2024-11-21"),
  },
];

export const getMockOrders = (): Order[] => {
  return mockOrders.map((order) => ({
    ...order,
    orderDate: new Date(order.orderDate),
    estimatedDeliveryDate: order.estimatedDeliveryDate
      ? new Date(order.estimatedDeliveryDate)
      : undefined,
    createdAt: new Date(order.createdAt),
    updatedAt: new Date(order.updatedAt),
  }));
};

export const getMockOrderById = (orderId: string): Order | undefined => {
  return getMockOrders().find((order) => order.orderId === orderId);
};
