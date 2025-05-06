export interface Product {
  id: 14;
  category: 4;
  stock: number;
  slug: string;
  name: string;
  details: string;
  discount_price: string;
  current_price: string;
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
