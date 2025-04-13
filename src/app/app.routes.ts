import { Routes } from '@angular/router';
import { JewelryStoreComponent } from './components/jewelry-store/jewelry-store.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import {StorePageComponent} from './components/store-page/store-page.component';

export const routes: Routes = [
  { path: '', component: JewelryStoreComponent },
  { path: 'store', component: StorePageComponent },

  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
