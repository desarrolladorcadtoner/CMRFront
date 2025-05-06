export const isAuthenticated = (): boolean => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    return !!tokenCookie; // Retorna true si el token existe
};