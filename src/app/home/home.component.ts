import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentWeather: any;
  location: any;
  forecast: any[] = [];
  hourlyForecast: any[] = [];
  city: string = 'tunisia';
  currentDate: string = '';
  currentDay: string = '';
  currentTime: string = '';
  greetingMessage: string = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.fetchWeather();
    this.setCurrentDateAndDay();
    this.setCurrentTime();
  }

  setCurrentTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.setGreeting(now.getHours());
  }

  setGreeting(hour: number): void {
    if (hour < 12) {
      this.greetingMessage = 'Good Morning!';
    } else if (hour < 18) {
      this.greetingMessage = 'Good Afternoon!';
    } else {
      this.greetingMessage = 'Good Evening!';
    }
  }

  setCurrentDateAndDay(): void {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.currentDate = today.toLocaleDateString('en-US', options);
    this.currentDay = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  }

  fetchWeather(): void {
    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.currentWeather = data.current;
        this.location = data.location;
        this.forecast = data.forecast.forecastday;
        this.hourlyForecast = data.forecast.forecastday[0].hour;
        this.setBackground();
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  setBackground(): void {
    const isDay = this.currentWeather?.is_day;
    if (isDay) {
      document.body.style.backgroundImage = "url('assets/day_sky.jpg')";
    } else {
      document.body.style.backgroundImage = "url('assets/night_sky.jpg')";
    }
  }


  onCitySearched(newCity: string): void {
    this.city = newCity;
    this.fetchWeather();
  }

  getFullWindDirection(abbreviation: string): string {
    const directions: { [key: string]: string } = {
      'N': 'North',
      'NE': 'Northeast',
      'E': 'East',
      'SE': 'Southeast',
      'S': 'South',
      'SW': 'Southwest',
      'W': 'West',
      'NW': 'Northwest'
    };
    return directions[abbreviation] || abbreviation;
  }
}