import React, { useState, useEffect } from "react";
import SidebarMenu from "@/components/sidebarMenu";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const idsClientes = [410, 428, 420, 168442]; // <-- Aquí pon los IDs reales que quieras mostrar, hasta 100

const fetchCliente = async (id: number) => {
    const res = await fetch(`https://172.100.203.36:8000/genexxus/cliente/${id}`);
    if (!res.ok) return null;
    return res.json();
};

const UsersWeb = () => {
    const [clientes, setClientes] = useState<any[]>([]);
    const [selectedCliente, setSelectedCliente] = useState<any | null>(null);

    useEffect(() => {
        const loadClientes = async () => {
            // Opcional: loading state
            const data: any[] = [];
            for (let id of idsClientes) {
                const cliente = await fetchCliente(id);
                if (cliente) data.push(cliente);
            }
            setClientes(data);
        };
        loadClientes();
    }, []);

    // Columna botón de detalles
    const detalleTemplate = (rowData: any) => (
        <>
            <Button
                icon="pi pi-eye"
                className="p-button-text p-button-rounded"
                onClick={() => setSelectedCliente(rowData)}
                data-pr-tooltip="Ver detalles"
            />
            <Tooltip target=".p-button" />
        </>
    );

    return (
        <>
            <SidebarMenu onToggle={() => { }} />
            <div className="container min-w-screen min-h-screen bg-cyan-50 flex flex-col items-center py-10">
                <h1 className="text-3xl font-bold mb-6">Usuarios Web</h1>
                <div className="w-full max-w-5xl shadow-xl rounded-2xl bg-white p-6">
                    <DataTable
                        value={clientes}
                        className="p-datatable-sm"
                        paginator rows={10}
                        stripedRows
                        responsiveLayout="scroll"
                        emptyMessage="Cargando usuarios o ninguno encontrado"
                    >
                        <Column field="ClienteId" header="ID" />
                        <Column field="ClienteNombre" header="Nombre" />
                        <Column field="ClienteRFC" header="RFC" />
                        <Column field="TipoContribuyente" header="Contribuyente" />
                        <Column field="TipoCliente" header="Tipo Cliente" />
                        <Column body={detalleTemplate} header="Detalles" style={{ textAlign: 'center', width: '7rem' }} />
                    </DataTable>
                </div>

                {/* Detalle del usuario seleccionado */}
                {selectedCliente && (
                    <Card title={`Detalles de ${selectedCliente.ClienteNombre}`} className="mt-8 w-full max-w-3xl shadow-2xl bg-white rounded-xl">
                        <div className="grid grid-cols-2 gap-4 p-4">
                            <div>
                                <h3 className="font-bold text-lg mb-2">Datos Generales</h3>
                                <p><b>ID:</b> {selectedCliente.ClienteId}</p>
                                <p><b>RFC:</b> {selectedCliente.ClienteRFC}</p>
                                <p><b>Tipo Contribuyente:</b> {selectedCliente.TipoContribuyente}</p>
                                <p><b>Tipo Cliente:</b> {selectedCliente.TipoCliente}</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Datos Fiscales</h3>
                                <p><b>Razón Social:</b> {selectedCliente.DatosFiscales[0]?.RazonCapital}</p>
                                <p><b>Régimen Fiscal:</b> {selectedCliente.DatosFiscales[0]?.RegimenFiscalDescripcion}</p>
                                <p><b>Código Postal:</b> {selectedCliente.DatosFiscales[0]?.CodigoPostal}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-bold text-lg mb-2">Dirección Entrega</h3>
                                <p><b>Calle:</b> {selectedCliente.DireccionesEntrega[0]?.Calle}</p>
                                <p><b>Colonia:</b> {selectedCliente.DireccionesEntrega[0]?.Colonia}</p>
                                <p><b>Municipio:</b> {selectedCliente.DireccionesEntrega[0]?.Municipio}</p>
                                <p><b>Estado:</b> {selectedCliente.DireccionesEntrega[0]?.Estado}</p>
                                <p><b>País:</b> {selectedCliente.DireccionesEntrega[0]?.Pais}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-bold text-lg mb-2">Datos de Compra</h3>
                                <p><b>Limite de Credito: </b> {selectedCliente.DatosCompras.LimiteCredito}</p>
                                <p><b>Dias del Credito: </b> {selectedCliente.DatosCompras.DiasCredito}</p>
                                <p><b>Descuento Autorizado: </b> {selectedCliente.DatosCompras.DescuentoAutorizado}</p>
                            </div>
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
