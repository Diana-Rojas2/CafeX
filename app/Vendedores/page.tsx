'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from 'next/link';


const SolicitudPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);

    const darkModeHandler = (e: { matches: boolean | ((prevState: boolean) => boolean); }) => setIsDarkMode(e.matches);
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
                    src={isDarkMode ? '/LogoCafeXB.png' : '/LogoCafeXN.png'}
                    priority
                    alt="logotipo"
                    width={160}
                    height={160}
                  />
                </center>
                <div className="mb-2">
                  <label
                    className="block mb-2 text-base font-bold  text-black dark:text-white text-center"
                    htmlFor="usuario"
                  >
                    Para poder crear tu cuenta de vendedor, necesitamos validar tus datos
                  </label>
                </div>
                  <hr className="mb-2 border-t" />
                <div className="flex flex-row m-2  items-center">
                  <input
                    className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5"
                    type="checkbox"
                    name='terminos'
                  />
                  <label
                    htmlFor="terminos"
                    className="block align-middle text-sm font-bold text-gray-700 ml-2 dark:text-white"
                  >
                    Acepto los terminos y condiciones y autorizo el uso de mis datos
                  </label>
                </div>

                <div className=" mt-5 text-center">
                  <Link
                  className="w-full px-4 py-2 font-bold  text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit" href={'/Vendedores/Agregar'}                  >
                    Crear cuenta de vendedor
                  </Link>
                </div>

              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SolicitudPage