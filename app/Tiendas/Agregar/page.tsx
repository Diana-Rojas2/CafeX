"use client";
import { FormEvent, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { ILocalidad } from "@/app/models/ILocalidad";
import { Icon, LatLngExpression } from "leaflet";
import { IUsuario } from "@/app/models/IUsuario";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const coordenadasTec = [19.882814, -97.3930258] as LatLngExpression;

const AgregarTiendaPage = () => {
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocalidad, setSelectedLocalidad] = useState<ILocalidad | null>(
    null
  );
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    fetch("http://localhost:8080/Localidad", {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setLocalidades(json);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/Usuario", {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setUsuarios(json);
      });
  }, []);

  const [markerPosition, setMarkerPosition] =
    useState<LatLngExpression>(coordenadasTec);

  const handleMapClick = (event: any) => {
    setMarkerPosition([event.latlng.lat, event.latlng.lng]);
  };

  const MapClickHandler = () => {
    const map = useMapEvents({
      click: (event) => {
        handleMapClick(event);
      },
    });
    return null;
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const idUsuario = session?.user.data.Id;
    if (Array.isArray(markerPosition) && markerPosition.length === 2) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}Tienda`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${session?.user.token}`,
          },
          body: JSON.stringify({
            nombre: formData.get("nombre"),
            correoElectronico: formData.get("correoElectronico"),
            telefono: formData.get("telefono"),
            ubicacion: {
              tipo: formData.get("tipo"),
              coordenadas: [markerPosition[0], markerPosition[1]], // Acceder a las coordenadas del marcador
            },
            idLocalidad: formData.get("idLocalidad"),
            idUsuario: idUsuario,
          }),
        }
      );
      if (response.ok) {
        router.push("/Tiendas");
        router.refresh();
      } else {
        try {
          const dataText = await response.text();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: dataText,
          });
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al procesar la respuesta del servidor.",
          });
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las coordenadas del marcador no están definidas correctamente.",
      });
    }
  }

  const handleLocalidadChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLocalidadId = event.target.value;
    const selected = localidades.find(
      (localidad) => localidad.id.toString() === selectedLocalidadId
    );
    setSelectedLocalidad(selected || null);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="min-h-screen p-6  flex items-center justify-center">
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
                id="nombre"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="correoElectronico">Correo electrónico</label>
              <input
                type="email"
                name="correoElectronico"
                id="correoElectronico"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                id="telefono"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>
            <input
              type="hidden"
              name="tipo"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value={"Point"}
            />

{/*             <div>
              <label htmlFor="idUsuario">Usuario</label>
              <select
                name="idUsuario"
                id="idUsuario"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              >
                {usuarios
                  .filter((usuario) => usuario.idRol === 3)
                  .map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.usuario}
                    </option>
                  ))}
              </select>
            </div> */}

            {/* <div>
                <label htmlFor="idLocalidad">Localidad</label>
                <select
                  name="idLocalidad"
                  id="idLocalidad"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                >
                  {localidades.map((e: ILocalidad) => (
                    <option key={e.id} value={e.id}>
                      {e.localidad}
                    </option>
                  ))}
                </select>
              </div> */}
            <div>
              <label htmlFor="idLocalidad">Localidad</label>
              <select
                name="idLocalidad"
                id="idLocalidad"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                onChange={handleLocalidadChange}
              >
                {localidades.map((e: ILocalidad) => (
                  <option key={e.id} value={e.id}>
                    {e.localidad}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {selectedLocalidad && (
                <div>
                  <p>Ciudad: {selectedLocalidad.ciudad}</p>
                  <p>Municipio: {selectedLocalidad.idMunicipio}</p>
                  <p>Asentamiento: {selectedLocalidad.asentamiento}</p>
                  <p>Código Postal: {selectedLocalidad.cp}</p>
                </div>
              )}
            </div>
            {/*             <div>
              <label htmlFor="latitud">Latitud</label>
              <input
                type="number"
                name="latitud"
                id="latitud"
                step="any"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="longitud">Longitud</label>
              <input
                type="number"
                name="longitud"
                id="longitud"
                step="any"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div> */}

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

                <MapClickHandler />
                <Marker
                  position={markerPosition}
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
};

export default AgregarTiendaPage;
