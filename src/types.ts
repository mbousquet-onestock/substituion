export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  ean: string;
  status: 'Traité' | 'Substitué' | 'Collecté' | 'Expédié';
  image: string;
  substitutedBy?: OrderItem;
}

export interface Package {
  id: string;
  status: 'Traité' | 'Collecté' | 'Expédié';
  location: string;
  email: string;
  phone: string;
  items: OrderItem[];
  shippingInfo?: {
    date: string;
    method: string;
    tracking: string;
  };
}

export interface HistoryEvent {
  date: string;
  time: string;
  title: string;
  description: string;
}

export interface OrderData {
  id: string;
  status: string;
  createdAt: string;
  estimatedDelivery: string;
  client: {
    name: string;
    email: string;
    phone: string;
  };
  deliveryMode: {
    pickup?: {
      store: string;
      email: string;
      phone: string;
    };
    home?: {
      name: string;
      address: string;
      zip: string;
      city: string;
      country: string;
    };
  };
  payment: {
    billingAddress: {
      name: string;
      address: string;
      zip: string;
      city: string;
      country: string;
    };
    methods: {
      type: string;
      last4: string;
      amount: number;
    }[];
    subtotal: number;
    substitutionAdjustment: number;
    total: number;
  };
  articles: {
    delivery: OrderItem[];
    pickup: OrderItem[];
  };
  packages: Package[];
  history: HistoryEvent[];
}
