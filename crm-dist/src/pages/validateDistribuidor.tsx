import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/router";
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { ProspectDetail, ProspectListTable, AcceptedProspectsTable, DeclinedProspectsTable } from '@/components/distributorTables/'
import SidebarMenu from "@/components/sidebarMenu";
import '@/styles/tabPanel.css'


export default function Login() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login"); // Redirigir al login si no está autenticado
        }
    }, []);

    const handleSidebarToggle = (isExpanded: boolean) => {
        setIsSidebarExpanded(isExpanded);
    };

    

    return (
        <>
            <SidebarMenu onToggle={handleSidebarToggle} />

            <div className={`flex flex-col justify-center items-center min-h-screen p-6 transition-all duration-300 ${isSidebarExpanded ? 'ml-48' : 'ml-16'}`}>
                <h1 className='text-2xl mb-12'>Prospectos a Distribuidor</h1>
                <div className='bg-blue-100 w-[900px] p-4 rounded-lg'>
                    <TabView >
                        <TabPanel header="Prospectos">
                            <DataTable value={[{ Nombre: 'Lucio Rivaldi', Correo: 'rivaldo@cashcash.com', Teléfono: '8145658745' }]} stripedRows tableStyle={{ minWidth: '50rem' }}>
                                <Column field="Nombre" header="Nombre"></Column>
                                <Column field="Correo" header="Correo"></Column>
                                <Column field="Teléfono" header="Teléfono"></Column>
                                <Column
                                    field="Acción"
                                    header="Acción"
                                    body={() => (
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                            Ver Detalles
                                        </button>
                                    )}
                                ></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="Detail" disabled>
                            <ProspectDetail />
                        </TabPanel>
                        <TabPanel header="Prospectos Aceptados">
                            <AcceptedProspectsTable/>                            
                        </TabPanel>
                        <TabPanel header="Prospectos Declinados">
                            <DeclinedProspectsTable/>
                        </TabPanel>

                    </TabView>
                </div>

            </div>


        </>

    );
}