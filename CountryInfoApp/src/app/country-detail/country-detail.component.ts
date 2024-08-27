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
  styleUrls: ['./country-detail.component.css'],
})
export class CountryDetailComponent implements OnInit {
  country: any;
  holidays: any[] = [];
  currentYear: number = new Date().getFullYear();
  availableYears: number[] = Array.from(
    { length: 11 },
    (_, i) => this.currentYear - 5 + i,
  );
  apiKey: string = 'VDuRQsRt6wuVSjmHQVTQr7LCD5mRngs';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    const countryCode = this.route.snapshot.paramMap.get('code') || '';
    this.http
      .get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .subscribe((data: any) => {
        this.country = data[0];
        console.log(this.country);
        this.getHolidays(countryCode);
      });
  }
  getHolidays(countryCode: string): void {
    const apiUrl = `https://date.nager.at/api/v2/PublicHoliday/2024/${countryCode}`;

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (data && Array.isArray(data)) {
          this.holidays = data;
        } else {
          this.holidays = [];
        }
      },
      (error) => {
        console.error('Error occurred while fetching holidays:', error);
        this.holidays = [];
      },
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
