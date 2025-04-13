import { Jewelry } from './jewelry.model';

export interface CartItem {
  jewelry: Jewelry;
  quantity: number;
}
