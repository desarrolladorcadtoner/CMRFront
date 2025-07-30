import React, { useState, useEffect } from 'react';
import SidebarMenu from "@/components/sidebarMenu";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";

export default function Statistics() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

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