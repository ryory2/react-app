// src/utils/auth.ts
export const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
};
