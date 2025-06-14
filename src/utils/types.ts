export interface Product {
  id: number;
  category: number;
  stock: number;
  slug: string;
  name: string;
  details: string;
  discount_price: number;
  current_price: number;
  created_at: string;
  product_image: [{ id: string; image: string }];
  short_description: string;
}

export interface ProductsResponse {
  status: boolean;
  count: number;
  next: string;
  previous: string;
  data: Product[];
}

// Category interface
export interface Category {
  id: number;
  title: string;
  slug: string;
  image: string;
  details: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}


export interface CategoriesResponse {
  status: boolean;
  count: number;
  next: string | null;
  previous: string | null;
  data: Category[];
}