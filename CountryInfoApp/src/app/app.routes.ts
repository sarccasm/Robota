import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'country/:code', component: CountryDetailComponent },
];
