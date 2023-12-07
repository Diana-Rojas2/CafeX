import { useEffect, useState } from "react";
import { ICarrito } from "../models/ICarrito";
import { useSession } from "next-auth/react";
import axios from "axios";
import { IProducto } from "../models/IProducto";
import Swal from "sweetalert2";

interface CartProps {
  cartItems: ICarrito[];
  cartOpen: boolean;
  toggleCart: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, cartOpen, toggleCart }) => {
  const [carrito, setCarrito] = useState<ICarrito[]>([]);
  const [costo, setCosto] = useState<number[]>([]);
  const { data: session } = useSession();
  const [productos, setProductos] = useState<IProducto[]>([]);

  const obtenerCarritoUsuario = async () => {
    if (session && session.user && session.user.token) {
      try {
        const response = await fetch(
          `http://localhost:8080/Carrito/${session.user.data.Id}`,
          {
            headers: { Authorization: `${session.user.token}` },
          }
        );

        if (response.ok) {
          const json = await response.json();
          const carritoUsuario = json[0];
          handlePedido(carritoUsuario.id);
          
        }
      } catch (error) {
        console.error("Error al obtener el carrito del usuario:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  useEffect(() => {
    obtenerCarrito();
    obtenerCostoCarrito();
  }, [session]);

  const fetchData = async () => {
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

  const obtenerCarrito = async () => {
    if (session && session.user && session.user.token) {
      try {
        const response = await fetch(
          `http://localhost:8080/Carrito/${session.user.data.Id}`,
          {
            headers: { Authorization: `${session.user.token}` },
          }
        );

        if (response.ok) {
          const json = await response.json();
          setCarrito(json);
        }
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    }
  };

  const obtenerCostoCarrito = async () => {
    if (session && session.user && session.user.token) {
      try {
        const config = {
          headers: { Authorization: `${session.user.token}` },
        };
        const res = await axios.get(
          `http://localhost:8080/Carrito/CostoCarrito/${session.user.data.Id}`,
          config
        );
        setCosto(res.data);
      } catch (error) {
        console.log("error al obtener el costo del carrito", error);
      }
    }
  };

  const handleAumentar = async (productoId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/Carrito/aumentar/${session?.user.data.Id}/${productoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Cantidad aumentada correctamente");
        obtenerCarrito();
        obtenerCostoCarrito();
      } else {
        console.error("Error al aumentar la cantidad");
      }
    } catch (error) {
      console.log("Error al aumentar la cantidad:", error);
    }
  };

  const handleDisminuir = async (productoId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/Carrito/disminuir/${session?.user.data.Id}/${productoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Cantidad disminuida correctamente");
        obtenerCarrito();
        obtenerCostoCarrito();
      } else {
        console.error("Error al disminuir la cantidad");
      }
    } catch (error) {
      console.log("Error al disminuir la cantidad: ", error);
    }
  };

  const handleEliminar = async (productoId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/Carrito/EliminarProducto/${session?.user.data.Id}/${productoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Producto eliminado correctamente");
        obtenerCarrito();
        obtenerCostoCarrito();
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.log("Error al eliminar el producto:", error);
    }
  };

  const handlePedido = async (carritoId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/Venta/${carritoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
      if (response.ok) {
        console.log("Pedido realizado correctamente");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Pedido realizado correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        setCarrito([]);
        obtenerCostoCarrito(); 
      } else {
        console.error("Error al realizar el pedido");
      }
    } catch (error) {
      console.log("Error al realizar el pedido: ", error);
    }
  };

  return (
    <div className="float-right">
      <div
        className={`fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300 ${
          cartOpen
            ? "translate-x-0 ease-out z-50"
            : "translate-x-full ease-in z-50"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium text-gray-700">Tu carito</h3>
          <button
            onClick={toggleCart}
            className="text-gray-600 focus:outline-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <hr className="my-3" />

        {carrito.map((carritoItem: ICarrito) => (
          
          <>
            <div className="mt-6" key={carritoItem.id}>
              
              {carritoItem.items.map((item, index) => {
                const productoEnCarrito = productos.find(
                  (producto) => producto.id === item.productoId
                );
                if (!productoEnCarrito) return null;
                return (
                  <>
                    <div
                      className="flex items-center mb-4"
                      key={`${carritoItem.id}-${index}`}
                    >
                      <img
                        className="h-20 w-20 object-cover rounded"
                        src={productoEnCarrito.urlsImagenes[0]}
                        alt=""
                      />
                      <div className="mx-3 relative">
                        <div className="flex flex-col">
                          <h3 className="text-base text-gray-600">
                            {productoEnCarrito.nombre}
                          </h3>
                          <span className="text-gray-600 text-sm justify-end ml-2">
                            ${productoEnCarrito.precio} c/u
                          </span>
                        </div>
                        <div className="flex items-center mt-3">
                          <button
                            className="text-gray-500 focus:outline-none focus:text-gray-600"
                            onClick={() => handleDisminuir(item.productoId)}
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </button>
                          <span className="text-gray-700 mx-2">
                            {item.cantidad}
                          </span>
                          <button
                            className="text-gray-500 focus:outline-none focus:text-gray-600"
                            onClick={() => handleAumentar(item.productoId)}
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </button>
                          <div className="absolute bottom-0 right-0">
                            <button
                              className="text-gray-500 focus:outline-none focus:text-gray-600"
                              onClick={() => handleEliminar(item.productoId)}
                            >
                              {/* Icono de eliminar */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16"
                                width="14"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="#a0aec0"
                                  d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />
                    <br />
                  </>
                );
              })}
            </div>
            <hr />
            <h3 className="text-xl text-gray-600">
              Total del carrito: {costo}
            </h3>
            <button className="w-full" onClick={obtenerCarritoUsuario}>
              <a className="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                <span>Hacer pedido</span>
                <svg
                  className="h-5 w-5 mx-2"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </button>
          </>
        ))}
      </div>
    </div>
  );
};

export default Cart;
