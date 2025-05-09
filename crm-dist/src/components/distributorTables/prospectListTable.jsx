import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ProspectListTable = ({ onViewDetails }) => {
    return (
        <>
            <DataTable
                value={[
                    { Nombre: 'Juan Pérez', Correo: 'juan.perez@example.com', Teléfono: '5551234567' },
                    { Nombre: 'Ana López', Correo: 'ana.lopez@example.com', Teléfono: '5559876543' },
                ]}
                stripedRows
                tableStyle={{ minWidth: '50rem' }}>
                <Column field="Nombre" header="Nombre"></Column>
                <Column field="Correo" header="Correo"></Column>
                <Column field="Teléfono" header="Teléfono"></Column>
                <Column
                    field="Acción"
                    header="Acción"
                    body={(rowData) => (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => onViewDetails(rowData)}                        
                        >
                            Ver Detalles
                        </button>
                    )}
                ></Column>
            </DataTable>
        </>
    );
};

export default ProspectListTable;