'use client';
import Link from 'next/link';
import React from 'react';
import { Props } from "../../Modificar/[id]/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from 'next-auth/react';

const EliminarProductosPage = ({ params }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [product, setProduct] = useState<string>(""); 

  const eliminarProducto = () => {
    const config = {
      headers: { Authorization: `${session?.user.token}` },
    };
    axios.delete(`http://localhost:8080/Producto/${params.id}`,config).then((res) => {
      router.push("/Productos");
      router.refresh();
    });
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `${session?.user.token}` },
    };
      axios.get(`http://localhost:8080/Producto/Id/${params.id}`,config).then(res => {
          setProduct(res.data.nombre);
      });
  }, [])

  return (
    <>
      <h1 className="text-4xl text-center pt-10 dark:text-white">
        Estas seguro que desea eliminar el producto: {product}
      </h1>
      <div className="text-center container flex items-center justify-center p-6">
        <button
          className="m-2 hover:shadow-form rounded-md bg-red-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
          onClick={eliminarProducto}
        >
          Eliminar
        </button>
        <Link
          className="m-2 hover:shadow-form rounded-md bg-gray-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
          href={"/Productos"}
        >
          Regresar
        </Link>
      </div>
    </>
  );
};

export default EliminarProductosPage;
