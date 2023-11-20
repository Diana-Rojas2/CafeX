"use client";
import { ICategoria } from "@/app/models/ICategoria";
import { FormEvent } from "react";
import Link from "next/link";
import React from "react";
import { ITienda } from "@/app/models/ITienda";

async function getCategorias() {
  const categorias = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}Categoria`
  );
  const respuesta = await categorias.json();
  return respuesta;
}

async function getTiendas() {
  const tiendas = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}Tienda`);
  const respuesta = await tiendas.json();
  return respuesta;
}

const AgregarProductosPage = async () => {
  const categorias: ICategoria[] = await getCategorias();
  const tiendas: ITienda[] = await getTiendas();
  

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const urlsImagenesInput = formData.get("urlsImagenes") as string;
    const urlsImagenesArray = urlsImagenesInput.split(/\r?\n/).filter(Boolean);
    const response = await fetch(`http://localhost:8080/Producto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: formData.get("nombre"),
        descripcion: formData.get("descripcion"),
        precio: formData.get("precio"),
        categoria: formData.get("categoria"),
        interacciones: {
          vistas: formData.get("visitas"),
          likes: formData.get("likes"),
          evaluacion: formData.get("evaluacion"),
        },
        urlsImagenes: urlsImagenesArray,
        stock: formData.get("stock"),
        tienda: formData.get("tienda"),
      }),
    });
    const data = await response.json();
    alert(data.mensaje);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="bg-white shadow-md rounded w-full md:w-96 px-8 pt-6 pb-8 mb-4 mt-4  ">
          <div className="flex justify-center mb-2">
            <img src="/LogoCafeXN.png" alt="Logo" className="h-16 w-16 mb-2" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Agregar Producto
          </h2>
          <div className="mb-6">
            <label
              htmlFor=""
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Nombre
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              name="nombre"
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
              name="descripcion"
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
              name="precio"
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
              name="categoria"
            >
              {categorias.map((e: ICategoria) => (
                <option key={e.id} value={e.id}>
                  {e.categoria}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              name="visitas"
              type="hidden"
              value={0}
            />
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              name="likes"
              type="hidden"
              value={0}
            />
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              name="evaluacion"
              type="hidden"
              value={0}
              placeholder="Evaluación del producto"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor=""
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              URLs de Imágenes
            </label>
            <textarea
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              name="urlsImagenes"
              placeholder="URLs de las imágenes (separadas por salto de línea)"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor=""
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Stock
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              name="stock"
              type="number"
              placeholder="Cantidad en stock"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor=""
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Tienda
            </label>
            <select
              className="form-select appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              name="tienda"
            >
              {tiendas.map((e: ITienda) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="mb-6">
            <label
              htmlFor="product-image"
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Imagen
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              aria-labelledby="file_input_label"
            />
          </div> */}
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

export default AgregarProductosPage;
