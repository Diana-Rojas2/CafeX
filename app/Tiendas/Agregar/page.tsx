"use client";
import { FormEvent, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { ILocalidad } from "@/app/models/ILocalidad";
import { Icon, LatLngExpression } from "leaflet";
import { IUsuario } from "@/app/models/IUsuario";
import Link from "next/link";

const coordenadasTec = [19.882814, -97.3930258] as LatLngExpression;
async function getLocalidades() {
    const localidades = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}Localidad`);
    const respuesta = await localidades.json();
    return respuesta;
  }
  
  async function getUsuarios() {
    const usuarios = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}Usuario`);
    const respuesta = await usuarios.json();
    return respuesta;
  }

  const AgregarTiendaPage = () => {
    const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const localidadesData = await getLocalidades();
          const usuariosData = await getUsuarios();
          setLocalidades(localidadesData);
          setUsuarios(usuariosData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      }
  
      fetchData();
    }, []);
  
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}Tienda`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.get("nombre"),
          correoElectronico: formData.get("correoElectronico"),
          telefono: formData.get("telefono"),
          ubicacion: {
            tipo: formData.get("tipo"),
            coordenadas: [
                formData.get("latitud"),
                formData.get("longitud")
            ],
          },
          idLocalidad: formData.get("idLocalidad"),
          idUsuario: formData.get("idUsuario"),
        }),
      });
      const data = await response.json();
      alert(data.mensaje);
    }
  
    if (isLoading) {
      return <div>Cargando...</div>;
    }
  
  return (
    <form onSubmit={onSubmit}>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <h2 className="font-semibold text-xl text-dark-600 text-center">
            Registrar Tienda
          </h2>
          <br />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="correoElectronico">Correo electrónico</label>
              <input
                type="email"
                name="correoElectronico"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>
                <input
                  type="hidden"
                  name="tipo"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={"Point"}
                />

              <div>
                <label htmlFor="">Usuario</label>
                <select
                  name="idUsuario"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                >
                  {usuarios.map((e: IUsuario) => (
                    <option key={e.id} value={e.id}>
                      {e.usuario}
                    </option>
                  ))}
                </select>
              </div>

            <div>
                <label htmlFor="">Localidad</label>
                <select
                  name="idLocalidad"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                >
                  {localidades.map((e: ILocalidad) => (
                    <option key={e.id} value={e.id}>
                      {e.localidad}
                    </option>
                  ))}
                </select>
              </div>

            <div>
              <label htmlFor="latitud">Latitud</label>
              <input
                type="number"
                name="latitud"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>

            <div >
              <label htmlFor="longitud">Longitud</label>
              <input
                type="number"
                name="longitud"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>

            <div className="md:col-span-3 mt-4">
              <MapContainer
                style={{ width: "100%", height: "300px" }}
                center={coordenadasTec}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={coordenadasTec}
                  icon={
                    new Icon({
                      iconUrl: MarkerIcon.src,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                    })
                  }
                >
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
          <div className="flex justify-center mt-4">
          <button
              className="m-2 hover:shadow-form rounded-md bg-[#2F4858] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              type="submit"
            >
              Guardar
            </button>
            <Link
                className="m-2 hover:shadow-form rounded-md bg-gray-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                href={"/Tiendas"}
              >
                Regresar
              </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AgregarTiendaPage;
