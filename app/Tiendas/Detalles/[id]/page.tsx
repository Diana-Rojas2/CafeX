"use client";
import L, { Icon, LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export interface Props {
  params: { id: number };
}

const TiendasPage = ({ params }: Props) => {
  const coordenadasTec = [19.882814, -97.3930258] as LatLngExpression;
  const [tienda, setTienda] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/Tienda/Id/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTienda(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [params.id]);
  return (
    <>
      {tienda && (
        <div key={tienda.id} className="md:flex items-center -mx-10">
          <div className="mt-9 w-full md:w-1/2 px-10 relative rounded-xl shadow-lg mx-auto bg-white border dark:bg-gray-700 dark:text-white border-white sm:text-sm">
            <div className="mb-5">
              <h1 className="font-bold text-2xl mb-2">{tienda.nombre}</h1>
              <span className="text-2xl leading-none align-baseline">
                {tienda.correoElectronico}
              </span>
              <br />
              <p className="text-sm mb-5">{tienda.telefono}</p>
            </div>
          </div>
        </div>
      )}
      {!tienda && <p>Cargando...</p>}
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold mb-4 mt-4 dark:text-white">
          Sucursales
        </h2>
        <div className="w-full h-full">
          <MapContainer
            style={{ width: "100%", height: "100%" }}
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
      </div>{" "}
    </>
  );
};

export default TiendasPage;
