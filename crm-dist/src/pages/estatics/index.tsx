import React, { useState, useEffect } from 'react';
import SidebarMenu from "@/components/sidebarMenu";
import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/router";

export default function Statistics() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    //router.push("/login"); 
    if (!isAuthenticated()) {
      router.push("/login"); // Redirigir al login si no está autenticado
    }
  }, []);

  const handleSidebarToggle = (isExpanded: boolean) => {
    setIsSidebarExpanded(isExpanded);
  };

  return (
    <div className="flex">
      {/* Sidebar fijo */}
      <SidebarMenu onToggle={handleSidebarToggle} />
      <div className={`flex flex-col p-6 transition-all duration-300 ${isSidebarExpanded ? 'ml-48' : 'ml-16'
        }`}>
        <h1 className="text-2xl font-bold">Statistics</h1>
        <p>Here you can display statistics or charts related to your data.</p>
      </div>
    </div>
  );
}