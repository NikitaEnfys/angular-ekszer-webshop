import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { Jewelry } from '../../models/jewelry.model';

@Component({
  selector: 'app-product-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, PriceFormatPipe],
  template: `
    <h2 mat-dialog-title>{{ data.jewelry.name }}</h2>
    <mat-dialog-content>
      <img [src]="data.jewelry.imageUrl" alt="{{ data.jewelry.name }}" class="detail-image">
      <p>{{ data.jewelry.description }}</p>
      <p><strong>Ár: {{ data.jewelry.price | priceFormat:'€' }}</strong></p>
      <p>Kategória: {{ data.jewelry.category.name }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onClose()">Bezár</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .detail-image {
      width: 100%;
      max-height: 300px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
  `]
})
export class ProductDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { jewelry: Jewelry },
    private dialogRef: MatDialogRef<ProductDetailsDialogComponent>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
