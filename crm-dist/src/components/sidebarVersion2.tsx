// Ajustes necesarios para Sidebar fijo con comportamiento expandible al hacer clic en el logo
// Version del sidebar en revision
import React, { useState, useRef } from 'react';
import { useRouter } from "next/router";
import { logout } from "@/api/auth";
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';

const SidebarMenu = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    const btnRef1 = useRef(null);

    const handleLogout = () => {
        logout();
        console.log("Cerrando sesión...");
        router.push("/");
    };

    const toggleSidebar = () => {
        setIsExpanded(prev => !prev);
    }

    return (
        <>
            <div className={`h-screen bg-white border-r transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'} fixed top-0 left-0 z-50 shadow-md`
            }>
                <div className="flex items-center justify-between p-4" >
                    <div className="flex items-center cursor-pointer" onClick={toggleSidebar} >
                        <svg width="30" height="30" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg" >
                            {/* Icono que representa el logo */}
                            < circle cx="17" cy="17" r="16" fill="#0b4468" />
                        </svg>
                        {isExpanded && <span className="ml-2 font-bold text-blue-800" > Your Logo </span>}
                    </div>
                </div>

                < ul className="px-2 mt-6 space-y-2" >
                    <li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 cursor-pointer" >
                        <i className="pi pi-home text-xl" > </i>
                        {isExpanded && <span className="text-sm" > Dashboard </span>}
                    </li>
                    < li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 cursor-pointer" >
                        <i className="pi pi-bookmark text-xl" > </i>
                        {isExpanded && <span className="text-sm" > Bookmarks </span>}
                    </li>
                    < li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 cursor-pointer" >
                        <i className="pi pi-users text-xl" > </i>
                        {isExpanded && <span className="text-sm" > Team </span>}
                    </li>
                    < li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 cursor-pointer" >
                        <i className="pi pi-calendar text-xl" > </i>
                        {isExpanded && <span className="text-sm" > Calendar </span>}
                    </li>
                    < li className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 cursor-pointer" >
                        <i className="pi pi-cog text-xl" > </i>
                        {isExpanded && <span className="text-sm" > Settings </span>}
                    </li>
                </ul>

                < div className="absolute bottom-4 left-0 w-full px-2" >
                    <div className="flex items-center justify-between p-2" >
                        <div className="flex items-center space-x-2" >
                            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                            {isExpanded && <span className="font-medium text-sm" > Amy Elsner </span>}
                        </div>
                        {isExpanded && <Button label="Logout" icon="pi pi-sign-out" onClick={handleLogout} className="p-button-sm p-button-text text-red-500" />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarMenu;
