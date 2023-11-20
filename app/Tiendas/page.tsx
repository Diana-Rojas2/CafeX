
import Link from "next/link";
import React from "react";
import { ITienda } from "../models/ITienda";


async function getTiendas(){
  const datos = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}Tienda`,
  {
    cache: "no-cache" /* cuando modificamos decargue la info actualizada */
  });
  const json = await datos.json();
  return json;
}


const TiendasPage = async () => {
  const tiendas : ITienda[] = await getTiendas();

  return (


    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="mx-auto p-2">
          <div className="flex-1 p-8">
            <Link
              className="hover:shadow-form rounded-md bg-[#2F4858] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              href={"/Tiendas/Agregar"}
            >
              Agregar
            </Link>
            <h1 className="mt-4 text-3xl font-bold mb-4 text-center text-brown dark:text-white">
              Tiendas
            </h1>
            
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tiendas.map((tienda : ITienda) => 
                  <div key={tienda.id} className="w-64 p-2 mx-2 mb-4">
                    <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                    <Link href={`/Tiendas/Detalles/${tienda.id}`}>
                      {/* <img src={tienda.imagen} className="rounded-xl" /> */}
                      <p className="my-2 pl-2 font-bold text-gray-500">
                        {tienda.nombre}
                      </p>
                      <p className="mb-2 ml-2 text-sm text-gray-600">
                        {tienda.correoElectronico}
                      </p>
                      <p className="mb-2 ml-2 text-sm text-gray-600">
                        {tienda.telefono}
                      </p>
                      <p className="mb-2 ml-2 text-sm text-gray-600">
                        Localidad: {tienda.idLocalidad}
                      </p>
                      <p className="mb-2 ml-2 text-sm text-gray-600">
                        Usuario: {tienda.idUsuario}
                      </p>
                      </Link>
                      <div className="flex justify-center mt-2">
                        <Link className="hover:shadow-form rounded-md bg-green-700 py-2 px-5 text-center text-base font-semibold text-white outline-none" href={`/Tiendas/Modificar/${tienda.id}`}>
                          Modificar
                        </Link>
                        <div className="ml-2"></div>
                        <Link className="hover:shadow-form rounded-md bg-red-700 py-2 px-5 text-center text-base font-semibold text-white outline-none" href={`/Tiendas/Eliminar/${tienda.id}`}>
                          Eliminar
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
           
          </div>
        </div>
      </div></>
  );
};

export default TiendasPage;
