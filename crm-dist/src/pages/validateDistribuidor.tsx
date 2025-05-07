import React, { useState, useEffect } from 'react';
import SidebarMenu from "@/components/sidebarMenu";
import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/router";
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '@/styles/tabPanel.css'
import ProspectDetail from '@/components/prospectDetail';

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
                <div className='bg-blue-100 w-[840px] p-4 rounded-lg'>
                    <TabView >
                        <TabPanel header="Prospectos">
                            <DataTable value={[{ Nombre: 'Lucio Rivaldi', Correo: 'rivaldo@cashcash.com', Teléfono: '8145658745'}]} stripedRows tableStyle={{ minWidth: '50rem' }}>
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
                        <TabPanel header="Header II">
                            <ProspectDetail />
                        </TabPanel>
                        <TabPanel header="Header III">
                            <p className="m-0">
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                                quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                                culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                            </p>
                        </TabPanel>
                        <TabPanel header="Detail" disabled></TabPanel>
                    </TabView>
                </div>

            </div>


        </>

    );
}