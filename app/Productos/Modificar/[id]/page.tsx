"use client";
import { ICategoria } from "@/app/models/ICategoria";
import { ITienda } from "@/app/models/ITienda";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export interface Props {
  params: { id: number};
}

const ModificarProductosPage = ({ params }: Props) => {
  const { handleSubmit, register, setValue } = useForm();
  const router = useRouter();
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [tiendas, setTiendas] = useState<ITienda[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/Categoria").then((res) => {
      setCategorias(res.data);
        axios
          .get(`http://localhost:8080/Producto/Id/${params.id}`)
          .then((prod) => {
            setValue("id", prod.data.id);
            setValue("nombre", prod.data.nombre);
            setValue("descripcion", prod.data.descripcion);
            setValue("precio", prod.data.precio);
            setValue("idCategoria", prod.data.idCategoria);
          });
 
    });
  }, []);

  const onSubmit = handleSubmit(async (formData) => {
    await axios.put(`http://localhost:8080/Producto/${params.id}`, formData);
    router.push("/Productos");
    router.refresh();
  });
  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
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
              htmlFor=""
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Nombre
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              {...register("nombre")}
              type="text"
              placeholder="Nombre del producto"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor=""
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Descripción
            </label>
            <textarea
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              {...register("descripcion")}
              placeholder="Descripción del producto"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor=""
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Precio
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              {...register("precio")}
              type="text"
              placeholder="Precio del producto"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor=""
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Categoría
            </label>
            <select
              className="form-select appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              {...register("idCategoria")}
            >
              {categorias.map((e: ICategoria) => (
                <option key={e.id} value={e.id}>
                  {e.categoria}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center mt-2">
            <button
              className="hover:shadow-form rounded-md bg-[#2F4858] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModificarProductosPage;