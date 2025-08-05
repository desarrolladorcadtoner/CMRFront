import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SidebarMenu from "@/components/sidebarMenu";
import axios from "axios";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import InformacionCliente from './infoCliente';

type infoDist = {
  TipoPersona: string,
  Nombre: string,
  Calle: string,
  NumExt: string,
  Colonia: string,
  Ciudad: string,
  Estado: string,
  CodigoPostal: string,
  TipoClienteId: string,
  RFC: string,
  NumContacto: string,
  Correo: string,
  RegimenSAT: string,
  RegimenDescripcion: string,
}

const DetalleDistribuidor = () => {
  const router = useRouter();
  const { idDistribuidor } = router.query;

  const [infoCliente, setInfoCliente] = useState<any | null>(null);
  const [correo, setCorreo] = useState("");
  const [numContacto, setNumContacto] = useState("");

  useEffect(() => {
    if (idDistribuidor) {
      fetchInfoCliente();
    }
  }, [idDistribuidor]);

  const fetchInfoCliente = async () => {
    try {
      const response = await axios.get<infoDist>(`http://172.100.203.202:8001/distribuidores/siscad/distribuidor/infoFiscal/${idDistribuidor}`);
      const data = response.data;
      setInfoCliente(data);
      setCorreo(data?.Correo || "");
      setNumContacto(data?.NumContacto || "");
    } catch (error) {
      console.error("❌ Error al obtener la información del cliente:", error);
    }
  };

  if (!infoCliente) {
    return <div className="p-10 text-center">Cargando información...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu onToggle={() => { }} />
      <div className="flex flex-col p-8 ml-16 w-full">
        <div className="bg-blue-100 text-center border-[#de1c85] border-e-4 border-s-4 p-2 mb-2 rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800  my-4">
            Detalle del Distribuidor #{idDistribuidor} - {infoCliente.Nombre}
          </h1>
        </div>

        <TabView>
          <TabPanel header="Información del Cliente" >
            <InformacionCliente
              idDistribuidor={Number(idDistribuidor)}
              informacionDist={infoCliente}
              correo={correo}
              setCorreo={setCorreo}
              contacto={numContacto}
              setNumContacto={setNumContacto}
            />
            {/*<h1 className="text-2xl mb-2"><b>Informacion Fiscal:</b></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">              
              <div className="space-y-2">
                <p><b>Tipo de Persona:</b> {infoCliente.TipoPersona}</p>
                <p><b>Nombre:</b> {infoCliente.Nombre}</p>
                <p><b>RFC:</b> {infoCliente.RFC}</p>
                <p><b>Tipo Cliente ID:</b> {infoCliente.TipoClienteId}</p>
                <p><b>Régimen Fiscal:</b> {infoCliente.RegimenSAT}</p>
                <p><b>Descripción Régimen:</b> {infoCliente.RegimenDescripcion}</p>
              </div>
              <div className="space-y-3">
                <p><b>Calle:</b> {infoCliente.Calle} #{infoCliente.NumExt}</p>
                <p><b>Colonia:</b> {infoCliente.Colonia}</p>
                <p><b>Ciudad:</b> {infoCliente.Ciudad}</p>
                <p><b>Estado:</b> {infoCliente.Estado}</p>
                <p><b>Código Postal:</b> {infoCliente.CodigoPostal}</p>                
              </div>
              <div>
                <h1 className="text-2xl mb-2"><b>Datos Editables:</b></h1>
                <div>
                  <label className="block font-semibold">Correo</label>
                  <InputText value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full" />
                </div>
                <div>
                  <label className="block font-semibold">Número de Contacto</label>
                  <InputText value={numContacto} onChange={(e) => setNumContacto(e.target.value)} className="w-full" />
                </div>
              </div>
            </div>
            <div className="mt-6 text-right">
              <Button label="Guardar Cambios" icon="pi pi-save" />
            </div>*/}
          </TabPanel>

          <TabPanel header="Seguimiento del Cliente">
            <p className="text-gray-500 italic">Aquí irá el historial y estado de seguimiento del cliente.</p>
          </TabPanel>

          <TabPanel header="Direcciones del Cliente">
            <p className="text-gray-500 italic">Aquí se mostrarán las direcciones registradas.</p>
          </TabPanel>

          <TabPanel header="Créditos y Descuentos">
            <p className="text-gray-500 italic">Información financiera del distribuidor.</p>
          </TabPanel>

          <TabPanel header="Documentos del Cliente">
            <p className="text-gray-500 italic">Listado de papelería/documentación del cliente.</p>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default DetalleDistribuidor;
