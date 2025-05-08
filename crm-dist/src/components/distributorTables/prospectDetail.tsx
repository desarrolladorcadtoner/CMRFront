import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';

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
    <div className="flex items-center gap-4">
        <p className="font-semibold whitespace-nowrap">{label}:</p>
        <InputText value={value} disabled className="w-48" />
    </div>
);

interface SectionProps {
    title: string;
    fields: FieldProps[];
}

const Section: React.FC<SectionProps> = ({ title, fields }) => (
    <div className="mb-8">
        <h2 className="text-2xl mb-4">{title}</h2>
        <div className="grid grid-cols-2 gap-4">
            {fields.map((field, index) => (
                <Field key={index} {...field} />
            ))}
        </div>
    </div>
);

const ProspectDetail: React.FC = () => {
    const [data, setData] = useState<DistribuidorData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://172.100.203.36:8001/register/distribuidor/1');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching prospect data:', error);
            }
        };

        fetchData();
    }, []);

    if (!data) return <p>Cargando...</p>;

    const { RegisterSOne, RegisterSTwo, RegisterSThree } = data;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl my-4">Datos del Prospecto a Distribuidor</h1>

            {/* Información Fiscal */}
            <Section
                title="Información Fiscal"
                fields={[
                    { label: 'Tipo Persona', value: RegisterSOne.TipoPersona },
                    { label: 'RFC', value: RegisterSOne.RFC },
                    { label: 'Régimen Fiscal', value: RegisterSOne.RegimenFiscal },
                    { label: 'Uso CFDI', value: RegisterSOne.UsoCFDI },
                    { label: 'Correo Facturación', value: RegisterSOne.CorreoFact },
                    { label: 'Teléfono', value: RegisterSOne.Telefono },
                    { label: 'WhatsApp', value: RegisterSOne.whatsApp },
                    { label: 'Código Postal', value: RegisterSOne.CodigoPostal },
                ]}
            />

            {/* Dirección Fiscal */}
            <Section
                title="Dirección Fiscal"
                fields={[
                    { label: 'Calle', value: RegisterSOne.Calle },
                    { label: 'Número Exterior', value: RegisterSOne.N_Ext },
                    { label: 'Número Interior', value: RegisterSOne.N_Int },
                    { label: 'Colonia', value: RegisterSOne.Colonia },
                    { label: 'Ciudad', value: RegisterSOne.Ciudad },
                    { label: 'Estado', value: RegisterSOne.Estado },
                ]}
            />

            {/* Contacto de Compras */}
            <Section
                title="Contacto de Compras"
                fields={[
                    { label: 'Nombre', value: RegisterSTwo.nombreCompras },
                    { label: 'Apellido', value: RegisterSTwo.apellidoCompras },
                    { label: 'Correo', value: RegisterSTwo.correoCompras },
                    { label: 'Teléfono', value: RegisterSTwo.telefonoCompras },
                    { label: 'Extensión', value: RegisterSTwo.extensionCompras },
                    { label: 'WhatsApp', value: RegisterSTwo.whatsappCompras },
                ]}
            />

            {/* Contacto de Pagos */}
            <Section
                title="Contacto de Pagos"
                fields={[
                    { label: 'Nombre', value: RegisterSTwo.nombrePago },
                    { label: 'Apellido', value: RegisterSTwo.apellidoPago },
                    { label: 'Correo', value: RegisterSTwo.correoPago },
                    { label: 'Teléfono', value: RegisterSTwo.telefonoPago },
                    { label: 'Extensión', value: RegisterSTwo.extensionPago },
                    { label: 'WhatsApp', value: RegisterSTwo.whastappPago },
                ]}
            />

            {/* Información del Contacto / Negocio */}
            <Section
                title="Información del Negocio"
                fields={[
                    { label: 'Giro del Negocio', value: RegisterSThree.giroNegocio },
                    { label: 'Red Social', value: RegisterSThree.redSocial },
                    { label: 'Nombre Red Social', value: RegisterSThree.nombreRedSocial },
                ]}
            />

            {/* Dirección de Entrega */}
            <Section
                title="Dirección de Entrega"
                fields={[
                    { label: 'Calle', value: RegisterSThree.calleEntrega },
                    { label: 'Número Exterior', value: RegisterSThree.numExtEntrega },
                    { label: 'Número Interior', value: RegisterSThree.numIntEntrega },
                    { label: 'Colonia', value: RegisterSThree.coloniaEntrega },
                    { label: 'Código Postal', value: RegisterSThree.codigoPostalEntrega },
                    { label: 'Estado', value: RegisterSThree.estadoEntrega },
                    { label: 'Ciudad', value: RegisterSThree.ciudadEntrega },
                ]}
            />
        </div>
    );
};

export default ProspectDetail;
