import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'aef27df0a2814d73b62184714241501';
  private baseUrl = 'https://api.weatherapi.com/v1';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${city}`);
  }

  getCitySuggestions(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search.json?key=${this.apiKey}&q=${query}`);
  }
}
