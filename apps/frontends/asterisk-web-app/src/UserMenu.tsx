// CustomUserMenu.tsx
import React from 'react';
import { UserMenu, MenuItemLink, useRedirect, Logout } from 'react-admin';
import SettingsIcon from '@mui/icons-material/Settings';

const CustomUserMenu = (props: any) => {
    const redirect = useRedirect();

    return (
        <UserMenu {...props}>
            {/* Add your custom Preferences menu item */}
            <MenuItemLink
                to="/preferences"
                primaryText="Preferences"
                leftIcon={<SettingsIcon />}
                onClick={() => redirect('/preferences')}
            />
            <Logout />
        </UserMenu>
    );
};

export default CustomUserMenu;
