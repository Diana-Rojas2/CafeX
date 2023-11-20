"use client";
import Link from "next/link";
import { Props } from "../../Modificar/[id]/page";
import { ITienda } from "@/app/models/ITienda";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ELiminarTiendaPage = ({ params }: Props) => {
  const router = useRouter();
  const [tienda, setTienda] = useState<any>(null); 

  const eliminarTienda = () => {
    axios.delete(`http://localhost:8080/Tienda/${params.id}`).then((res) => {
      router.push("/Tiendas");
      router.refresh();
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/Tienda/Id/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTienda(data[0]); 
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [params.id]);

  return (
    <>
    {tienda && (
      <h1 className="text-4xl text-center pt-10 dark:text-white">
        Estas seguro que desea eliminar la tienda: {tienda.nombre}
      </h1>
    )}
      <div className="text-center container flex items-center justify-center p-6">
        <button
          className="m-2 hover:shadow-form rounded-md bg-red-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
          onClick={eliminarTienda}
        >
          Eliminar
        </button>
        <Link
          className="m-2 hover:shadow-form rounded-md bg-gray-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
          href={"/Tiendas"}
        >
          Regresar
        </Link>
      </div>
    </>
  );
};

export default ELiminarTiendaPage;
