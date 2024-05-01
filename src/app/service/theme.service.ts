import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  darkModeEnabled: boolean = false;

  constructor() {
    this.darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
    this.applyTheme();
  }

  toggleDarkMode(): void {
    this.darkModeEnabled = !this.darkModeEnabled;
    localStorage.setItem('darkModeEnabled', this.darkModeEnabled.toString());
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.darkModeEnabled) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }

}
