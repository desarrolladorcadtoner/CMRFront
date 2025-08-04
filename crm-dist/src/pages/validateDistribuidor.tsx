import React, { useState, useEffect } from 'react';
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import { TabView, TabPanel } from 'primereact/tabview';
import { ProspectDetail, ProspectListTable, AcceptedProspectsTable, DeclinedProspectsTable } from '@/components/distributorTables/';
import SidebarMenu from "@/components/sidebarMenu";
import { FaUserTie, FaClipboardList, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "@/styles/tabPanel.css";

export default function ValidateDistribuidor() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDetailEnabled, setIsDetailEnabled] = useState(false);
    const [selectedRfcDistribuidor, setSelectedRfcDistribuidor] = useState<string | null>(null);
    //const { isAuthenticated } = useAuth();

    const router = useRouter();

    /*useEffect(() => {
        if (isAuthenticated === false) {
            router.push("/login");
        }
    }, [isAuthenticated]);*/

    const handleSidebarToggle = (isExpanded: boolean) => {
        setIsSidebarExpanded(isExpanded);
    };

    const handleViewDetails = (rfcDistribuidor: string): void => {
        //console.log(rfcDistribuidor);
        setSelectedRfcDistribuidor(rfcDistribuidor);
        setIsDetailEnabled(true);
        setActiveIndex(1);
    };

    const handleTabChange = (e: { index: number; originalEvent: React.SyntheticEvent }): void => {
        setActiveIndex(e.index);
        if (e.index !== 1) {
            setIsDetailEnabled(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#f3f3f3]">
            <SidebarMenu onToggle={handleSidebarToggle} />

            <main className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? 'ml-56' : 'ml-16'} p-8`}>
                <div className="max-w-5xl mx-auto">
                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold tracking-tight text-[#0b4468] flex items-center gap-3">
                            <FaUserTie className="text-[#de1c85] text-4xl" />
                            Panel de Prospectos a Distribuidor
                        </h1>
                        <p className="text-lg text-gray-500 mt-2">
                            Gestiona, valida y administra prospectos, solicitudes y clientes en una sola plataforma.
                        </p>
                    </div>
                    <section className="bg-white/80 rounded-3xl shadow-xl border border-[#0072b1] p-6">
                        <TabView
                            activeIndex={activeIndex}
                            onTabChange={handleTabChange}
                            className="custom-crm-tabs"
                        >
                            <TabPanel
                                header={
                                    <span className="flex items-center gap-2">
                                        <FaClipboardList className="text-[#0072b1]" /> Prospectos
                                    </span>
                                }
                            >
                                <ProspectListTable onViewDetails={handleViewDetails} />
                            </TabPanel>
                            <TabPanel
                                header={
                                    <span className="flex items-center gap-2">
                                        <FaUserTie className="text-[#de1c85]" /> Detalle
                                    </span>
                                }
                                disabled={!isDetailEnabled}
                            >
                                <ProspectDetail rfcDistribuidor={selectedRfcDistribuidor || ""} />
                            </TabPanel>
                            <TabPanel
                                header={
                                    <span className="flex items-center gap-2">
                                        <FaCheckCircle className="text-green-600" /> Prospectos Aceptados
                                    </span>
                                }
                            >
                                <AcceptedProspectsTable />
                            </TabPanel>
                            <TabPanel
                                header={
                                    <span className="flex items-center gap-2">
                                        <FaTimesCircle className="text-[#de1c85]" /> Prospectos Declinados
                                    </span>
                                }
                            >
                                <DeclinedProspectsTable />
                            </TabPanel>
                        </TabView>
                    </section>
                </div>
            </main>
            <style jsx global>{`
                .custom-crm-tabs .p-tabview-nav {
                    background: transparent !important;
                    border: none !important;
                }
                .custom-crm-tabs .p-tabview-nav li {
                    margin-right: 0.8rem;
                }
                .custom-crm-tabs .p-tabview-nav li .p-tabview-nav-link {
                    background: #f3f3f3 !important;
                    border: 2px solid #f3f3f3 !important;
                    color: #0b4468;
                    border-radius: 12px 12px 0 0;
                    font-size: 1.1rem;
                    font-weight: 600;
                    transition: background 0.18s, color 0.18s;
                }
                .custom-crm-tabs .p-tabview-nav li.p-highlight .p-tabview-nav-link {
                    background: #fff !important;
                    color: #de1c85 !important;
                    border-bottom: 3px solid #de1c85 !important;
                    box-shadow: 0 3px 16px #de1c8540;
                }
            `}</style>
        </div>
    );
}
