// src/components/LogoutButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import { logout } from '../../utils/auth';

const LogoutButton: React.FC = () => {
    return (
        <Button
            onClick={logout}
            color="inherit"
        >
            ログアウト
        </Button>
    );
};

export default LogoutButton;
