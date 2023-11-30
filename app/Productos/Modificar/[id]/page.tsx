"use client";
import { ICategoria } from "@/app/models/ICategoria";
import { ITienda } from "@/app/models/ITienda";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export interface Props {
  params: { id: number };
}

const ModificarProductosPage = ({ params }: Props) => {
  const { data: session, status } = useSession();
  const { handleSubmit, register, setValue } = useForm();
  const router = useRouter();
  const [tiendas, setTiendas] = useState<ITienda[]>([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `${session?.user.token}` },
    };
    axios
      .get(`http://localhost:8080/Producto/Id/${params.id}`, config)
      .then((productoSeleccionado) => {
        /* const productoSeleccionado = prod.data.find(
          (p: { id: number }) => p.id === params.id
        ); */
        if (productoSeleccionado) {
          setValue("id", productoSeleccionado.data.id);
          setValue("nombre", productoSeleccionado.data.nombre);
          setValue("descripcion", productoSeleccionado.data.descripcion);
          setValue("precio", productoSeleccionado.data.precio);
          setValue("stock", productoSeleccionado.data.stock);
        } else {
          console.error("No se encontró el producto con el ID proporcionado.");
        }
      });
  }, []);

  const onSubmit = handleSubmit(async (formData) => {
    const config = {
      headers: { Authorization: `${session?.user.token}` },
    };
    try {
      await axios.put(`http://localhost:8080/Producto/${params.id}`, formData, config);
      router.push("/Productos");
      router.refresh();
    } catch (error) {
      console.error("Error al actualizar el procucto:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al actualizar el producto",
      });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center justify-center min-h-screen  dark:bg-gray-800">
        <div className="bg-white shadow-md rounded w-full md:w-96 px-8 pt-6 pb-8 mb-4 mt-4  ">
          <div className="flex justify-center mb-2">
            <img src="/LogoCafeXN.png" alt="Logo" className="h-16 w-16 mb-2" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Modificar Producto
          </h2>
          <input type="hidden" {...register("id")} />
          <div className="mb-6">
            <label
              htmlFor="nombre"
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Nombre
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              {...register("nombre")}
              type="text"
              id="nombre"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="descripcion"
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Descripción
            </label>
            <textarea
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              {...register("descripcion")}
              id="descripcion"
              placeholder="Descripción del producto"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="precio"
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Precio
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              {...register("precio")}
              id="precio"
              type="text"
              placeholder="Precio del producto"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="stock"
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Stock
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              {...register("stock")}
              id="stock"
              type="text"
              placeholder="Stock del producto"
            />
          </div>

          <div className="flex justify-center mt-2">
            <button
              className="m-2 hover:shadow-form rounded-md bg-[#2F4858] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              type="submit"
            >
              Guardar
            </button>
            <Link
              className="m-2 hover:shadow-form rounded-md bg-gray-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
              href={"/Productos"}
            >
              Regresar
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModificarProductosPage;
