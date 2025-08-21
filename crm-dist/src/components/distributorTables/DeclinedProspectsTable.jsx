import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

const declinedProspectsTable = () => {
    const [showDialog, setShowDialog] = useState(false); // Estado para controlar el modal
    const [rejectionReason, setRejectionReason] = useState(''); // Estado para el motivo de rechazo
    const [prospects, setProspects] = useState([]);

    useEffect(() => {
        const fetchProspects = async () => {
            try {
                const response = await fetch('http://172.100.203.202:8001/prospecto/distribuidores/prospectosdist?status=Rechazado');
                if (!response.ok) {
                    throw new Error('Error al obtener los prospectos');
                }
                const data = await response.json();
                setProspects(data); // Guardar los datos obtenidos en el estado
            } catch (error) {
                console.error('Error al cargar los prospectos:', error);
            }
        };

        fetchProspects();
    }, []);

    const openRejectionDialog = (reason) => {
        setRejectionReason(reason);
        setShowDialog(true);
    };

    const closeRejectionDialog = () => {
        setShowDialog(false);
        setRejectionReason('');
    };



    return (
        <>
            <h1 className="text-xl mb-4">Información de Prospectos Declinados</h1>
            <DataTable
                value={prospects}
                stripedRows
                tableStyle={{
                    minWidth: '50rem',
                    border: '1px solid #d1d5db', // Borde gris claro
                    opacity: 0.7, // Apariencia deshabilitada
                }}
            >
                <Column field="TipoPersona" header="Tipo Persona"></Column>
                <Column field="RazonSocial" header="Razon Social"></Column>
                <Column field="CorreoFact" header="Correo"></Column>
                <Column field="Telefono" header="Teléfono"></Column>
                <Column
                    header="Acción"
                    body={(rowData) => (
                        <div className="flex justify-center items-center">
                            <i
                                className={`pi pi-comment text-gray-500 cursor-pointer hover:text-gray-700`}
                                onClick={() => openRejectionDialog(rowData.Motivo)}
                            ></i>
                        </div>
                    )}
                ></Column>
            </DataTable>

            {/* Modal para mostrar el motivo de rechazo */}
            <Dialog
                header="Motivo de Rechazo"
                visible={showDialog}
                style={{ width: '30vw' }}
                onHide={closeRejectionDialog}
            >
                <p>{rejectionReason}</p>
            </Dialog>
        </>
    );
};

export default declinedProspectsTable;