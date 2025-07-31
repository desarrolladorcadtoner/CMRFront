import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SidebarMenu from "@/components/sidebarMenu";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { FaChartBar, FaTasks, FaUserFriends, FaSearch, FaBell } from "react-icons/fa";
import axios from 'axios';
import {
  fetchTotalProductos,
  fetchProductosSinActualizar,
  fetchProductosNulosPorColumna
} from "../../utils/homeService";

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

export default function IndexV2() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const [totalProductos, setTotalProductos] = useState(0);
  const [productosSinActualizar, setProductosSinActualizar] = useState(0);
  const [productosNulos, setProductosNulos] = useState<{ [key: string]: number }>({});
  const [prospectos, setProspectos] = useState({
    total: 0,
    aceptados: 0,
    rechazados: 0,
    pendientes: 0
  });
  const [distExistentes, setDistExistentes] = useState ({
    total: 0,
    migrados: 0,
    pendientes:0
  })
  const noMigrados = distExistentes.total - distExistentes.migrados;

  useEffect(() => {
    const cargarMetricas = async () => {
      try {
        const total = await fetchTotalProductos();
        const sinActualizar = await fetchProductosSinActualizar();
        const refNull = await fetchProductosNulosPorColumna("ProductoReference");
        const imgNull = await fetchProductosNulosPorColumna("ProductoLangImagen");
        const relNull = await fetchProductosNulosPorColumna("ProductoRelacionadoId");
        const nameNull = await fetchProductosNulosPorColumna("ProductoLangName");

        setTotalProductos(total);
        setProductosSinActualizar(sinActualizar);
        setProductosNulos({
          ProductoReference: refNull,
          ProductoLangImagen: imgNull,
          ProductoRelacionadoId: relNull,
          ProductoLangName: nameNull
        });
        console.log('Sin actualizar: ', sinActualizar);
      } catch (error) {
        console.error("❌ Error al cargar métricas desde homeService.js", error);
      }
    };

    cargarMetricas();
  }, []);

  // Datos simulados Productos
  useEffect(() => {
    setProducts([
      // ... mismos datos mock que ya tienes
      // Agrega aquí los productos mock que ya tienes.
    ]);
  }, []);

  useEffect(() => {
    const fetchProspectos = async () => {
      try {
        const res = await fetch("http://172.100.203.202:8001/dashboard/prospectos/resumen");
        const data = await res.json();
        setProspectos(data);
      } catch (error) {
        console.error("Error al obtener métricas de prospectos:", error);
      }
    };

    fetchProspectos();
  }, []);

  useEffect(() => {
    const fetchDistexistentes = async () => {
      try {
        const res = await fetch("http://172.100.203.202:8001/dashboard/distribuidores/existentes");
        const data = await res.json();
        setDistExistentes(data);
      } catch (error) {
        console.error("Error al obtener métricas de prospectos:", error);
      }
    };

    fetchDistexistentes();
  }, []);

  const handleSidebarToggle = (isExpanded: boolean) => {
    setIsSidebarExpanded(isExpanded);
  };

  // Filtrado de productos (ejemplo visual)
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f3f3f3]">
      {/* Sidebar */}
      <SidebarMenu onToggle={handleSidebarToggle} />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? 'ml-48' : 'ml-16'}`}>
        {/* Header */}
        <header className="flex items-center justify-between px-10 py-7 bg-gradient-to-r from-[#0b4468] to-[#0072b1] rounded-b-3xl shadow-xl mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow tracking-tight">
              Dashboard de Distribuidores
            </h1>
            <span className="block text-[#de1c85] font-semibold mt-2">
              Bienvenido, gestiona tus clientes y productos de manera eficiente
            </span>
          </div>
          <div className="flex gap-4">
            <button className="rounded-full p-3 bg-[#de1c85] text-white hover:bg-pink-600 shadow-md transition">
              <FaBell className="w-6 h-6" />
            </button>
            <button className="rounded-full p-3 bg-white/90 text-[#0b4468] shadow-md border border-[#de1c85] hover:bg-[#de1c85] hover:text-white transition">
              <FaUserFriends className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <main className="px-8 pb-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Módulo de productos */}
            <section className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition group relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0072b1] flex items-center gap-2">
                  <FaSearch className="text-[#de1c85]" />
                  Gestión de Productos
                </h2>
                <input
                  type="text"
                  className="rounded-full px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#de1c85] text-base transition w-48"
                  placeholder="Buscar producto..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              {/* Métricas agrupadas */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#f1f9ff] p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <p className="text-sm text-gray-500">Total de productos</p>
                  <p className="text-lg font-bold text-[#0072b1]">{totalProductos}</p>
                </div>
                <div className="bg-[#fff0f6] p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <p className="text-sm text-gray-500">No actualizados (más de 1 año)</p>
                  <p className="text-lg font-bold text-[#de1c85]">{productosSinActualizar}</p>
                </div>
                <div className="bg-[#fef9c3] p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <p className="text-sm text-gray-500">Sin referencia</p>
                  <p className="text-lg font-bold text-yellow-600">{productosNulos.ProductoReference}</p>
                </div>
                <div className="bg-[#e0f7fa] p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <p className="text-sm text-gray-500">Sin imagen</p>
                  <p className="text-lg font-bold text-cyan-600">{productosNulos.ProductoLangImagen}</p>
                </div>
                <div className="bg-[#ede7f6] p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <p className="text-sm text-gray-500">Sin relacionados</p>
                  <p className="text-lg font-bold text-indigo-600">{productosNulos.ProductoRelacionadoId}</p>
                </div>
                <div className="bg-[#f3e5f5] p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <p className="text-sm text-gray-500">Sin nombre</p>
                  <p className="text-lg font-bold text-purple-600">{productosNulos.ProductoLangName}</p>
                </div>
              </div>

              {/* Tabla de resultados */}
              <DataTable value={filteredProducts} tableStyle={{ minWidth: '20rem' }}>
                <Column field="code" header="Code" />
                <Column field="name" header="Name" />
                <Column field="category" header="Category" />
                <Column field="quantity" header="Quantity" />
              </DataTable>
            </section>

            {/* Módulo de estadísticas */}
            <section className="bg-white rounded-2xl shadow-xl p-6 flex flex-col hover:shadow-2xl transition group">
              <h2 className="text-xl font-bold text-[#0072b1] flex items-center gap-2 mb-4">
                <FaChartBar className="text-[#de1c85]" />
                Estadísticas
              </h2>
              <div className="h-48 flex items-center justify-center bg-gradient-to-tr from-[#f3f3f3] to-white rounded-xl">
                {/* Aquí puedes agregar tu gráfico */}
                <span className="text-gray-400 italic">[Aquí va tu gráfica de ventas/productos]</span>
              </div>
              <Accordion activeIndex={0} className="mt-6">
                <AccordionTab header="Resumen mensual">
                  <p className="m-0 text-gray-600">
                    Visualiza el resumen de ventas, clientes y desempeño del mes.
                  </p>
                </AccordionTab>
                <AccordionTab header="Comparativo anual">
                  <p className="m-0 text-gray-600">
                    Compara el rendimiento contra el año anterior.
                  </p>
                </AccordionTab>
              </Accordion>
            </section>
          </div>

          {/* Segunda fila: pendientes y usuarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Prospectos Pendientes */}
            <section className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
              <h2 className="text-xl font-bold text-[#0072b1] flex items-center gap-2 mb-4">
                <FaTasks className="text-[#de1c85]" />
                Prospectos
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center justify-between bg-[#f3f3f3] rounded-lg px-4 py-2 hover:bg-[#de1c85]/10 transition">
                  <span className="font-medium text-gray-700">Total de prospectos</span>
                  <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">{prospectos.total}</span>
                </li>
                <li className="flex items-center justify-between bg-[#f3f3f3] rounded-lg px-4 py-2 hover:bg-[#de1c85]/10 transition">
                  <span className="font-medium text-gray-700">Prospectos pendientes</span>
                  <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">{prospectos.pendientes}</span>
                </li>
                <li className="flex items-center justify-between bg-[#f3f3f3] rounded-lg px-4 py-2 hover:bg-[#de1c85]/10 transition">
                  <span className="font-medium text-gray-700">Prospectos aceptados</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{prospectos.aceptados}</span>
                </li>
                <li className="flex items-center justify-between bg-[#f3f3f3] rounded-lg px-4 py-2 hover:bg-[#de1c85]/10 transition">
                  <span className="font-medium text-gray-700">Prospectos rechazados</span>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">{prospectos.rechazados}</span>
                </li>
              </ul>
            </section>

            {/* Prospectos Pendientes */}
            <section className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
              <h2 className="text-xl font-bold text-[#0072b1] flex items-center gap-2 mb-4">
                <FaTasks className="text-[#de1c85]" />
                Distribuidores de Siscad
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center justify-between bg-[#f3f3f3] rounded-lg px-4 py-2 hover:bg-[#de1c85]/10 transition">
                  <span className="font-medium text-gray-700">Total de Distribuidores</span>
                  <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">{distExistentes.total}</span>
                </li>
                <li className="flex items-center justify-between bg-[#f3f3f3] rounded-lg px-4 py-2 hover:bg-[#de1c85]/10 transition">
                  <span className="font-medium text-gray-700">Distribuidores migrados</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{distExistentes.migrados}</span>
                </li>
                <li className="flex items-center justify-between bg-[#f3f3f3] rounded-lg px-4 py-2 hover:bg-[#de1c85]/10 transition">
                  <span className="font-medium text-gray-700">Distribuidores No migrados</span>
                  <span className=" bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">{noMigrados}</span>
                </li>
              </ul>
            </section>

            {/* Usuarios */}
            <section className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
              <h2 className="text-xl font-bold text-[#0072b1] flex items-center gap-2 mb-4">
                <FaUserFriends className="text-[#de1c85]" />
                Usuarios
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img src="/images/user1.png" alt="User1" className="w-10 h-10 rounded-full border-2 border-[#de1c85]" />
                  <div>
                    <span className="font-semibold text-gray-700">Juan Pérez</span>
                    <span className="block text-xs text-gray-500">Administrador</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/images/user2.png" alt="User2" className="w-10 h-10 rounded-full border-2 border-[#0072b1]" />
                  <div>
                    <span className="font-semibold text-gray-700">Ana López</span>
                    <span className="block text-xs text-gray-500">Soporte</span>
                  </div>
                </div>
                {/* Puedes agregar más usuarios aquí */}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
