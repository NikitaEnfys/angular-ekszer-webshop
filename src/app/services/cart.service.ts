import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Jewelry } from '../models/jewelry.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(item: Jewelry, quantity: number = 1): void {
    const existingItem = this.cartItems.find(ci => ci.jewelry.id === item.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ jewelry: item, quantity });
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(itemId: number): void {
    const updatedItems = this.cartItems.filter(ci => ci.jewelry.id !== itemId);
    this.cartItemsSubject.next(updatedItems);
  }

  updateQuantity(itemId: number, newQuantity: number): void {
    const item = this.cartItems.find(ci => ci.jewelry.id === itemId);
    if (item && newQuantity > 0) {
      item.quantity = newQuantity;
      this.cartItemsSubject.next(this.cartItems);
    } else if (item && newQuantity === 0) {
      this.removeFromCart(itemId);
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.jewelry.price * item.quantity, 0);
  }
}
