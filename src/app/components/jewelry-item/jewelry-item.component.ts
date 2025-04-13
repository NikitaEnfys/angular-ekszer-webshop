import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Jewelry } from '../../models/jewelry.model';
import {PriceFormatPipe} from '../../pipes/price-format.pipe';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';

@Component({
  selector: 'app-jewelry-item',
  templateUrl: './jewelry-item.component.html',
  imports: [
    PriceFormatPipe,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardActions
  ],
  styleUrls: ['./jewelry-item.component.css']
})
export class JewelryItemComponent {
  @Input() jewelry!: Jewelry;
  @Output() back = new EventEmitter<void>();

  addToCart(): void {
    console.log(this.jewelry.name + ' added to cart.');
  }

  goBack(): void {
    this.back.emit();
  }
}
