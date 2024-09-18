// define theme action

import { createAction } from "@ngrx/store";

// sets light mode explicitly
export const setLightMode = createAction('[Theme] Set Light Mode');

// sets dark mode explicitly
export const setDarkMode = createAction('[Theme] Set Dark Mode');

// toggle between light and dark mode
export const toggleTheme = createAction('[Theme] Toggle Theme')