"use client";
import { Icon, LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { ILocalidad } from "@/app/models/ILocalidad";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IUsuario } from "@/app/models/IUsuario";

export interface Props {
  params: { id: number };
}

const coordenadasTec = [19.882814, -97.3930258] as LatLngExpression;

const ModificarTiendaPage = ({ params }: Props) => {
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const { handleSubmit, register, setValue } = useForm();
  const router = useRouter();

  useEffect(() => {
    axios.get(`http://localhost:8080/Tienda/Id/${params.id}`).then((prod) => {
      const tienda = prod.data.find((t: { id: number }) => t.id === params.id);
      if (tienda) {
        setValue("id", tienda.id);
        setValue("nombre", tienda.nombre);
        setValue("correoElectronico", tienda.correoElectronico);
        setValue("telefono", tienda.telefono);
      } else {
        console.error("No se encontró la tienda con el ID proporcionado.");
      }
    });
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await axios.put(`http://localhost:8080/Tienda/${params.id}`, formData);
      router.push("/Tiendas");
      router.refresh();
    } catch (error) {
      console.error("Error al actualizar la tienda:", error);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <h2 className="font-semibold text-xl text-dark-600 text-center">
            Modificar Tienda
          </h2>
          <br />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                {...register("nombre")}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                id="nombre"
              />
            </div>

            <div>
              <label htmlFor="correoElectronico">Correo electrónico</label>
              <input
                type="email"
                {...register("correoElectronico")}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                id="correoElectronico"
              />
            </div>

            <div>
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                {...register("telefono")}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                id="telefono"
              />
            </div>
            {/* <input
              type="hidden"
              {...register("tipo")}
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value={"Point"}
              id="tipo"
            />

            <div>
              <label htmlFor="idUsuario">Usuario</label>
              <select
                {...register("idUsuario")}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                id="idUsuario"
              >
                {usuarios.map((e: IUsuario) => (
                  <option key={e.id} value={e.id}>
                    {e.usuario}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="idLocalidad">Localidad</label>
              <select
                {...register("idLocalidad")}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                id="idLocalidad"
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
                {...register("latitud")}
                type="number"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                id="latitud"
              />
            </div>

            <div>
              <label htmlFor="longitud">Longitud</label>
              <input
                {...register("longitud")}
                type="number"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                id="longitud"
              />
            </div> */}

            {/* <div className="md:col-span-3 mt-4">
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
            </div> */}
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
};

export default ModificarTiendaPage;
