import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { Jewelry } from '../../models/jewelry.model';
import { Category } from '../../models/category.model';
import { CartService } from '../../services/cart.service';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-jewelry-store',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    RouterLink,
    MatDialogModule,
    PriceFormatPipe,
    MatCardContent,
    MatCard,
    MatCardActions
  ],
  templateUrl: './jewelry-store.component.html',
  styleUrls: ['./jewelry-store.component.css'],
  animations: [
    trigger('fadeInSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class JewelryStoreComponent implements OnInit {
  jewelries: Jewelry[] = [];
  filteredJewelries: Jewelry[] = [];
  categories: Category[] = [];
  searchControl: FormControl = new FormControl('');
  categoryFilter: string = '';

  bracelets: Jewelry[] = [];
  under1000: Jewelry[] = [];


  constructor(private cartService: CartService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const ringCategory: Category = { id: 1, name: 'Ring' };
    const necklaceCategory: Category = { id: 2, name: 'Necklace' };
    const braceletCategory: Category = { id: 3, name: 'Bracelet' };
    const earringCategory: Category = { id: 4, name: 'Earring' };


    this.categories = [ringCategory, necklaceCategory, braceletCategory, earringCategory];

    this.jewelries = [
      {
        id: 1,
        name: 'Nemesacél Karperec .45 Kaliberrel',
        description: 'Polírozott nemesacél karperec kilőtt .45 kaliberű lőszerrel és mélylila Swarovski kristállyal díszítve. Antiallergén, érzékeny bőrre is ideális.',
        price: 5990,
        imageUrl: 'assets/karperec-45.jpg',
        category: braceletCategory
      },
      {
        id: 2,
        name: '9mm Karkötő Swarovski Kristállyal',
        description: 'Polírozott nemesacél karkötő kilőtt 9mm lőszerrel és Swarovski kristállyal. Antiallergén, érzékeny bőrre is ideális.',
        price: 5190,
        imageUrl: 'assets/karkoto-9mm.jpeg',
        category: braceletCategory
      },
      {
        id: 3,
        name: '7x62 Lógós Fülbevaló - Gyémántfehér',
        description: 'Polírozott nemesacél lógós fülbevaló kilőtt 7x62mm lőszerrel és gyémántfehér Swarovski kristállyal. Antiallergén, érzékeny bőrre is ideális.',
        price: 5390,
        imageUrl: 'assets/fulbevalo-7x62.jpeg',
        category: earringCategory
      },
      {
        id: 4,
        name: '9mm Bedugós Fülbevaló Ezüst Színű',
        description: 'Polírozott nemesacél bedugós fülbevaló kilőtt 9mm lőszerrel és Swarovski kristállyal. Antiallergén, érzékeny bőrre is ideális.',
        price: 4190,
        imageUrl: 'assets/bedugos-9mm.jpeg',
        category: earringCategory
      },
      {
        id: 5,
        name: '16 Köves Óraalkatrész Szett',
        description: 'Nemesacél alapon opál kristályokkal díszített ékszerszett, mely egy 16 köves óraszerkezet felhasználásával készült. A medál 45 cm-es nemesacél láncon van.',
        price: 10990,
        imageUrl: 'assets/oraalkatresz-szett.jpeg',
        category: necklaceCategory
      },
      {
        id: 6,
        name: 'Sörétes Hüvely Medál – Türkiz',
        description: 'Kilőtt sörétes lőszerhüvely Swarovski türkizkék kristállyal díszítve, 50 cm-es bőrhatású fekete láncon. Egyedi statement darab.',
        price: 4990,
        imageUrl: 'assets/soretes-turkiz.jpeg',
        category: necklaceCategory
      },
      {
        id: 7,
        name: 'Fekete 9mm Fülbevaló – Jet Hematit',
        description: 'Elegáns, sötét tónusú bedugós fülbevaló kilőtt 9mm lőszerből, jet hematit Swarovski kristállyal. Antiallergén nemesacél alapon.',
        price: 4290,
        imageUrl: 'assets/fulbevalo-jet.jpeg',
        category: earringCategory
      },
      {
        id: 8,
        name: 'Lőszer Kaliberes Medál – Akasztóval',
        description: 'Szálcsiszolt, kilőtt lőszerből készült nemesacél medál, akasztóval, bőrhatású nyakláncon. Minimalista és vagány.',
        price: 3890,
        imageUrl: 'assets/medal-loszer.jpeg',
        category: necklaceCategory
      },
      {
        id: 9,
        name: 'Rózsaszín Kristályos Bedugós 9mm',
        description: 'Nőies és finom megjelenésű 9mm lőszerből készült bedugós fülbevaló rózsaszín Swarovski kristállyal. Ajándéknak is tökéletes.',
        price: 4190,
        imageUrl: 'assets/bedugos-rozsaszin.jpeg',
        category: earringCategory
      },
      {
        id: 10,
        name: 'Swarovski Charm Karkötő – Kristályfehér',
        description: 'Swarovski kristályos charm karkötő nemesacél lánccal és kilőtt hüvelyekből készült díszekkel. Letisztult, mégis erőteljes stílus.',
        price: 6390,
        imageUrl: 'assets/charm-karkoto.jpeg',
        category: braceletCategory
      },
      {
        id: 11,
        name: 'Áttetsző Swarovski Fülbevaló – 7.62',
        description: 'Könnyed, áttetsző Swarovski kristállyal díszített 7.62 kaliberű lőszerből készült fülbevaló. Elegáns és feltűnő darab.',
        price: 5190,
        imageUrl: 'assets/fulbevalo-atlatszo.jpeg',
        category: earringCategory
      },
      {
        id: 12,
        name: 'Dupla Medál Szett – 9mm & Óraszerkezet',
        description: 'Különleges ékszerszett: egy 9mm lőszeres medál és egy antik óraszerkezetes darab kombinálva. Bőrhatású nyakláncon.',
        price: 9790,
        imageUrl: 'assets/dupla-szett.jpeg',
        category: necklaceCategory
      }
    ];

    this.bracelets = this.jewelries
      .filter(j => j.category.name.toLowerCase() === 'bracelet')
      .slice(0, 3);

    this.under1000 = this.jewelries
      .filter(j => j.price < 6000)
      .slice(0, 3);

    this.filteredJewelries = this.jewelries;

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.applyFilters(searchTerm, this.categoryFilter);
    });
  }

  applyFilters(searchTerm: string, category: string): void {
    this.filteredJewelries = this.jewelries.filter(j => {
      const matchesSearch = !searchTerm || j.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !category || j.category.name === category;
      return matchesSearch && matchesCategory;
    });
  }

  onCategoryChange(category: string): void {
    this.categoryFilter = category;
    this.applyFilters(this.searchControl.value, category);
  }

  addToCart(jewelry: Jewelry, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.cartService.addToCart(jewelry);
  }

  openProductDetails(jewelry: Jewelry): void {
    this.dialog.open(ProductDetailsDialogComponent, {
      width: '600px',
      data: { jewelry }
    });
  }
}
