import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Jewelry } from '../../models/jewelry.model';
import { Category } from '../../models/category.model';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { CartService } from '../../services/cart.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {
  MatCard,
  MatCardActions,
  MatCardContent
} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-store-page',
  standalone: true,
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css'],
  imports: [
    CommonModule,
    PriceFormatPipe,
    ReactiveFormsModule,
    MatCardContent,
    MatCard,
    MatCardActions,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ]
})
export class StorePageComponent implements OnInit {
  categories: Category[] = [];
  allJewelries: Jewelry[] = [];
  filteredJewelries: Jewelry[] = [];
  selectedCategory: string = '';
  searchControl: FormControl = new FormControl('');

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const ringCategory: Category = { id: 1, name: 'Gyűrű' };
    const necklaceCategory: Category = { id: 2, name: 'Nyaklánc' };
    const braceletCategory: Category = { id: 3, name: 'Karkötő' };
    const earringCategory: Category = { id: 4, name: 'Fülbevaló' };


    this.categories = [ringCategory, necklaceCategory, braceletCategory, earringCategory];

    this.allJewelries = [
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

    this.filteredJewelries = this.allJewelries;

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(searchTerm => {
        this.applyFilters(searchTerm, this.selectedCategory);
      });
  }

  applyFilters(searchTerm: string, category: string): void {
    this.filteredJewelries = this.allJewelries.filter(j => {
      const matchesSearch =
        !searchTerm || j.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !category || j.category.name === category;
      return matchesSearch && matchesCategory;
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters(this.searchControl.value, category);
  }

  addToCart(jewelry: Jewelry, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.cartService.addToCart(jewelry);
  }
}
