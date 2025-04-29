import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SidebarMenu from "@/components/sidebarMenu";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

export default function Login() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSidebarToggle = (isExpanded: boolean) => {
    setIsSidebarExpanded(isExpanded);
  };

  // Datos simulados
  const mockProducts: Product[] = [
    {
      id: "1",
      code: "P001",
      name: "Laptop",
      description: "High-performance laptop",
      image: "laptop.jpg",
      price: 1200,
      category: "Electronics",
      quantity: 10,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "2",
      code: "P002",
      name: "Smartphone",
      description: "Latest model smartphone",
      image: "smartphone.jpg",
      price: 800,
      category: "Electronics",
      quantity: 20,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "3",
      code: "P003",
      name: "Headphones",
      description: "Noise-cancelling headphones",
      image: "headphones.jpg",
      price: 200,
      category: "Accessories",
      quantity: 15,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "4",
      code: "P004",
      name: "Monitor",
      description: "4K Ultra HD monitor",
      image: "monitor.jpg",
      price: 300,
      category: "Electronics",
      quantity: 8,
      inventoryStatus: "LOWSTOCK",
      rating: 4,
    },
    {
      id: "5",
      code: "P005",
      name: "Keyboard",
      description: "Mechanical keyboard",
      image: "keyboard.jpg",
      price: 100,
      category: "Accessories",
      quantity: 25,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "6",
      code: "P006",
      name: "Mouse",
      description: "Wireless mouse",
      image: "mouse.jpg",
      price: 50,
      category: "Accessories",
      quantity: 30,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "7",
      code: "P007",
      name: "Tablet",
      description: "High-resolution tablet",
      image: "tablet.jpg",
      price: 600,
      category: "Electronics",
      quantity: 12,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "8",
      code: "P008",
      name: "Camera",
      description: "DSLR camera",
      image: "camera.jpg",
      price: 1500,
      category: "Electronics",
      quantity: 5,
      inventoryStatus: "LOWSTOCK",
      rating: 5,
    },
    {
      id: "9",
      code: "P009",
      name: "Printer",
      description: "All-in-one printer",
      image: "printer.jpg",
      price: 250,
      category: "Office",
      quantity: 18,
      inventoryStatus: "INSTOCK",
      rating: 3,
    },
    {
      id: "10",
      code: "P010",
      name: "Desk Chair",
      description: "Ergonomic desk chair",
      image: "chair.jpg",
      price: 180,
      category: "Furniture",
      quantity: 10,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
  ];

  useEffect(() => {
    // Simula la carga de datos
    setProducts(mockProducts);
  }, []);

  return (
    <div className="flex">
      {/* Sidebar fijo */}
      <SidebarMenu onToggle={handleSidebarToggle} />

      {/* Contenido principal */}
      <div className={`flex-1 bg-cyan-50 min-h-screen transition-all duration-300 ${isSidebarExpanded ? 'ml-48' : 'ml-16'
        }`}>
        {/* Header */}
        <header className="m-8">
          <h1 className="text-2xl font-bold">Bienvenido usuario</h1>
        </header>

        {/* Contenido desplazable */}
        <main className="p-4 space-y-8">
          {/* Fila de módulos */}
          <div className="grid grid-cols-2 gap-4">
            {/* Módulo A */}
            <div className="ModuloA h-64 bg-white shadow-md rounded-lg p-4 overflow-y-scroll">
              <h2 className="text-xl font-semibold mb-4">Gestión de Productos</h2>
              <DataTable value={products} tableStyle={{ minWidth: '20rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
              </DataTable>
            </div>

            {/* Módulo B */}
            <div className="ModuloB h-48  bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
              <p>Aquí puedes agregar gráficos o estadísticas relacionadas con los productos.</p>
            </div>
          </div>

          {/* Otra fila de módulos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="ModuloC bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Pendientes</h2>
              <p>Lista de tareas o pendientes relacionados con la gestión de productos.</p>
            </div>

            <div className="ModuloD bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
              <p>Información sobre los usuarios que interactúan con el sistema.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
