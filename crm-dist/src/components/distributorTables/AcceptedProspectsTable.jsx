import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const acceptedProspectsTable = () => {
    return (
        <>
            <h1 className="text-xl mb-4">Información de Prospectos Aceptados</h1>
            <DataTable
                value={[
                    { TipoPersona: 'Fisica', RazonSocial: 'Juan Perez', CorreoFact: 'juan.perez@example.com', Telefono: '5551234567' },
                    { TipoPersona: 'Moral', RazonSocial: 'Piezas Raul', CorreoFact: 'contacto@piezasraul.com', Telefono: '4448951263' },
                ]}
                stripedRows
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column field="TipoPersona" header="Tipo Persona"></Column>
                <Column field="RazonSocial" header="Razon Social"></Column>
                <Column field="CorreoFact" header="Correo"></Column>
                <Column field="Telefono" header="Teléfono"></Column>
            </DataTable>
        </>

    );
};

export default acceptedProspectsTable;