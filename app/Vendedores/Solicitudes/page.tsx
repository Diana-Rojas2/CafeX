import { IUsuario } from "@/app/models/IUsuario";
import Link from "next/link";
import React from "react";

async function getVendedores(): Promise<IUsuario[]> {
    const datos = await fetch('http://localhost:8080/Usuario',
    {
      cache: "no-cache"
    });
    const json = await datos.json();
    // Filtrar usuarios por el rol "vendedor"
    const usuariosVendedores = json.filter((usuario: IUsuario) => usuario.idRol === 3);
    return usuariosVendedores;
  }

const VendedoresPage = async () => {
  const usuarios : IUsuario[] = await getVendedores();
  return (
    <div className="container items-center justify-center p-10">
<h1 className="text-3xl text-center dark:text-white">Solicitudes de Vendedores</h1>
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
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
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
                    href={``}
                  >
                    Autorizar
                  </Link>
                  <Link
                    className="ms-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                    href={``}
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
