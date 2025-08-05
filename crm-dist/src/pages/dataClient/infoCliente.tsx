import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";

type infoDist = {
    TipoPersona: string,
    Nombre: string,
    Calle: string,
    NumExt: string,
    Colonia: string,
    Ciudad: string,
    Estado: string,
    CodigoPostal: string,
    TipoClienteId: string,
    RFC: string,
    NumContacto: string,
    Correo: string,
    RegimenSAT: string,
    RegimenDescripcion: string,
}

interface informacionProp {
    idDistribuidor: number,
    correo: string,
    setCorreo: (correo: string) => void,
    contacto: string,
    setNumContacto: (contacto: string) => void,
    informacionDist: infoDist
}

const informacionCliente: React.FC<informacionProp> = ({
    idDistribuidor,
    informacionDist,
    correo,
    setCorreo,
    contacto,
    setNumContacto
}) => {
    const handleGuardar = async () => {
        try {
            
            await axios.put(`http://172.100.203.202:8001/distribuidores/siscad/actualizar/correo/${idDistribuidor}`, {
                correo
            });

            await axios.put(`http://172.100.203.202:8001/distribuidores/siscad/actualizar/contacto/${idDistribuidor}`, {
                numContacto: contacto
            });

            alert("✅ Información actualizada correctamente.");
        } catch (error) {
            console.error("❌ Error al guardar los cambios:", error);
            alert("❌ Error al guardar los cambios");
        }
    };

    return (
        <>
            <h1 className="text-2xl mb-2 font-semibold text-[#de1c85]">Información Fiscal del Cliente</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <p><b>Tipo de Persona:</b> {informacionDist.TipoPersona}</p>
                    <p><b>Nombre:</b> {informacionDist.Nombre}</p>
                    <p><b>RFC:</b> {informacionDist.RFC}</p>
                    <p><b>Tipo Cliente ID:</b> {informacionDist.TipoClienteId}</p>
                    <p><b>Régimen Fiscal:</b> {informacionDist.RegimenSAT}</p>
                    <p><b>Descripción Régimen:</b> {informacionDist.RegimenDescripcion}</p>
                </div>
                <div className="space-y-3">
                    <p><b>Calle:</b> {informacionDist.Calle} #{informacionDist.NumExt}</p>
                    <p><b>Colonia:</b> {informacionDist.Colonia}</p>
                    <p><b>Ciudad:</b> {informacionDist.Ciudad}</p>
                    <p><b>Estado:</b> {informacionDist.Estado}</p>
                    <p><b>Código Postal:</b> {informacionDist.CodigoPostal}</p>
                </div>
                <div className="md:col-span-2 bg-white p-4 rounded shadow border border-gray-200">
                    <h2 className="text-xl mb-3 font-medium">Datos Editables</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-1">Correo</label>
                            <InputText value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full" />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Número de Contacto</label>
                            <InputText value={contacto} onChange={(e) => setNumContacto(e.target.value)} className="w-full" />
                        </div>
                    </div>
                    <div className="mt-4 text-right">
                        <Button label="Guardar Cambios" icon="pi pi-save" onClick={handleGuardar} className="p-button-success" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default informacionCliente;