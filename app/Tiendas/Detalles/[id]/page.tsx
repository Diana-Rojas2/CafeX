"use client";
import L, { Icon, LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export interface Props {
  params: { id: number };
}

const TiendasPage: React.FC<Props> = (props) => {
  const [tienda, setTienda] = useState<any>(null);
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (tienda) {
      setMapPosition(tienda.ubicacion.coordenadas[0]);
    }
  }, [tienda]);

  const { data: session, status } = useSession();

  useEffect(() => {
    fetch(`http://localhost:8080/Tienda/Id/${props.params.id}`, {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: ` ${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTienda(json);
      });
  }, []);

  return (
    <>
      {tienda && (
        <>
          <div key={tienda.id} className="md:flex items-center -mx-10  mb-8">
            <div className="mt-9 w-full md:w-1/2 px-10 relative rounded-xl shadow-lg mx-auto bg-white border dark:bg-gray-700 dark:text-white border-white sm:text-sm">
              <div className="mb-5">
                <h1 className="font-bold text-3xl mb-2 text-center">{tienda.nombre}</h1>
                <center>
                <img src={"https://cdn-icons-png.flaticon.com/512/11787/11787151.png"} className="rounded-sm w-48" />
                <span className="text-2xl leading-none align-baseline">
                  Correo: {tienda.correoElectronico}
                </span>
                <p className="text-2xl leading-none align-baseline mt-2">Telefono: {tienda.telefono}</p>
                </center>
              </div>
              <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-semibold mb-4 mt-2 dark:text-white">
              Ubicación
            </h2>
            <div className="w-full h-full mb-4 ">
              <MapContainer
                style={{ width: "100%", height: "100%" }}
                center={[
                  tienda.ubicacion.coordenadas[0],
                  tienda.ubicacion.coordenadas[1],
                ]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    tienda.ubicacion.coordenadas[0],
                    tienda.ubicacion.coordenadas[1],
                  ]}
                  icon={
                    new Icon({
                      iconUrl: MarkerIcon.src,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                    })
                  }
                ></Marker>
              </MapContainer>
            </div>
          </div>
            </div>
            
          </div>
          {/* <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-semibold mb-4 mt-4 dark:text-white">
              Ubicación
            </h2>
            <div className="w-full h-full">
              <MapContainer
                style={{ width: "100%", height: "100%" }}
                center={[
                  tienda.ubicacion.coordenadas[0],
                  tienda.ubicacion.coordenadas[1],
                ]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    tienda.ubicacion.coordenadas[0],
                    tienda.ubicacion.coordenadas[1],
                  ]}
                  icon={
                    new Icon({
                      iconUrl: MarkerIcon.src,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                    })
                  }
                ></Marker>
              </MapContainer>
            </div>
          </div> */}
        </>
      )}
      {!tienda && <p className="dark:text-white">Cargando...</p>}
    </>
  );
};

export default TiendasPage;
