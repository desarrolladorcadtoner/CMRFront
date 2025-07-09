import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { InputNumber } from 'primereact/inputnumber';
import { SectionEditable } from './CamposProspectoInfo/SectionEditable';
import { FaDownload, FaFileAlt, FaUserCheck, FaUserTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface DistribuidorData {
    RegisterSOne: any;
    RegisterSTwo: any;
    RegisterSThree: any;
}

interface FieldProps {
    label: string;
    value: string;
}

const Field: React.FC<FieldProps> = ({ label, value }) => (
    <div className="flex items-center gap-3 mb-2">
        <span className="font-semibold text-[#0b4468] w-40">{label}:</span>
        <InputText
            value={value}
            readOnly
            className="flex-1 p-2 bg-[#f6faff] border border-[#eee] rounded-lg text-gray-700 font-medium"
            tooltip={value}
            tooltipOptions={{ position: 'mouse' }}
        />
        <Tooltip target=".p-inputtext" />
    </div>
);

interface SectionProps {
    title: string;
    fields: FieldProps[];
}

const Section: React.FC<SectionProps> = ({ title, fields }) => (
    <section className="mb-8 p-6 rounded-2xl shadow-lg bg-white border-l-4 border-[#0b4468]">
        <h2 className="text-xl font-bold text-[#0072b1] mb-4 flex items-center gap-2">
            <FaFileAlt className="text-[#de1c85]" /> {title}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
            {fields.map((field, index) => (
                <Field key={index} {...field} />
            ))}
        </div>
    </section>
);

const ProspectDetail: React.FC<{ rfcDistribuidor: string }> = ({ rfcDistribuidor }) => {
    const [data, setData] = useState<DistribuidorData | null>(null);
    const [documentsDownloaded, setDocumentsDownloaded] = useState(false);
    const [limiteCredito, setLimiteCredito] = useState<number>(0);
    const [diasCredito, setDiasCredito] = useState<number>(0);
    const [descuentoAutorizado, setDescuentoAutorizado] = useState<number>(0);
    const [tiposCliente, setTiposCliente] = useState<{ TipoClienteId: number, Descripcion: string }[]>([]);
    const [tipoClienteId, setTipoClienteId] = useState<number | null>(null);

    // --- Funciones de API ---
    const downloadDocuments = async () => {
        try {
            const response = await fetch(`http://172.100.203.36:8001/register/documentos/rfc/${rfcDistribuidor}`);
            if (!response.ok) throw new Error('Error al descargar los documentos');
            const blob = await response.blob();

            const disposition = response.headers.get('Content-Disposition');
            let filename = 'documentos_distribuidor.zip';
            if (disposition) {
                const filenameMatch = disposition.match(/filename="([^"]+)"/);
                filename = filenameMatch ? filenameMatch[1] : filename;
            }

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            setDocumentsDownloaded(true);
        } catch (error) {
            console.error('Error al descargar los documentos:', error);
        }
    };

    // --- API para los tipo cliente ---
    useEffect(() => {
        const fetchTiposCliente = async () => {
            try {
                const response = await fetch('http://172.100.203.36:8001/confirmacion/catalogo/tipo-cliente');
                if (!response.ok) throw new Error('Error al cargar tipos de cliente');
                const result = await response.json();
                setTiposCliente(result);
            } catch (error) {
                console.error('Error fetching tipos cliente:', error);
            }
        };
        fetchTiposCliente();
    }, []);

    // --- APi para enviar correo de confiramción
    const confirmAction = async (rfcDistribuidor: string, accion: string) => {
        if (!tipoClienteId) {
            alert('Selecciona un tipo de cliente antes de continuar.');
            return;
        }
        try {
            const response = await fetch('http://172.100.203.36:8001/confirmacion/distribuidores/confirmar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rfc: rfcDistribuidor, accion, tipo_cliente_id: tipoClienteId }),
            });
            if (!response.ok) throw new Error('Error al confirmar la acción');
            const result = await response.json();
            alert('La solicitud ha sido aceptada exitosamente.');
        } catch (error) {
            console.error('Error al confirmar la acción:', error);
            alert('Hubo un error al aceptar la solicitud.');
        }
    };

    // --- Cargar datos ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://172.100.203.36:8001/register/distribuidor/rfc/${rfcDistribuidor}`);
                if (!response.ok) throw new Error('Error al obtener los detalles del prospecto');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching prospect data:', error);
            }
        };
        fetchData();
    }, [rfcDistribuidor]);

    if (!data) return <div className="p-20 flex justify-center"><span className="text-[#0072b1] text-xl">Cargando prospecto...</span></div>;

    const { RegisterSOne, RegisterSTwo, RegisterSThree } = data;
    
    return (
        <div className="bg-[#f3f3f3] p-8 min-h-screen flex flex-col items-center">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-[#eee] p-8 mb-8 animate-fadeIn">
                <header className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-4xl font-black text-[#0b4468] tracking-tight mb-2">
                            Prospecto a Distribuidor
                        </h1>
                        <div className="flex flex-wrap items-center gap-2">
                            {/* RFC */}
                            <span className="bg-[#de1c85] text-white px-4 py-1 rounded-full font-bold text-sm shadow-sm">
                                RFC: {rfcDistribuidor}
                            </span>
                            {/* Documentos */}
                            {documentsDownloaded ? (
                                <span className="flex items-center text-green-700 text-sm font-bold gap-1 bg-green-100 px-3 py-1 rounded-full shadow-sm">
                                    <FaCheckCircle className="text-lg" /> Documentos descargados
                                </span>
                            ) : (
                                <span className="flex items-center text-gray-500 text-sm font-bold gap-1 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                                    <FaTimesCircle className="text-lg" /> Documentos pendientes
                                </span>
                            )}
                            {/* Status */}
                            {RegisterSOne?.Status && (
                                <span className="flex items-center font-bold text-sm bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full shadow-sm border border-yellow-400">
                                    <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                        <circle cx="10" cy="10" r="10" />
                                    </svg>
                                    {RegisterSOne.Status.trim()}
                                </span>
                            )}
                        </div>
                    </div>

                    <Button
                        label="Descargar Documentos"
                        icon={<FaDownload className="mr-2" />}
                        severity="info"
                        onClick={downloadDocuments}
                        className="bg-[#0072b1] text-white rounded-full font-bold shadow hover:bg-[#de1c85] transition"
                    />
                </header>

                
                <div className="overflow-auto  pr-2">
                    {/* Info Fiscal */}
                    <Section
                        title="Información Fiscal"
                        fields={[
                            { label: 'Tipo Persona', value: RegisterSOne.TipoPersona || '' },
                            { label: 'Razón Social', value: RegisterSOne.RazonSocial || '' },
                            { label: 'Nombre Comercial', value: RegisterSOne.NombreComercial || '' },
                            { label: 'RFC', value: RegisterSOne.RFC || '' },
                            { label: 'Régimen Fiscal', value: RegisterSOne.RegimenFiscal || '' },
                            { label: 'Uso CFDI', value: RegisterSOne.UsoCFDI || '' },
                            { label: 'Correo Electronico', value: RegisterSOne.CorreoFact || '' },
                        ]}
                    />

                    {/* Dirección Fiscal */}
                    <Section
                        title="Dirección Fiscal"
                        fields={[
                            { label: 'Calle', value: RegisterSOne.Calle || '' },
                            { label: 'Número Exterior', value: RegisterSOne.N_Ext || '' },
                            { label: 'Número Interior', value: RegisterSOne.N_Int || '' },
                            { label: 'Código Postal', value: RegisterSOne.CodigoPostal || '' },
                            { label: 'Teléfono', value: RegisterSOne.Telefono || '' },
                            { label: 'WhatsApp', value: RegisterSOne.whatsApp || '' },
                            { label: 'Estado', value: RegisterSOne.Estado || '' },
                            { label: 'Municipio', value: RegisterSOne.Ciudad || '' },
                            { label: 'Colonia', value: RegisterSOne.Colonia || '' },
                            { label: 'Actividad Principal', value: RegisterSOne.ActividadPrincSHCP || '' },
                            { label: 'Representante Legal', value: RegisterSOne.NomRepresentanteLegal || '' },
                        ]}
                    />

                    {/* Contacto de Compras */}
                    <Section
                        title="Contacto de Compras"
                        fields={[
                            { label: 'Nombre', value: RegisterSTwo.nombreCompras || '' },
                            { label: 'Apellido', value: RegisterSTwo.apellidoCompras || '' },
                            { label: 'Correo', value: RegisterSTwo.correoCompras || '' },
                            { label: 'Teléfono', value: RegisterSTwo.telefonoCompras || '' },
                            { label: 'Extensión', value: RegisterSTwo.extensionCompras || '' },
                            { label: 'WhatsApp', value: RegisterSTwo.whatsappCompras || '' },
                        ]}
                    />

                    {/* Contacto de Pagos */}
                    <Section
                        title="Contacto de Pagos"
                        fields={[
                            { label: 'Nombre', value: RegisterSTwo.nombrePago || '' },
                            { label: 'Apellido', value: RegisterSTwo.apellidoPago || '' },
                            { label: 'Correo', value: RegisterSTwo.correoPago || '' },
                            { label: 'Teléfono', value: RegisterSTwo.telefonoPago || '' },
                            { label: 'Extensión', value: RegisterSTwo.extensionPago || '' },
                            { label: 'WhatsApp', value: RegisterSTwo.whastappPago || '' },
                        ]}
                    />

                    {/* Información del Negocio */}
                    <Section
                        title="Información del Negocio"
                        fields={[
                            { label: 'Giro del Negocio', value: RegisterSThree.giroNegocio || '' },
                            { label: 'Red Social', value: RegisterSThree.redSocial || '' },
                            { label: 'Nombre Red Social', value: RegisterSThree.nombreRedSocial || '' },
                        ]}
                    />

                    {/* Dirección de Entrega */}
                    <Section
                        title="Dirección de Entrega"
                        fields={[
                            { label: 'Calle', value: RegisterSThree.calleEntrega || '' },
                            { label: 'Número Exterior', value: RegisterSThree.numExtEntrega || '' },
                            { label: 'Número Interior', value: RegisterSOne.N_Int || '' },
                            { label: 'Colonia', value: RegisterSOne.Colonia || '' },
                            { label: 'Código Postal', value: RegisterSThree.codigoPostalEntrega || '' },
                            { label: 'Estado', value: RegisterSThree.estadoEntrega || '' },
                            { label: 'Municipio', value: RegisterSThree.ciudadEntrega || '' },
                        ]}
                    />

                    {/* Asignacion Detalle de credito */}
                    <SectionEditable
                        title="Asignación de Crédito / Descuentos"
                        fields={[
                            { label: "Límite de crédito", value: limiteCredito, onChange: v => setLimiteCredito(v ?? 0), prefix: "$" },
                            { label: "Días de crédito", value: diasCredito, onChange: v => setDiasCredito(v ?? 0) },
                            { label: "Descuento Autorizado", value: descuentoAutorizado, onChange: v => setDescuentoAutorizado(v ?? 0), suffix: "%" },
                        ]}
                    />

                    {/*Selección de tipo de cliente */}
                    <div className="my-8 flex items-center gap-4">
                        <label htmlFor="tipoClienteSelect" className="font-semibold text-[#0b4468]">Tipo de Cliente:</label>
                        <select
                            id="tipoClienteSelect"
                            value={tipoClienteId ?? ""}
                            onChange={e => setTipoClienteId(Number(e.target.value))}
                            className="p-2 border rounded-lg bg-[#f6faff] text-gray-700 font-medium min-w-[180px]"
                        >
                            <option value="">Seleccione tipo de cliente</option>
                            {tiposCliente.map(tc => (
                                <option key={tc.TipoClienteId} value={tc.TipoClienteId}>
                                    {tc.Descripcion}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* --- Acciones --- */}
                    <div className="flex flex-wrap gap-6 mt-8 justify-end items-center overflow-hidden">
                        <button
                            disabled={!documentsDownloaded || !tipoClienteId}
                            onClick={() => confirmAction(rfcDistribuidor, 'aceptar')}
                            className={`
                                flex items-center gap-3 px-7 py-3 rounded-2xl font-bold
                                text-white bg-gradient-to-r from-green-500 to-green-700
                                shadow-xl transition-all duration-200
                                hover:scale-105 hover:shadow-2xl hover:from-green-600 hover:to-green-900
                                active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed
                                focus:outline-none focus:ring-2 focus:ring-green-300 z-40
                                `}
                            style={{
                                boxShadow: "0 6px 28px #22c55e40, 0 2px 8px #0b446820"
                            }}
                        >
                            <FaUserCheck className="text-2xl" />
                            <span>Aceptar Solicitud</span>
                        </button>

                        <button
                            disabled={!documentsDownloaded}
                            onClick={() => alert('Solicitud denegada (funcionalidad en desarrollo)')}
                            className={`
                                flex items-center gap-3 px-7 py-3 rounded-2xl font-bold
                                text-white bg-gradient-to-r from-[#de1c85] to-[#b71368]
                                shadow-xl transition-all duration-200
                                hover:scale-105 hover:shadow-2xl hover:from-[#d20070] hover:to-[#850c48]
                                active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed
                                focus:outline-none focus:ring-2 focus:ring-pink-300 overflow-hidden
                                `}
                            style={{
                                boxShadow: "0 6px 28px #de1c8540, 0 2px 8px #0b446820"
                            }}
                        >
                            <FaUserTimes className="text-2xl" />
                            <span>Denegar Solicitud</span>
                        </button>
                    </div>

                    
                </div>


            </div>
        </div>
    );
};

export default ProspectDetail;
