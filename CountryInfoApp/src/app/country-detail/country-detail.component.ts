import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  country: any;
  holidays: any[] = [];
  currentYear: number = new Date().getFullYear();
  availableYears: number[] = Array.from({ length: 11 }, (_, i) => this.currentYear - 5 + i);
  apiKey: string = 'VDuRQsRt6wuVSjmHQVTQr7LCD5mRngs';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const countryCode = this.route.snapshot.paramMap.get('code') || '';
    this.http.get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .subscribe((data: any) => {
        this.country = data[0];
        console.log(this.country);
        this.getHolidays(countryCode);
      });
  }

getHolidays(countryCode: string): void {
    console.log(`Fetching holidays for country code: ${countryCode} and year: ${this.currentYear}`);
    
    this.http.get(`https://calendarific.com/api/v2/holidays?&api_key=VDuRQStR6wuVSJmHQVTQr7LCD5mRngs&country=${countryCode}&year=${this.currentYear}`)
      .subscribe(
        (response: any) => {
          console.log('API response:', response);  // Виводимо весь результат
          if (response && response.response && response.response.holidays) {
            this.holidays = response.response.holidays;
            console.log('Holidays data:', this.holidays);  // Виводимо список свят
          } else {
            this.holidays = [];
            console.log('No holidays found for this country and year.');
          }
        },
        (error: any) => {
          console.error('API Error:', error);  // Виводимо будь-яку помилку
          this.holidays = [];
        }
      );
}


  onYearChange(year: number): void {
    this.currentYear = year;
    const countryCode = this.route.snapshot.paramMap.get('code') || '';
    this.getHolidays(countryCode);
  }

  getLanguages(languages: any): string {
    return Object.values(languages).join(', ');
  }
}
