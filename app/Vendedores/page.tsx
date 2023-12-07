"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IUsuario } from "../models/IUsuario";
import Swal from "sweetalert2";
import { IVendedor } from "../models/IVendedor";

const SolicitudPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { data: session } = useSession();
  const [vendedor, setVendedor] = useState<IVendedor[]>([]);
  const [termsChecked, setTermsChecked] = useState(false); // Nuevo estado para el checkbox

  let isUserAVendor = false;

  useEffect(() => {
    fetch("http://localhost:8080/Vendedor", {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setVendedor(json);
      })
      .catch((error) => {
        console.error("Error parsing response as text:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al procesar la respuesta del servidor.",
        });
      });
  }, [session]);

  const handleVerStatusClick = () => {
    if (session && session.user && session.user.data.Id) {
      const matchingVendor = vendedor.find(
        (vendor) => vendor.idUsuario === session.user.data.Id
      );

      if (matchingVendor) {
        // Si hay coincidencia, mostrar la retroalimentación en una alerta
        if(matchingVendor.retroalimentacion == ""){
          Swal.fire({
            title: "Retroalimentación del vendedor",
            text: "Aun no hay retroalimentacion",
            icon: "info",
          });
        } else {
          Swal.fire({
          title: "Retroalimentación del vendedor",
          text: matchingVendor.retroalimentacion,
          icon: "info",
        });
        }
        
      } else {
        Swal.fire({
          title: "Retroalimentación del vendedor",
          text: "Error inesperado",
          icon: "error",
        });
      }
    }
  };

  // Función para manejar el cambio en el checkbox de términos
  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(e.target.checked);
  };

  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);

    const darkModeHandler = (e: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => setIsDarkMode(e.matches);
    darkModeQuery.addListener(darkModeHandler);

    return () => darkModeQuery.removeListener(darkModeHandler);
  }, []);
  return (
    <div className="font-mono ">
      <div className="container mx-auto dark:border-gray-600">
        <div className="flex justify-center px-6 my-12 dark:border-gray-600">
          <div className="max-w-lg dark:bg-gray-700 bg-white rounded-lg lg:rounded">
            <div className="px-8 pt-1 pb-8  dark:bg-gray-700 bg-white dark:border-gray-600 rounded">
              <h4 className="text-xl text-center mt-2 dark:text-white text-black">
                Solicitar ser vendedor
              </h4>
              <center>
                <Image
                  src={isDarkMode ? "/LogoCafeXB.png" : "/LogoCafeXN.png"}
                  priority
                  alt="logotipo"
                  width={160}
                  height={160}
                />
              </center>
              <div className="mb-2">
                <p className="block mb-2 text-base font-bold  text-black dark:text-white text-center">
                  Para poder crear tu cuenta de vendedor, necesitamos validar
                  tus datos
                </p>
              </div>
              <hr className="mb-2 border-t" />
              <div className="flex flex-row m-2  items-center">
                <input
                  className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5"
                  type="checkbox"
                  name="terminos"
                  id="terminos"
                  onChange={handleTermsChange}
                />
                <label
                  htmlFor="terminos"
                  className="block align-middle text-sm font-bold text-gray-700 ml-2 dark:text-white"
                >
                  Acepto los
                  <a href="/Terminos" className="text-blue-600 dark:text-blue-400"> Términos y Condiciones </a>
                   
                   y autorizo el uso de mis
                  datos
                </label>
              </div>

              {/* <div className=" mt-5 text-center">
                  <Link
                  className="w-full px-4 py-2 font-bold  text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit" href={'/Vendedores/Agregar'}                  >
                    Crear cuenta de vendedor
                  </Link>
                </div> */}

              <div className="mt-5 text-center">
                {/* Los enlaces se habilitan o deshabilitan según el estado del checkbox */}
                {session && session.user && session.user.data.Id && vendedor.some(vendedor => vendedor.idUsuario === session.user.data.Id) ? (
                  <button
                  onClick={handleVerStatusClick}
                  className={`w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline ${
                    !termsChecked &&
                    "pointer-events-none opacity-50 cursor-not-allowed"
                  }`}
                >
                  Ver status
                </button>
                ) : (
                  <Link
                    className={`w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline ${
                      !termsChecked &&
                      "pointer-events-none opacity-50 cursor-not-allowed"
                    }`}
                    href={"/Vendedores/Agregar"}
                  >
                    Crear cuenta de vendedor
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolicitudPage;
