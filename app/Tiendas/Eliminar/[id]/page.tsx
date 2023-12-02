"use client";
import Link from "next/link";
import { Props } from "../../Modificar/[id]/page";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ELiminarTiendaPage = ({ params }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tienda, setTienda] = useState<any>(null); 

  const eliminarTienda = () => {
    const config = {
      headers: { Authorization: `${session?.user.token}` },
    };
    axios.delete(`http://localhost:8080/Tienda/${params.id}`,config ).then((res) => {
      router.push("/Tiendas");
      router.refresh();
    });
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `${session?.user.token}` },
    };
      axios.get(`http://localhost:8080/Tienda/Id/${params.id}`,config).then(res => {
          setTienda(res.data.nombre);
      });
  }, [])

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
    <>
    {tienda && (
      <h1 className="text-4xl text-center pt-10 dark:text-white">
        Estas seguro que desea eliminar la tienda: {tienda}
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
