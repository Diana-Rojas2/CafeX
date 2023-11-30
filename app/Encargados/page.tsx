"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IUsuario } from "../models/IUsuario";
import { useSession } from "next-auth/react";

const UsuariosPage = () => {
  const { data: session, status } = useSession();
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);

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

  if (status === "loading") {
    return <p>Loading...</p>;
  }

    if (session?.user.data.Id_Rol !== 3) {
    return (
      <>
      <center>
      <img className="w-72" src="https://cdn-icons-png.flaticon.com/512/7564/7564865.png" alt="cafe triste" />
        <h2 className="text-4xl text-red-600 text-center">Página no autorizada</h2>
      </center></>
    );
  }

  return (
    <div className="container items-center justify-center p-10">
      <h1 className="text-3xl text-center dark:text-white">
        Usuarios Registrados
      </h1>
      <Link
        className="hover:shadow-form rounded-md bg-gray-600 dark:bg-[#2F4858] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        href={"/Encargados/Agregar"}
      >
        Agregar
      </Link>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Nombre
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Apellido paterno
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Apellido materno
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Correo Electrónico
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Telefono
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Usuario
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {usuarios
              .filter((usuario) => usuario.idRol === 4)
              .map((usuario) => (
                <tr
                  key={usuario.id}
                  className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                >
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    {usuario.nombre}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    {usuario.apellidoPaterno}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    {usuario.apellidoMaterno}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    {usuario.correoElectronico}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    {usuario.telefono}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    {usuario.usuario}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    <Link
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                      href={`/Encargados/Asigar/${usuario.id}`}
                    >
                      Asignar tienda
                    </Link>
                    <Link
                      className="ms-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                      href={`/Encargados/Eliminar/${usuario.id}`}
                    >
                      Eliminar
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosPage;
