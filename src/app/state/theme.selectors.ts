import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ThemeState } from "../models/theme.state";

// Define the feature selector for the 'theme' state
export const selectThemeState = createFeatureSelector<ThemeState>('theme');

// Create a selector to get the dark mode status
export const selectIsDarkMode = createSelector(
    selectThemeState,
    (state: ThemeState) => state.isDarkMode
  );