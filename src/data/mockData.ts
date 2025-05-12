
// Mock data for the e-commerce app

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  vendorId: string;
  rating: number;
  reviewCount: number;
  stock: number;
  discount?: number;
  tags?: string[];
  specifications?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  reviewCount: number;
  productsCount: number;
  joinDate: string;
}

// Mock categories
export const categories: Category[] = [
  { 
    id: 'electronics', 
    name: 'Electronics', 
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D', 
    productCount: 120 
  },
  { 
    id: 'clothing', 
    name: 'Clothing & Fashion', 
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNsb3RoaW5nfGVufDB8fDB8fHww', 
    productCount: 85 
  },
  { 
    id: 'home', 
    name: 'Home & Garden', 
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvbWUlMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D', 
    productCount: 64 
  },
  { 
    id: 'beauty', 
    name: 'Beauty & Health', 
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D', 
    productCount: 47 
  },
  { 
    id: 'sports', 
    name: 'Sports & Outdoors', 
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BvcnRzfGVufDB8fDB8fHww', 
    productCount: 56 
  },
  { 
    id: 'toys', 
    name: 'Toys & Games', 
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG95c3xlbnwwfHwwfHx8MA%3D%3D', 
    productCount: 38 
  },
];

// Mock vendors
export const vendors: Vendor[] = [
  {
    id: 'v1',
    name: 'TechMaster',
    logo: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlY2glMjBsb2dvfGVufDB8fDB8fHww',
    description: 'Leading provider of premium electronic devices and accessories.',
    rating: 4.8,
    reviewCount: 1245,
    productsCount: 68,
    joinDate: '2019-05-12'
  },
  {
    id: 'v2',
    name: 'FashionHub',
    logo: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbiUyMGxvZ298ZW58MHx8MHx8fDA%3D',
    description: 'Trendy clothing and accessories for everyone.',
    rating: 4.5,
    reviewCount: 876,
    productsCount: 42,
    joinDate: '2020-03-27'
  },
  {
    id: 'v3',
    name: 'HomeDecor',
    logo: 'https://images.unsplash.com/photo-1588609466987-66211cacda38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww',
    description: 'Beautiful furniture and decorations for your home.',
    rating: 4.7,
    reviewCount: 632,
    productsCount: 35,
    joinDate: '2020-11-15'
  }
];

// Mock products
export const products: Product[] = [
  {
    id: 'p1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal clear sound with these premium noise-canceling wireless headphones. Perfect for music enthusiasts and professionals alike.',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D'
    ],
    category: 'electronics',
    vendorId: 'v1',
    rating: 4.8,
    reviewCount: 352,
    stock: 45,
    specifications: {
      'Battery Life': 'Up to 30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Color': 'Black'
    }
  },
  {
    id: 'p2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, sleep tracking, and more.',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D'
    ],
    category: 'electronics',
    vendorId: 'v1',
    rating: 4.6,
    reviewCount: 128,
    stock: 32,
    discount: 15,
    specifications: {
      'Battery Life': 'Up to 7 days',
      'Water Resistance': '50m',
      'Display': '1.4" AMOLED',
      'Sensors': 'Heart rate, accelerometer, gyroscope'
    }
  },
  {
    id: 'p3',
    name: 'Designer Leather Handbag',
    description: 'Elegant and spacious designer handbag made from genuine leather. Perfect for everyday use or special occasions.',
    price: 299.99,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFuZGJhZ3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFuZGJhZ3xlbnwwfHwwfHx8MA%3D%3D'
    ],
    category: 'clothing',
    vendorId: 'v2',
    rating: 4.9,
    reviewCount: 87,
    stock: 15,
    specifications: {
      'Material': 'Genuine leather',
      'Dimensions': '30 x 20 x 10 cm',
      'Interior': 'Fabric lining with multiple pockets',
      'Color': 'Brown'
    }
  },
  {
    id: 'p4',
    name: 'Modern Coffee Table',
    description: 'Sleek, modern coffee table with tempered glass top and wooden legs. The perfect centerpiece for any living room.',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwdGFibGV8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZmZlZSUyMHRhYmxlfGVufDB8fDB8fHww'
    ],
    category: 'home',
    vendorId: 'v3',
    rating: 4.7,
    reviewCount: 45,
    stock: 8,
    discount: 10,
    specifications: {
      'Material': 'Tempered glass, solid oak',
      'Dimensions': '110 x 60 x 45 cm',
      'Weight': '25 kg',
      'Assembly': 'Required, tools included'
    }
  },
  {
    id: 'p5',
    name: 'Organic Skincare Set',
    description: 'Complete skincare set made with natural, organic ingredients. Includes cleanser, toner, moisturizer, and serum.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNraW5jYXJlfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1556228852-6d35a585d566?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNraW5jYXJlfGVufDB8fDB8fHww'
    ],
    category: 'beauty',
    vendorId: 'v2',
    rating: 4.8,
    reviewCount: 212,
    stock: 28,
    specifications: {
      'Volume': '4 x 50ml',
      'Ingredients': 'All organic, cruelty-free',
      'Skin Type': 'All skin types',
      'Shelf Life': '12 months after opening'
    }
  },
  {
    id: 'p6',
    name: 'Professional Basketball',
    description: 'Official size and weight basketball used by professionals. Excellent grip and durability for indoor and outdoor play.',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhc2tldGJhbGx8ZW58MHx8MHx8fDA%3D'
    ],
    category: 'sports',
    vendorId: 'v1',
    rating: 4.7,
    reviewCount: 89,
    stock: 42,
    discount: 5,
    specifications: {
      'Size': 'Official size 7 (29.5")',
      'Material': 'Composite leather',
      'Weight': '22 oz',
      'Inflation': 'Required before use'
    }
  }
];

// Helper function to get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

// Helper function to get products by vendor
export const getProductsByVendor = (vendorId: string): Product[] => {
  return products.filter(product => product.vendorId === vendorId);
};

// Helper function to get product by id
export const getProductById = (productId: string): Product | undefined => {
  return products.find(product => product.id === productId);
};

// Helper function to get vendor by id
export const getVendorById = (vendorId: string): Vendor | undefined => {
  return vendors.find(vendor => vendor.id === vendorId);
};

// Helper function to get related products (same category, different product)
export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
};
