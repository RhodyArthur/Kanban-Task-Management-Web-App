import { createReducer, on } from "@ngrx/store";
import { ThemeState, initialThemeState } from "../models/theme.state";
import { setDarkMode, setLightMode, toggleTheme } from "./theme.actions";

// define interface
// set initial state


// create reducer
export const themeReducer = createReducer(
    initialThemeState,
    on(setLightMode, (state) => ({ ...state, isDarkMode: false })),
    on(setDarkMode, (state) => ({ ...state, isDarkMode: true })),
    on(toggleTheme, state => ({isDarkMode: !state.isDarkMode}))
);
