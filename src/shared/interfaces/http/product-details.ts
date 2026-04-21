import { ProductCategory } from "../product";

export interface ProductDetails {
  id: number;
  value: string;
  name: string;
  description: string;
  photo: string;
  height: string;
  width: string;
  weight: string;
  averageRating: number;
  views: number;
  ratingCount: number;
  categoryId: number;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
