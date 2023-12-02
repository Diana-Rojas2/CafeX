"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IUsuario } from "../models/IUsuario";
import { useSession } from "next-auth/react";
import { IEncargado } from "../models/IEncargado";
import { ITienda } from "../models/ITienda";

const EncargadosPage = () => {
  const { data: session, status } = useSession();
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [encargados, setEncargados] = useState<IEncargado[]>([]);
  const [tiendas, setTiendas] = useState<ITienda[]>([]);

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

  useEffect(() => {
    fetch("http://localhost:8080/Encargado", {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setEncargados(json);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/Tienda", {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTiendas(json);
      });
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session?.user.data.Id_Rol !== 3) {
    return (
      <>
        <center>
          <img
            className="w-72"
            src="https://cdn-icons-png.flaticon.com/512/7564/7564865.png"
            alt="cafe triste"
          />
          <h2 className="text-4xl text-red-600 text-center">
            Página no autorizada
          </h2>
        </center>
      </>
    );
  }

  return (
    <div className="container items-center justify-center p-10">
      <h1 className="text-3xl text-center dark:text-white">
        Encargados Registrados
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
                Nombre completo
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Correo Electrónico
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Telefono
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Tienda asignada
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {usuarios
              .filter(
                (usuario) =>
                  usuario.idRol === 4 &&
                  encargados.some(
                    (encargado: IEncargado) =>
                      encargado.idVendedor === session.user.data.Id
                  )
              )
              .map((usuario) => (
                <tr
                  key={usuario.id}
                  className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                >
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    {usuario.nombre} {usuario.apellidoPaterno}{" "}
                    {usuario.apellidoMaterno}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    {usuario.correoElectronico}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    {usuario.telefono}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    {encargados.map(
                      (encargado) =>
                        encargado.id !== undefined &&
                        usuario.id === encargado.idUsuario &&
                        tiendas.map(
                          (tienda) =>
                            tienda.id === encargado.idTienda && (
                              <span key={tienda.id}>{tienda.nombre}</span>
                            )
                        )
                    )}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    {encargados.map(
                      (encargado) =>
                        encargado.id !== undefined &&
                        usuario.id === encargado.idUsuario && (
                          <Link
                            key={encargado.id}
                            className="ms-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                            href={`/Encargados/Eliminar/${encargado.id}`}
                          >
                            Eliminar
                          </Link>
                        )
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EncargadosPage;
