"use client";
import { IEncargado } from "@/app/models/IEncargado";
import { IProducto } from "@/app/models/IProducto";
import { ITienda } from "@/app/models/ITienda";
import { IVenta } from "@/app/models/IVenta";
import {
  faFlagCheckered,
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "public/estilo.css";
import { Icon } from "leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import Link from "next/link";

const Pedidospage = () => {
  const [activeTab, setActiveTab] = useState("todo");
  const changeTab = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };
  const iconColor = "text-black dark:text-white";

  const [ventas, setVentas] = useState<IVenta[]>([]);
  const { data: session } = useSession();
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [tiendas, setTiendas] = useState<ITienda[]>([]);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [selectedStoreCoords, setSelectedStoreCoords] = useState<
    [number, number] | null
  >(null);

  const fetchVentas = async () => {
    try {
      const datos = await fetch("http://localhost:8080/Venta", {
        cache: "no-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${session?.user.token}`,
        },
      });
      const ventasData = await datos.json();

      if (session && session.user.data.Id_Rol === 2) {
        const userId = session.user.data.Id;
        const ventasUsuario = ventasData.filter(
          (venta: IVenta) => venta.userId === userId
        );
        setVentas(ventasUsuario);
      }

      if (session && session.user.data.Id_Rol === 1) {
        setVentas(ventasData);
      }

      if (session && session.user.data.Id_Rol === 3) {
        const tiendasResponse = await fetch("http://localhost:8080/Tienda", {
          cache: "no-cache",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `${session?.user.token}`,
          },
        });
        const tiendasData = await tiendasResponse.json();

        const tiendasVendedor = tiendasData.filter(
          (tienda: ITienda) => tienda.idUsuario === String(session.user.data.Id)
        );

        const ventasVendedor = ventasData.filter((venta: IVenta) =>
          tiendasVendedor.some(
            (tienda: ITienda) => venta.tiendaId === tienda.id
          )
        );
        setVentas(ventasVendedor);
      }

      if (session && session.user.data.Id_Rol === 4) {
        const encargadoResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}Encargado`,
          {
            cache: "no-cache",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `${session.user.token}`,
            },
          }
        );
        const encargadoJson = await encargadoResponse.json();

        const tiendaAsignada = encargadoJson.find(
          (encargado: IEncargado) =>
            encargado.idUsuario === session.user.data.Id
        );

        if (tiendaAsignada) {
          const ventasEncargado = ventasData.filter(
            (venta: IVenta) => venta.tiendaId === tiendaAsignada.idTienda
          );
          setVentas(ventasEncargado);
        }
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchProductos = async () => {
    try {
      const datos = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}Producto`,
        {
          cache: "no-cache",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await datos.json();
      setProductos(json);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchTiendas = async () => {
    try {
      const datos = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}Tienda`,
        {
          cache: "no-cache",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await datos.json();
      setTiendas(json);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchVentas();
    fetchProductos();
    fetchTiendas();
  }, [session]);

  const cancelarVenta = async (ventaId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/Venta/Cancelar/${ventaId}`,
        {
          cache: "no-cache",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${session?.user.token}`,
          },
        }
      );
      const data = await response.text();
      console.log(data);
      fetchVentas();
    } catch (error) {
      console.error("Error cancelando venta: ", error);
    }
  };

  const aprobarVenta = async (ventaId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/Venta/aprovar/${ventaId}`,
        {
          cache: "no-cache",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${session?.user.token}`,
          },
        }
      );
      const data = await response.text();
      console.log(data);
      fetchVentas();
    } catch (error) {
      console.error("Error aprobando venta: ", error);
    }
  };

  const finalizarVenta = async (ventaId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/Venta/finalizar/${ventaId}`,
        {
          cache: "no-cache",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${session?.user.token}`,
          },
        }
      );
      const data = await response.text();
      console.log(data);
      fetchVentas();
    } catch (error) {
      console.error("Error finalizando venta: ", error);
    }
  };

  useEffect(() => {
    fetchVentas();
    fetchProductos();
  }, [session]);

  const getProductoInfo = (productoId: string) => {
    return productos.find((producto) => producto.id === productoId);
  };

  const userId =
    session && session.user.data.Id_Rol === 2 ? session.user.data.Id : null;

  const filteredVentas = ventas.filter((venta) => {
    if (activeTab === "todo") {
      if (session && session.user.data.Id_Rol === 2) {
        return venta.userId === userId;
      }
      return true;
    } else {
      return (
        venta.status.toLowerCase() === activeTab.toLowerCase() &&
        ((session &&
          session.user.data.Id_Rol === 2 &&
          venta.userId === userId) ||
          (session && session.user.data.Id_Rol !== 2))
      );
    }
  });

  return (
    <div className="font-sans min-h-screen">
      <div className="p-8 pb-20">
        <div className="max-w-md mx-auto">
          <div className="flex space-x-4 mb-4 p-2 bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-md">
            <button
              onClick={() => changeTab("todo")}
              className={`flex-1 py-2 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                activeTab === "todo" ? "bg-blue-600 text-white" : ""
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => changeTab("procesando")}
              className={`flex-1 py-2 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                activeTab === "procesando" ? "bg-blue-600 text-white" : ""
              }`}
            >
              Procesando
            </button>
            <button
              onClick={() => changeTab("aprobado")}
              className={`flex-1 py-2 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                activeTab === "aprobado" ? "bg-blue-600 text-white" : ""
              }`}
            >
              Aprobado
            </button>
            <button
              onClick={() => changeTab("cancelado")}
              className={`flex-1 py-2 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                activeTab === "cancelado" ? "bg-blue-600 text-white" : ""
              }`}
            >
              Cancelado
            </button>
            <button
              onClick={() => changeTab("completada")}
              className={`flex-1 py-2  rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                activeTab === "completada" ? "bg-blue-600 text-white" : ""
              }`}
            >
              Completado
            </button>
          </div>
          {filteredVentas.map((venta) => (
            <div
              key={venta.id}
              className={`transition-all duration-300 ease-in-out transform ${
                activeTab === "todo" ||
                activeTab === "procesando" ||
                activeTab === "aprobado" ||
                activeTab === "cancelado" ||
                activeTab === "completada"
                  ? ""
                  : "scale-0"
              } ${
                activeTab === "todo" ? "scale-100" : ""
              } bg-white dark:bg-gray-900 dark:text-white p-6 shadow-md border-l-4 border-blue-600 flex flex-col`}
            >
              {venta.productosVendidos.map((productoVendido, index) => {
                const producto = getProductoInfo(productoVendido.productoId);
                if (producto) {
                  const tiendaProducto = tiendas.find(
                    (tienda) => tienda.id === producto?.tienda
                  );

                  return (
                    <div key={producto.id} className="flex items-start mb-4">
                      <div className="mb-4 flex-shrink-0">
                        <img
                          src={producto.urlsImagenes[0]}
                          alt={producto.nombre}
                          className="rounded-md w-30 h-40 mt-3"
                        />
                      </div>
                      <div className="ml-4">
                        <ul>
                          <li className="text-gray-700 dark:text-white">
                            Producto: {producto.nombre}
                          </li>
                          <li className="text-gray-700 dark:text-white">
                            Cantidad: {productoVendido.cantidad}
                          </li>
                          <li className="text-gray-700 dark:text-white">
                            Precio: $ {producto.precio} c/u
                          </li>

                          {index === venta.productosVendidos.length - 1 && (
                            <>
                              <hr />
                              
                              <li className="text-gray-700 dark:text-white">
                                Tienda:{" "}
                                {tiendaProducto
                                  ? tiendaProducto.nombre
                                  : "No disponible"}
                              </li>
                              {session && session.user.data.Id_Rol === 2 && (
                              <Link
                                className="text-blue-600 underline"
                                href={`/Tiendas/Detalles/${producto.tienda}`}
                              >
                                Ver ubicación en mapa
                              </Link>
                              )}
                              <li className="text-gray-700 dark:text-white">
                                Folio: {venta.folio}
                              </li>
                              <li className="text-gray-700 dark:text-white">
                                Estado: {venta.status}
                              </li>
                              <li className="text-blue-600 font">
                                Total de venta: $ {venta.total}
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
              {/* Mostrar botones */}
              <div className="ml-36">
                {(venta.status.toLowerCase() === "procesando" ||
                  venta.status.toLowerCase() === "aprobado") &&
                  session &&
                  (session.user.data.Id_Rol === 3 ||
                    session.user.data.Id_Rol === 4) && (
                    // Mostrar botones solo una vez
                    <div className="flex items-center">
                      {venta.status.toLowerCase() === "procesando" && (
                        <>
                          <button
                            className="mx-2"
                            onClick={() => cancelarVenta(venta.id)}
                          >
                            <FontAwesomeIcon
                              style={{ fontSize: "20px" }}
                              icon={faSquareXmark}
                              className={iconColor}
                            />
                          </button>
                          <button
                            className="mx-2"
                            onClick={() => aprobarVenta(venta.id)}
                          >
                            <FontAwesomeIcon
                              style={{ fontSize: "20px" }}
                              icon={faSquareCheck}
                              className={iconColor}
                            />
                          </button>
                        </>
                      )}
                      {venta.status.toLowerCase() === "aprobado" && (
                        <button
                          className="mx-2"
                          onClick={() => finalizarVenta(venta.id)}
                        >
                          <FontAwesomeIcon
                            style={{ fontSize: "20px" }}
                            icon={faFlagCheckered}
                            className={iconColor}
                          />
                        </button>
                      )}
                    </div>
                  )}
              </div>
              <hr className="bg-gray-600" />
            </div>
          ))}
        </div>
      </div>

      {selectedStoreCoords && (
        <div className="map-overlay">
          <div className="map-container">
            <h2>Mapa de la tienda</h2>
            <MapContainer center={selectedStoreCoords} zoom={13}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={selectedStoreCoords}
                icon={
                  new Icon({
                    iconUrl: MarkerIcon.src,
                    iconSize: [25, 41], // Ajusta el tamaño del ícono [ancho, alto]
                    iconAnchor: [12, 41], // Ajusta el ancla del ícono [ancho, alto]
                  })
                }
              />
            </MapContainer>
            <button onClick={() => setSelectedStoreCoords(null)}>
              Cerrar mapa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidospage;
