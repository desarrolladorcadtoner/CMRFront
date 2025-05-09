import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/router";
import { TabView, TabPanel } from 'primereact/tabview';

import { Dialog } from 'primereact/dialog';
import { ProspectDetail, ProspectListTable, AcceptedProspectsTable, DeclinedProspectsTable } from '@/components/distributorTables/'
import SidebarMenu from "@/components/sidebarMenu";
import '@/styles/tabPanel.css'


export default function Login() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0); // Controla el TabPanel activo
    const [isDetailEnabled, setIsDetailEnabled] = useState(false); // Controla si "Detail" está habilitado

    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login"); // Redirigir al login si no está autenticado
        }
    }, []);

    const handleSidebarToggle = (isExpanded: boolean) => {
        setIsSidebarExpanded(isExpanded);
    };

    interface ProspectRowData {
        id: number;
        name: string;
        email: string;
        phone: string;
        [key: string]: any; // Add additional fields as needed
    }

    const handleViewDetails = (rowData: ProspectRowData): void => {
        console.log("Detalles del prospecto:", rowData); // Puedes usar esta información si es necesario
        setIsDetailEnabled(true); // Habilita el TabPanel "Detail"
        setActiveIndex(1); // Cambia al TabPanel "Detail"
    };

    interface TabChangeEvent {
        index: number;
        originalEvent: React.SyntheticEvent;
    }

    const handleTabChange = (e: TabChangeEvent): void => {
        setActiveIndex(e.index);
        if (e.index !== 1) {
            setIsDetailEnabled(false); // Deshabilita "Detail" si se selecciona otro TabPanel
        }
    };
    

    return (
        <>
            <SidebarMenu onToggle={handleSidebarToggle} />

            <div className={`flex flex-col justify-center items-center min-h-screen p-6 transition-all duration-300 ${isSidebarExpanded ? 'ml-48' : 'ml-16'}`}>
                <h1 className='text-2xl mb-12'>Prospectos a Distribuidor</h1>
                <div className='bg-blue-100 w-[900px] p-4 rounded-lg shadow-xl border-2 border-[#de1c85]'>
                    <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
                        <TabPanel header="Prospectos">
                            <ProspectListTable onViewDetails={handleViewDetails} />
                        </TabPanel>
                        <TabPanel header="Detail" disabled={!isDetailEnabled}>
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