import React, { useState, useEffect } from 'react';
import SidebarMenu from "@/components/sidebarMenu";

export default function Statistics() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    const handleSidebarToggle = (isExpanded: boolean) => {
        setIsSidebarExpanded(isExpanded);
    };

    return (
        <div className="flex">
            {/* Sidebar fijo */}
            <SidebarMenu onToggle={handleSidebarToggle} />
            <div className={`flex flex-col p-6 transition-all duration-300 ${isSidebarExpanded ? 'ml-48' : 'ml-16'
                }`}>
                <h1 className="text-2xl font-bold">Questions</h1>
                <p>This is the Questions page.</p>
            </div>
        </div>
    );
}