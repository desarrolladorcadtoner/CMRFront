import React, { useState, useEffect } from 'react';
import SidebarMenu from "@/components/sidebarMenu";
import Image from "next/image";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";

export default function Login() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [formData, setFormData] = useState({
        us_idusr: '',
        us_nom: '',
        us_psw: '',
        us_depto: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();
    const {isAuthenticated} = useAuth();

    /*useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login"); // Redirigir al login si no está autenticado
        }
    }, [isAuthenticated]);*/

    const handleSidebarToggle = (isExpanded: boolean) => {
        setIsSidebarExpanded(isExpanded);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

   /*const handleSubmit = async () => {
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch("http://172.100.203.36:8001/login/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al registrar el usuario");
            }

            setSuccess("Usuario registrado exitosamente.");
            setFormData({ us_idusr: '', us_nom: '', us_psw: '', us_depto: '' }); // Limpiar formulario
        } catch (err: any) {
            setError(err.message);
        }
    };*/

    return (
        <>
            <SidebarMenu onToggle={handleSidebarToggle} />
            {/* Div background con posición absoluta */}

            <div className="container min-w-screen min-h-screen flexjustify-center items-center bg-cyan-50 flex flex-col justify-center items-center">

                {/*<Image
                    src="/images/Background_cadToner.png"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="absolute top-0 left-0 w-full h-full opacity-20 z-0"
                />*/}

                {/* Div boxLogin */}
                <div className="boxLogin relative w-[900px] h-[600px] shadow-xl rounded-xl bg-white flex flex-row justify-center items-center z-10">
                    <div className="imageCadToner rounded-tl-lg rounded-bl-lg w-[500px] h-full flex justify-center items-center bg-gradient-to-br from-[#0b4468] to-[#0072b1]">
                        <Image
                            src="/images/logo-cadtoner.png"
                            alt="Logo"
                            width={250}
                            height={250}
                            className="rounded-tl-lg rounded-bl-lg"
                        />
                    </div>

                    <div className="formLogin w-[400px] pt-8 h-full flex flex-col justify-start items-center">
                        <h1 className="mb-8 text-3xl">Create user</h1>

                        <div className="inputs flex flex-col h-[450px]">
                            <label htmlFor="us_nom" className="mb-2">Nombre</label>
                            <input
                                id="us_nom"
                                value={formData.us_nom}
                                onChange={handleInputChange}
                                className="p-inputtext p-component w-[250px]"
                            />
                            <label htmlFor="us_depto" className="mb-2 mt-6">Departamento</label>
                            <input
                                id="us_depto"
                                value={formData.us_depto}
                                onChange={handleInputChange}
                                className="p-inputtext p-component w-[250px]"
                            />
                            <label htmlFor="us_idusr" className="mb-2 mt-6">Usuario</label>
                            <input
                                id="us_idusr"
                                value={formData.us_idusr}
                                onChange={handleInputChange}
                                className="p-inputtext p-component w-[250px]"
                            />

                            <label htmlFor="us_psw" className="mb-2 mt-6">Password</label>
                            <input
                                id="us_psw"
                                type="password"
                                value={formData.us_psw}
                                onChange={handleInputChange}
                                className="p-inputtext p-component w-[250px]"
                            />
                            {error && <p className="text-red-500 mt-4">{error}</p>}
                            {success && <p className="text-green-500 mt-4">{success}</p>}

                            <Button style={{ marginTop: '2rem' }} label="Create User" /*onClick={handleSubmit} *//>
                        </div>

                    </div>
                </div>
            </div>


        </>

    );
}
