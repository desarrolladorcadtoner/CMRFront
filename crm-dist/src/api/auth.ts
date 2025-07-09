export const login = async (usuario: string, password: string) => {
    const API_URL = "http://localhost:8001/login/login";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error del servidor:", errorData);
            throw new Error(errorData.message || "Error al iniciar sesión");
        }

        const data = await response.json();
        console.log("Respuesta:", data.token); // Verifica el token recibido

        // Guardar el token en una cookie (esto debe hacerse desde el servidor para HttpOnly)
        document.cookie = `token=${data.token}; path=/; max-age=5000; SameSite=Strict`;

        return data;
    } catch (error: any) {
        throw new Error(error.message || "Error al iniciar sesión");
    }

};

export const logout = () => {
    // Eliminar el token de las cookies
    document.cookie = "token=; Max-Age=0; path=/; Secure; SameSite=Strict;";
    console.log("Sesión cerrada. Token eliminado.");
};