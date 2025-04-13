import { Category } from './category.model';

export interface Jewelry {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
}
