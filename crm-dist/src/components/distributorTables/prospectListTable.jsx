import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ProspectListTable = ({ onViewDetails }) => {
    const [prospects, setProspects] = useState([]);

    useEffect(() => {
        const fetchProspects = async () => {
            try {
                const response = await fetch('http://172.100.203.36:8001/register/distribuidores/prospectosdist');
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
    
    return (
        <>
            <DataTable
                value={prospects} // Usar los datos obtenidos de la API
                stripedRows
                tableStyle={{ minWidth: '50rem' }}>
                <Column field="TipoPersona" header="Tipo Persona"></Column>
                <Column field="RazonSocial" header="Razon Social"></Column>
                <Column field="CorreoFact" header="Correo"></Column>
                <Column field="Telefono" header="Teléfono"></Column>
                <Column
                    field="Acción"
                    header="Acción"
                    body={(rowData) => (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() =>{
                                onViewDetails(rowData.RFC)}}                        
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