// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
        window.location.href = '/login'; // ログアウト後にリダイレクトする場合
    };

    return { isAuthenticated, logout };
};

export default useAuth;
