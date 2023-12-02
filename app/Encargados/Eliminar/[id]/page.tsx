"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export interface Props {
  params: { id: number };
}

const EliminarEPage = ({ params }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [usuario, setUsuario] = useState<string>("");

  const eliminarUsuario = async () => {
    const config = {
      headers: { Authorization: `${session?.user.token}` },
    };

    try {
      const encargadoResponse = await axios.get(
        `http://localhost:8080/Encargado/${params.id}`,
        config
      );
      const idUsuario = encargadoResponse.data.idUsuario;

      const usuarioResponse = await axios.get(
        `http://localhost:8080/Usuario/${idUsuario}`,
        config
      );
      const nombreUsuario = usuarioResponse.data.nombre;

      await axios.delete(`http://localhost:8080/Encargado/${params.id}`, config);
      await axios.delete(`http://localhost:8080/Usuario/${idUsuario}`, config);

      router.push("/Encargados");
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al procesar la respuesta del servidor.",
        });
    }
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `${session?.user.token}` },
    };
    axios.get(`http://localhost:8080/Encargado/${params.id}`, config).then((res) => {
      const idUsuario = res.data.idUsuario;
      axios.get(`http://localhost:8080/Usuario/${idUsuario}`, config).then((userRes) => {
        setUsuario(userRes.data.nombre);
      });
    });
  }, []);

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
    <>
      <h1 className="text-4xl text-center pt-10 dark:text-white">
        Estas seguro que desea eliminar a: {usuario}
      </h1>
      <div className="text-center container flex items-center justify-center p-6">
        <Link
          className="ms-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 border border-gray-500 rounded"
          href={`/Encargados`}
        >
          Regresar
        </Link>
        <button
          onClick={eliminarUsuario}
          className="ms-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
        >
          Eliminar
        </button>
      </div>
    </>
  );
};

export default EliminarEPage;
