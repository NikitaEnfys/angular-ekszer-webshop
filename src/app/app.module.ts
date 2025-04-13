import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { JewelryStoreComponent } from './components/jewelry-store/jewelry-store.component';
import { JewelryItemComponent } from './components/jewelry-item/jewelry-item.component';
import { JewelryFormComponent } from './components/jewelry-form/jewelry-form.component';
import { PriceFormatPipe } from './pipes/price-format.pipe';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AppComponent,
    JewelryStoreComponent,
    JewelryItemComponent,
    JewelryFormComponent,
    PriceFormatPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
