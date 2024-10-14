import { AppBar } from 'react-admin';
import Box from '@mui/material/Box';

import { Logo } from './Logo';
import CustomUserMenu from '../UserMenu';

export const MyAppBar = () => (
    <AppBar color="secondary" userMenu={<CustomUserMenu />}>
        <Box flex="1"/>
            <Logo />
        <Box flex="1" />
    </AppBar>
);