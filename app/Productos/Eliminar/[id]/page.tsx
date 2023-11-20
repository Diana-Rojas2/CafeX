'use client';
import Link from 'next/link';
import React from 'react';
import { Props } from "../../Modificar/[id]/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const EliminarProductosPage = ({ params }: Props) => {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null); 

  const eliminarProducto = () => {
    axios.delete(`http://localhost:8080/Producto/${params.id}`).then((res) => {
      router.push("/Productos");
      router.refresh();
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/Producto/Id/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data[0]); 
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [params.id]); 
  return (
    <>
    {product && (
      <h1 className="text-4xl text-center pt-10 dark:text-white">
        Estas seguro que desea eliminar el producto: {product.nombre}
      </h1>
    )}
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
