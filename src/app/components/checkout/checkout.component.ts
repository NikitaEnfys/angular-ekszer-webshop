import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    PriceFormatPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  personalForm!: FormGroup;
  shippingForm!: FormGroup;
  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder, public cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.personalForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.shippingForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expiryDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    });
  }

  submitOrder(): void {
    console.log('Rendelés leadva', {
      personal: this.personalForm.value,
      shipping: this.shippingForm.value,
      payment: this.paymentForm.value,
      cart: this.cartService.cartItems,
      total: this.cartService.getTotalPrice()
    });

    this.cartService.clearCart();
    this.snackBar.open('Rendelés sikeresen leadva!', 'Bezár', {
      duration: 4000
    });
  }
}
