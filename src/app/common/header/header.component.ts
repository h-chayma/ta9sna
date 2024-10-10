import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  city: string = '';
  suggestions: any[] = []; 
  showSuggestions: boolean = false;

  @Output() citySearched: EventEmitter<string> = new EventEmitter<string>();

  constructor(private weatherService: WeatherService) { }

  onSearchChange(): void {
    if (this.city.length > 0) {
      this.weatherService.getCitySuggestions(this.city).subscribe(
        (data) => {
          this.suggestions = data;
          this.showSuggestions = true;
        },
        (error) => {
          console.error('Error fetching city suggestions:', error);
          this.suggestions = [];
          this.showSuggestions = false;
        }
      );
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  onSubmit(): void {
    if (this.city) {
      this.citySearched.emit(this.city); 
      this.showSuggestions = false; 
    }
  }

  selectCity(cityName: string): void {
    this.city = cityName;
    this.onSubmit();
  }
}