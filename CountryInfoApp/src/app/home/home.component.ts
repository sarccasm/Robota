import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchTerm: string = '';
  countries: any[] = [];
  randomCountries: any[] = [];
  holidays: { [key: string]: any[] } = {}; // об'єкт для зберігання свят за країнами

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
    this.http.get('https://restcountries.com/v3.1/all').subscribe((data: any) => {
      this.randomCountries = this.shuffleArray(data).slice(0, 3);
      this.randomCountries.forEach(country => {
        this.getHolidays(country.cca2);
      });
    });
  }

  getHolidays(countryCode: string): void {
    const apiUrl = `https://date.nager.at/api/v2/PublicHoliday/2024/${countryCode}`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.holidays[countryCode] = data;
    }, () => {
      this.holidays[countryCode] = []; // якщо помилка або немає даних, встановлюємо пустий масив
    });
  }

  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
