"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import SidebarMenu from "@/components/sidebarMenu";

interface ProductoDetalle {
  ProductoId: number;
  ProveedorId: number;
  FabricanteId: number;
  CategoriaID: number;
  ProductoPrice: number;
  ProductoDateAdd: string;
  ProductoReference: string;
  ProductoDateUpd: string;
  ProductoLangDescripcion: string;
  ProductoLangDescCorta: string;
  CategoriaDescripcion: string;
  CategoriaLinea: number;
  ProveedorNombre: string;
  FabricanteNombre: string;
}

export default function ProductoDetallePage() {
  const params = useParams();
  const idProducto = params?.idProducto as string | undefined;
  const [producto, setProducto] = useState<ProductoDetalle | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // ⚠️ Cambia la URL cuando tengas tu API
          const { data } = await axios.get(`http://172.100.203.202:8001/productos/${idProducto}`);
            setProducto(data as ProductoDetalle);
            console.log(producto);
      } catch (err: any) {
        console.error("Error al obtener producto:", err);
        setError("No se pudo cargar la información del producto.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idProducto]);

  if (loading) {
    return <div className="ml-14 p-6 text-blue-600">Cargando producto...</div>;
  }

  if (error) {
    return <div className="ml-14 p-6 text-red-500">{error}</div>;
  }

  if (!producto) {
    return <div className="ml-14 p-6 text-gray-500">Producto no encontrado.</div>;
  }

  const tabs = [
    { key: "general", label: "Información General" },
    { key: "descripcion", label: "Descripción" },
    { key: "historial", label: "Historial" },
  ];

  return (
    <>
          <SidebarMenu onToggle={setIsSidebarExpanded} />

      <div className="ml-14 p-6 bg-[#e6f4fb] min-h-screen">
        {/* Encabezado */}
        <div className="bg-white border-l-4 border-[#e91e63] rounded shadow p-4 mb-6">
          <h1 className="text-2xl font-bold text-[#1a237e]">
            Detalle del Producto ID: {producto.ProductoId} - Ref: {producto.ProductoReference}
          </h1>
          <p className="text-gray-600 text-sm">{producto.ProductoLangDescCorta?.trim()}</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-4 border-b border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.key
                  ? "border-b-2 border-[#2196f3] text-[#1976d2]"
                  : "text-gray-600 hover:text-[#2196f3]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        {activeTab === "general" && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Proveedor">
              <p><span className="font-medium">ID:</span> {producto.ProveedorId}</p>
              <p><span className="font-medium">Nombre:</span> {producto.ProveedorNombre?.trim()}</p>
            </Card>

            <Card title="Fabricante">
              <p><span className="font-medium">ID:</span> {producto.FabricanteId}</p>
              <p><span className="font-medium">Nombre:</span> {producto.FabricanteNombre?.trim()}</p>
            </Card>

            <Card title="Categoría">
              <p><span className="font-medium">ID:</span> {producto.CategoriaID}</p>
              <p><span className="font-medium">Nombre:</span> {producto.CategoriaDescripcion?.trim()}</p>
              <p><span className="font-medium">Línea:</span> {producto.CategoriaLinea}</p>
            </Card>

            <Card title="Precio & Stock">
              <p><span className="font-medium">Precio:</span> ${producto.ProductoPrice.toFixed(2)}</p>
              <p><span className="font-medium">Stock:</span> {/* ⚠️ agregar cuando venga del API */}</p>
            </Card>
          </div>
        )}

        {activeTab === "descripcion" && (
          <Card title="Descripción Completa">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {producto.ProductoLangDescripcion?.trim()}
            </p>
          </Card>
        )}

        {activeTab === "historial" && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Fecha de Alta">
              <p>{new Date(producto.ProductoDateAdd).toLocaleDateString()}</p>
            </Card>
            <Card title="Última Actualización">
              <p>{new Date(producto.ProductoDateUpd).toLocaleDateString()}</p>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 border">
      <h2 className="text-lg font-semibold text-[#1a237e] mb-2">{title}</h2>
      {children}
    </div>
  );
}
