import React, {useState} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

const declinedProspectsTable = () => {
    const [showDialog, setShowDialog] = useState(false); // Estado para controlar el modal
    const [rejectionReason, setRejectionReason] = useState(''); // Estado para el motivo de rechazo

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
                value={[
                    { TipoPersona: 'Fisica', RazonSocial: 'Carlos Gómez', CorreoFact: 'carlos.gomez@example.com', Telefono: '5551234567', Motivo: 'No cumple con los requisitos.' },
                    { TipoPersona: 'Moral', RazonSocial: 'La Tintoreria', CorreoFact: 'maria.torres@example.com', Telefono: '5559876543', Motivo: 'Documentación incompleta.' },
                ]}
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