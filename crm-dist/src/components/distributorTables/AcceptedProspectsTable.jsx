import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const acceptedProspectsTable = () => {
    return (
        <>
            <h1 className="text-xl mb-4">Información de Prospectos Aceptados</h1>
            <DataTable
                value={[
                    { Nombre: 'Juan Pérez', Correo: 'juan.perez@example.com', Teléfono: '5551234567' },
                    { Nombre: 'Ana López', Correo: 'ana.lopez@example.com', Teléfono: '5559876543' },
                ]}
                stripedRows
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column field="Nombre" header="Nombre"></Column>
                <Column field="Correo" header="Correo"></Column>
                <Column field="Teléfono" header="Teléfono"></Column>
                <Column
                    header="Acción"
                    body={() => (
                        <a
                            href="#"
                            className="text-blue-500 underline hover:text-blue-700"
                        >
                            Ver Información
                        </a>
                    )}
                ></Column>
            </DataTable>
        </>
        
    );
};

export default acceptedProspectsTable;