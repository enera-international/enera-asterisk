import React from 'react';
import logo from './logo.png';
import logoDarkMode from './logo-dark-mode.png';
import { useTheme } from 'react-admin';

export const Logo = () => {
    const [theme, setTheme] = useTheme()
    return (
        <div>
            {theme === 'light' ? <img src={logo} alt="Logo" style={{ marginTop: '6px' }} /> : <img src={logoDarkMode} alt="Logo" style={{ marginTop: '6px' }} />}
        </div>
    );
}
