import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchTerm: string = '';
  countries: any[] = [];
  randomCountries: any[] = [];
  holidays: { [key: string]: any[] } = {};
  noHolidaysMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getRandomCountries();
  }

  searchCountry() {
    const apiUrl = `https://restcountries.com/v3.1/name/${this.searchTerm}`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.countries = data;
    });
  }

  getRandomCountries(): void {
    this.http
      .get('https://restcountries.com/v3.1/all')
      .subscribe((data: any) => {
        this.randomCountries = this.shuffleArray(data).slice(0, 3);
        this.randomCountries.forEach((country) => {
          this.getHolidays(country.cca2);
        });
      });
  }

  getHolidays(countryCode: string): void {
    const apiUrl = `https://date.nager.at/api/v3/PublicHolidays/2024/${countryCode}`;

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (data && Array.isArray(data) && data.length > 0) {
          this.holidays[countryCode] = data;
        } else {
          this.holidays[countryCode] = [];
          this.showNoHolidaysMessage(countryCode);
        }
      },
      (error) => {
        if (error.status === 404) {
          this.holidays[countryCode] = [];
          this.showNoHolidaysMessage(countryCode);
        } else {
          console.error('Error occurred while fetching holidays:', error);
        }
      },
    );
  }

  showNoHolidaysMessage(countryCode: string): void {
    this.noHolidaysMessage = `Holidays for the country with the code ${countryCode} not found for 2024.`;
  }

  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
