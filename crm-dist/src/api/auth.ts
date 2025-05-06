export const login = async (username: string, password: string) => {
    const API_URL = "http://172.100.203.36:8001/login/login";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Asegúrate de incluir este encabezado
            },
            body: JSON.stringify({ username, password }), // Envía los datos en el formato correcto
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error del servidor:", errorData); // Muestra el error del servidor
            throw new Error(errorData.message || "Error al iniciar sesión");
        }

        const data = await response.json();

        // Guardar el token en una cookie HttpOnly (esto debe hacerse desde el servidor)
        document.cookie = `token=${data.token}; HttpOnly; Secure; SameSite=Strict;`;

        return data;
    } catch (error: any) {
        throw new Error(error.message || "Error al iniciar sesión");
    }
};