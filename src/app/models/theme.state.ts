// define theme state
export interface ThemeState {
    // mode: 'light-mode' | 'dark-mode';
    isDarkMode: boolean;
}
  
export const initialThemeState: ThemeState = {
    // mode: 'light-mode'
    isDarkMode: false
};
  