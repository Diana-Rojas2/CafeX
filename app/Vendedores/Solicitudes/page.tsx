"use client";
import { getSession, useSession } from "next-auth/react";
import { IUsuario } from "@/app/models/IUsuario";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IVendedor } from "@/app/models/IVendedor";

const VendedoresPage = () => {
  const [vendedores, setVendedores] = useState<IVendedor[]>([]);
  const { data: session, status } = useSession();
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);

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
        setVendedores(json);
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

  if (session?.user.data.Id_Rol !== 1) {
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
        Solicitudes de Vendedores
      </h1>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Usuario
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                RFC
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                CRP
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Clave de elector
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Motivo de su solicitud
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Descripcion de sus productos
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {vendedores.map((e: IVendedor) => (
              <tr
                key={e.idUsuario}
                className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
              >
                {usuarios.map(
                  (usuario) =>
                    usuario.id !== undefined &&
                    e.idUsuario === usuario.id && (
                      <td
                        key={usuario.id}
                        className="p-2 md:border md:border-grey-500 text-left md:table-cell"
                      >
                        {usuario.nombre} {usuario.apellidoPaterno}{" "}
                        {usuario.apellidoMaterno}
                      </td>
                    )
                )}

                <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                  {e.rfc}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                  {e.curp}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                  {e.claveElector}
                </td>
                <td className="p-2 text-justify md:border md:border-grey-500 md:table-cell">
                  {e.motivoSolicitud}
                </td>
                <td className="p-2 text-justify md:border md:border-grey-500 md:table-cell">
                  {e.descripcionProductos}
                </td>
                <td className="p-2 text-justify md:border md:border-grey-500 md:table-cell">
                <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                    href={`/Vendedores/Autorizar/${e.idVendedor}/${e.idUsuario}`}
                  >
                    Autorizar
                  </Link>
                  <Link
                    className="ms-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                    href={`/Vendedores/Rechazar/${e.idVendedor}/${e.idUsuario}`}
                  >
                    Rechazar
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

export default VendedoresPage;
