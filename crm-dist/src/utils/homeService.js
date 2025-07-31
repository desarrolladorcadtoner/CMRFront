import axios from 'axios';

const API_BASE = 'http://172.100.203.202:8001/dashboard/productos';

export async function fetchTotalProductos() {
    const { data } = await axios.get(`${API_BASE}/total`);
    return data.total || 0;
}

export async function fetchProductosSinActualizar() {
    const { data } = await axios.get(`${API_BASE}/sin-actualizar`);
    
    return data.total || 0;
}

export async function fetchProductosNulosPorColumna(columna) {
    const { data } = await axios.get(`${API_BASE}/nulos/${columna}`);
    //console.log('sina ctualizar: ', data)
    return data.total || 0;
}