import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeState } from '../models/theme.state';
import { Observable } from 'rxjs';
import { selectIsDarkMode } from '../state/theme.selectors';
import { setDarkMode, setLightMode, toggleTheme } from '../state/theme.actions';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDarkMode$: Observable<boolean>;

  constructor(private store: Store<ThemeState>) {
    this.isDarkMode$ = store.select(selectIsDarkMode);
    const body = document.getElementsByTagName('body')[0];
    this.isDarkMode$.subscribe((isdark) => {
      if(isdark) {
        body.classList.add('dark-mode');
      }
      else {
        body.classList.remove('dark-mode')
      }
    })
   }

   setLightMode() {
    this.store.dispatch(setLightMode());
  }

  setDarkMode() {
    this.store.dispatch(setDarkMode());
  }

  // toggle theme
  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  loadThemeFromLocalStorage() {
    const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    if (isDarkMode) {
      this.store.dispatch(toggleTheme());
    }
  }

  saveThemeToLocalStorage(isDarkMode: boolean) {
    localStorage.setItem('isDarkMode', isDarkMode.toString());
  }
}
