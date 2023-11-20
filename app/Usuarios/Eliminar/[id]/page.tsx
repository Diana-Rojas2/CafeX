'use client'
import { useForm } from "react-hook-form";
import { Props } from "../../Actualizar/[id]/page";
import { useEffect, useState } from "react";
import { IUsuario } from "@/app/models/IUsuario";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EliminarUPage = ({params} : Props) => {

    const router = useRouter();
    const [usuario, setUsuario] = useState<string>("")

    const eliminarUsuario = () =>{
        axios.delete(`http://localhost:8080/Usuario/${params.id}`).then(res => {
            router.push("/Usuarios");
            router.refresh();
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/Usuario/${params.id}`).then(res => {
            setUsuario(res.data.nombre);
        });
    }, [])

  return (
    <><h1 className="text-4xl text-center pt-10 dark:text-white" >Estas seguro que desea eliminar a: {usuario}</h1>
    <div className="text-center container flex items-center justify-center p-6">
      <Link
        className="ms-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 border border-gray-500 rounded"
        href={`/Usuarios`}
      >
        Regresar
      </Link>
      <button
      onClick={eliminarUsuario}
        className="ms-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
      >
        Eliminar
      </button>
    </div></>
  );
};

export default EliminarUPage;
