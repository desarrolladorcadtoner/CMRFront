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
                    { Nombre: 'Carlos Gómez', Correo: 'carlos.gomez@example.com', Teléfono: '5551234567', Motivo: 'No cumple con los requisitos.' },
                    { Nombre: 'María Torres', Correo: 'maria.torres@example.com', Teléfono: '5559876543', Motivo: 'Documentación incompleta.' },
                ]}
                stripedRows
                tableStyle={{
                    minWidth: '50rem',
                    borderRadius: '1rem', // Bordes redondeados
                    border: '1px solid #d1d5db', // Borde gris claro
                    opacity: 0.8, // Apariencia deshabilitada
                }}
            >
                <Column field="Nombre" header="Nombre"></Column>
                <Column field="Correo" header="Correo"></Column>
                <Column field="Teléfono" header="Teléfono"></Column>
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