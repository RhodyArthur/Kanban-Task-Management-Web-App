import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {
isDarkMode$ = this.themeService.isDarkMode$;

constructor(private themeService: ThemeService) {}

ngOnInit() {
  this.themeService.loadThemeFromLocalStorage();   
}

setLightMode() {
  this.themeService.setLightMode();
}

setDarkMode() {
  this.themeService.setDarkMode();
}

toggleTheme() {
  this.themeService.toggleTheme();
}
}
