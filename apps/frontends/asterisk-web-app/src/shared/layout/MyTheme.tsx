import { defaultTheme } from 'react-admin'
import red from '@mui/material/colors/red';

const sidebar = {
    width: 150,
    closedWidth: 50,
}

export const myLightTheme = {
    ...defaultTheme,
    palette: {
        primary: { main: '#161616' },
        secondary: { main: '#db0909' },
        background: { default: '#f5f3eb' },
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: {
        fontFamily: ['Lato', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
        // Use the system font instead of the default Roboto font.
        //fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
    },
    sidebar,
};

export const myDarkTheme = {
    ...defaultTheme,
    palette: {
        primary: { main: '#db0909' },
    },
    typography: {
        fontFamily: ['Lato', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
        // Use the system font instead of the default Roboto font.
        //fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
    },
    sidebar,
};

