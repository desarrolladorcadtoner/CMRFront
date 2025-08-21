import React, {useState, useEffect} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const acceptedProspectsTable = () => {
    const [prospects, setProspects] = useState([]);
    
        useEffect(() => {
            const fetchProspects = async () => {
                try {
                    const response = await fetch('http://172.100.203.202:8001/prospecto/distribuidores/prospectosdist?status=Aceptado');
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
            <h1 className="text-xl mb-4">Información de Prospectos Aceptados</h1>
            <DataTable
                value={prospects} 
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