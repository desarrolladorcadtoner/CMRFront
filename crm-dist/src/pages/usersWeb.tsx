import React, { useState, useEffect } from "react";
import SidebarMenu from "@/components/sidebarMenu";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import axios from "axios";
import { useRouter } from "next/router";

//const idsClientes = [158432, 428, 420, 168442, 14596, 4586]; // <-- Aquí pon los IDs reales que quieras mostrar, hasta 100
type Distribuidor = {
    IdDistribuidor: number;
    RFC: string;
    RazonSocial: string;
    CorreoFact: string;
    TipoPersona: string;
    Calle: string;
    Colonia: string;
    Municipio: string;
    Estado: string;
    CP: string;
};

const UsersWeb = () => {
    const [clientes, setClientes] = useState<any[]>([]);
    const [selectedCliente, setSelectedCliente] = useState<any | null>(null);
    const [filtroRFC, setFiltroRFC] = useState("");
    const [filtroIdDistribuidor, setFiltroIdDistribuidor] = useState("");
    const [filtroNombre, setFiltroNombre] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await axios.get<Distribuidor[]>("http://172.100.203.202:8001/distribuidores/siscad/existentes");
            setClientes(response.data);
        } catch (error) {
            console.error("❌ Error al obtener distribuidores:", error);
        }
    };

    // Buscar por RFC
    const buscarPorRFC = async () => {
        try {
            const response = await axios.get<Distribuidor[]>(`http://172.100.203.202:8001/distribuidores/siscad/buscar/rfc/${filtroRFC}`);
            setClientes([response.data[0]]);
        } catch (error) {
            console.error("❌ Error al buscar por RFC:", error);
            setClientes([]);
        }
    };
    
    const buscarPorId = async () => {
        try {
            const response = await axios.get<Distribuidor[]>(`http://172.100.203.202:8001/distribuidores/siscad/buscar/id/${filtroIdDistribuidor}`);
            setClientes([response.data[0]]);
        } catch (error) {
            console.error("❌ Error al buscar por RFC:", error);
            setClientes([]);
        }
    };

    // Buscar por Nombre
    const buscarPorNombre = async () => {
        try {
            const response = await axios.get<Distribuidor[]>(`http://172.100.203.202:8001/distribuidores/siscad/buscar/nombre/${filtroNombre}`);
            setClientes(response.data);
        } catch (error) {
            console.error("❌ Error al buscar por nombre:", error);
            setClientes([]);
        }
    };

    // Columna botón de detalles
    const detalleTemplate = (rowData: any) => (
        <>
            <Button
                icon="pi pi-eye"
                className="p-button-text p-button-rounded"
                onClick={() => router.push(`/dataClient/${rowData.IdDistribuidor}`)}
                data-pr-tooltip="Ver detalles"
            />
            <Tooltip target=".p-button" />
        </>
    );

    return (
        <>
            <SidebarMenu onToggle={() => { }} />
            <div className="container min-w-screen min-h-screen bg-cyan-50 flex flex-col items-center py-10">
                <h1 className="text-3xl font-bold mb-6">Distribuidores Existentes</h1>

                <div className="flex flex-wrap max-w-xl gap-2 mb-6">
                    <span className="p-input-icon-left">
                        {/*<i className="pi pi-search" />*/}
                        <InputText
                            placeholder="Buscar por RFC"
                            value={filtroRFC}
                            onChange={e => setFiltroRFC(e.target.value)}
                        />
                    </span>
                    <Button label="Buscar RFC" onClick={buscarPorRFC} className="p-button-sm" />

                    <span className="p-input-icon-left">
                        {/*<i className="pi pi-search" />*/}
                        <InputText
                            placeholder="Buscar por Id de distribuidor"
                            value={filtroIdDistribuidor}
                            onChange={e => setFiltroIdDistribuidor(e.target.value)}
                        />
                    </span>
                    <Button label="Buscar Id Distribuidor" onClick={buscarPorId} className="p-button-sm" />

                    <span className="p-input-icon-left">
                        {/*<i className="pi pi-search" />*/}
                        <InputText
                            placeholder="Buscar por Nombre"
                            value={filtroNombre}
                            onChange={e => setFiltroNombre(e.target.value)}
                        />
                    </span>
                    <Button label="Buscar Nombre" onClick={buscarPorNombre} className="p-button-sm" />

                    <Button
                        label="Limpiar"
                        icon="pi pi-times"
                        className="p-button-secondary p-button-sm"
                        onClick={() => {
                            setFiltroRFC("");
                            setFiltroIdDistribuidor("");
                            setFiltroNombre("");
                            fetchClientes(); // recarga todo
                        }}
                    />
                </div>

                <div className="w-full max-w-5xl shadow-xl rounded-2xl bg-white p-6">
                    <DataTable
                        value={clientes}
                        className="p-datatable-sm"
                        paginator rows={10}
                        stripedRows
                        responsiveLayout="scroll"
                        emptyMessage="Cargando usuarios o ninguno encontrado"
                    >
                        <Column field="IdDistribuidor" header="ID Distribuidor" />
                        <Column field="RFC" header="RFC" />
                        <Column field="RazonSocial" header="Nombre" />
                        <Column field="CorreoFact" header="Correo" />
                        <Column field="TipoPersona" header="Tipo Cliente" />
                        <Column body={detalleTemplate} header="Detalles" style={{ textAlign: 'center', width: '7rem' }} />
                    </DataTable>
                </div>

                {/* Detalle del usuario seleccionado */}
                {selectedCliente && (
                    <Card title={`Detalles de ${selectedCliente.RazonSocial}`} className="mt-8 w-full max-w-3xl shadow-2xl bg-white rounded-xl">
                        <div className="grid grid-cols-1 gap-4 p-4">
                            <div>
                                <h3 className="font-bold text-lg mb-2">Datos Generales</h3>
                                <p><b>ID:</b> {selectedCliente.IdDistribuidor}</p>
                                <p><b>RFC:</b> {selectedCliente.RFC}</p>
                                <p><b>Nombre cliente:</b> {selectedCliente.RazonSocial}</p>
                                <p><b>Tipo Cliente:</b> {selectedCliente.TipoPersona}</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Dirección: </h3>
                                <p><b>Calle:</b> {selectedCliente.Calle}</p>
                                <p><b>Colonia:</b> {selectedCliente.Colonia}</p>
                                <p><b>Municipio:</b> {selectedCliente.Municipio}</p>
                                <p><b>Código Postal:</b> {selectedCliente.CP}</p>
                                <p><b>Estado:</b> {selectedCliente.Estado}</p>
                            </div>
                            {/*<div className="mt-4">
                                <h3 className="font-bold text-lg mb-2">Dirección Entrega</h3>
                                <p><b>Calle:</b> {selectedCliente.DireccionesEntrega[0]?.Calle}</p>
                                <p><b>Colonia:</b> {selectedCliente.DireccionesEntrega[0]?.Colonia}</p>
                                <p><b>Municipio:</b> {selectedCliente.DireccionesEntrega[0]?.Municipio}</p>
                                <p><b>Estado:</b> {selectedCliente.DireccionesEntrega[0]?.Estado}</p>
                                <p><b>País:</b> {selectedCliente.DireccionesEntrega[0]?.Pais}</p>
                            </div>*/}
                            {/*<div className="mt-4">
                                <h3 className="font-bold text-lg mb-2">Datos de Compra</h3>
                                <p><b>Limite de Credito: </b> {selectedCliente.DatosCompras.LimiteCredito}</p>
                                <p><b>Dias del Credito: </b> {selectedCliente.DatosCompras.DiasCredito}</p>
                                <p><b>Descuento Autorizado: </b> {selectedCliente.DatosCompras.DescuentoAutorizado}</p>
                            </div>*/}
                            <div className="col-span-2 mt-4 flex justify-end">
                                <Button label="Cerrar" icon="pi pi-times" className="p-button-danger" onClick={() => setSelectedCliente(null)} />
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
};

export default UsersWeb;
