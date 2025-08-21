"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SidebarMenu from "@/components/sidebarMenu";

interface Producto {
    ProductoId: number;
    ProductoLangDescCorta: string;
    ProductoReference: string;
    ProveedorId: number;
    ProveedorNombre: string;
    FabricanteId: number;
    FabricanteNombre: string;
    CategoriaID: number;
    CategoriaLinea: number;
    CategoriaDescripcion: string;
    ProductoPrice: number;
}

export default function Productos() {
    const router = useRouter();
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    // 🔹 Paginación
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    const [filters, setFilters] = useState({
        referencia: "",
        productoId: "",
        proveedorId: "",
        fabricanteId: "",
        categoriaId: "",
        limit: "50",
    });

    const columnasTabla = ["ID", "Nombre", "N° Parte", "Proveedor", "Fabricante", "Categoría", "Precio", "Acciones" ];

    const buildQuery = () =>
        new URLSearchParams(
            Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ""))
        ).toString();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const query = buildQuery();
                const url = `http://172.100.203.202:8001/productos?${query}`;
                const { data } = await axios.get<Producto[]>(url, {
                    withCredentials: true, // si tu API requiere cookies/sesión
                });
                setProductos(data);
                setPage(1); 
                //console.log(productos);
            } catch (err: any) {
                console.error("Error al cargar productos:", err);
                setError("No se pudo cargar la lista de productos.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [filters]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    // 🔹 Productos a mostrar según la página
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const productosPaginados = productos.slice(start, end);

    return (
        <>
            <SidebarMenu onToggle={setIsSidebarExpanded} />

            <div className="ml-14 p-6 bg-[#e6f4fb] min-h-screen">
                {/* Encabezado */}
                <div className="bg-white border-l-4 border-[#e91e63] rounded shadow p-4 mb-6">
                    <h1 className="text-2xl font-bold text-[#1a237e]">📦 Gestión de Productos</h1>
                    <p className="text-gray-600 text-sm">
                        Visualiza y administra todos los productos disponibles para distribuidores.
                    </p>
                </div>

                {/* Filtros */}
                <div className="bg-white shadow rounded-2xl p-4 mb-6 border border-gray-200">
                    <h2 className="text-lg font-semibold text-[#1a237e] mb-4">Filtros</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <input
                            type="text"
                            name="referencia"
                            placeholder="Referencia"
                            value={filters.referencia}
                            onChange={handleChange}
                            className="border p-2 rounded focus:ring-2 focus:ring-[#2196f3]"
                        />
                        <input
                            type="number"
                            name="productoId"
                            placeholder="ID Producto"
                            value={filters.productoId}
                            onChange={handleChange}
                            className="border p-2 rounded focus:ring-2 focus:ring-[#2196f3]"
                        />
                        <input
                            type="number"
                            name="proveedorId"
                            placeholder="ID Proveedor"
                            value={filters.proveedorId}
                            onChange={handleChange}
                            className="border p-2 rounded focus:ring-2 focus:ring-[#2196f3]"
                        />
                        <input
                            type="number"
                            name="fabricanteId"
                            placeholder="ID Fabricante"
                            value={filters.fabricanteId}
                            onChange={handleChange}
                            className="border p-2 rounded focus:ring-2 focus:ring-[#2196f3]"
                        />
                        <input
                            type="number"
                            name="categoriaId"
                            placeholder="ID Categoría"
                            value={filters.categoriaId}
                            onChange={handleChange}
                            className="border p-2 rounded focus:ring-2 focus:ring-[#2196f3]"
                        />
                    </div>
                </div>

                {/* Loading/Error */}
                {loading && <p className="text-blue-600 mb-4">Cargando productos...</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Tabla */}
                <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
                    <table className="min-w-full text-base text-left">
                        <thead className="bg-[#bbdefb] text-gray-800 uppercase text-xs">
                            <tr>
                                {columnasTabla.map((col) => (
                                    <th key={col} className="px-4 py-2">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {productosPaginados.length > 0 ? (
                                productosPaginados.map((p) => (
                                    <tr key={p.ProductoId} className="border-b hover:bg-[#e3f2fd]">
                                        <td className="px-4 py-2">{p.ProductoId}</td>
                                        <td className="px-4 py-2">{p.ProductoLangDescCorta}</td>
                                        <td className="px-4 py-2">{p.ProductoReference}</td>
                                        <td className="px-4 py-2">{p.ProveedorNombre} ({p.ProveedorId})</td>
                                        <td className="px-4 py-2">{p.FabricanteNombre} ({p.FabricanteId})</td>
                                        <td className="px-4 py-2">{p.CategoriaDescripcion} ({p.CategoriaID})</td>
                                        <td className="px-4 py-2">${p.ProductoPrice} USD</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => router.push(`/productos/${p.ProductoId}`)}
                                                className="bg-[#2196f3] text-white px-3 py-1 rounded hover:bg-[#1976d2] transition"
                                            >
                                                Ver detalle
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                !loading && (
                                    <tr>
                                        <td colSpan={11} className="text-center py-6 text-gray-500">
                                            No se encontraron productos.
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Controles de paginación */}
                {productos.length > itemsPerPage && (
                    <div className="flex justify-center items-center space-x-2 mt-6">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            ◀ Anterior
                        </button>
                        <span className="text-sm">
                            Página {page} de {Math.ceil(productos.length / itemsPerPage)}
                        </span>
                        <button
                            disabled={end >= productos.length}
                            onClick={() => setPage(page + 1)}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            Siguiente ▶
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
