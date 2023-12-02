"use client";
import { ICategoria } from "@/app/models/ICategoria";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import { ITienda } from "@/app/models/ITienda";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/services/fbConfig";

const AgregarProductosPage = () => {
  const [tiendas, setTiendas] = useState<ITienda[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    fetch("http://localhost:8080/Categoria", {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCategorias(json);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/Tienda", {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTiendas(json);
      });
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const files = formData.getAll("imagenes");

    // SUBIR IMAGENES FIREBASE
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const fileName = (file as File).name;
        const storageRef = ref(storage, `imagenes/${fileName}`);
        await uploadBytes(storageRef, file as Blob);
        const imageUrlFromStorage = await getDownloadURL(storageRef);
        return imageUrlFromStorage;
      })
    );

    const response = await fetch(`http://localhost:8080/Producto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: ` ${session?.user.token}`
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
        urlsImagenes: imageUrls,
        stock: formData.get("stock"),
        tienda: formData.get("tienda"),
      }),
    });
    if (response.ok) {
      router.push("/Productos");
      router.refresh();
    } else {
      try {
        const dataText = await response.text();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: dataText,
        });
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al procesar la respuesta del servidor.",
        });
      }
    }
  }

  if (session?.user.data.Id_Rol === 2) {
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

  if (session?.user.data.Id_Rol === 2) {
    return (
      <>
      <center>
      <img className="w-72" src="https://cdn-icons-png.flaticon.com/512/7564/7564865.png" alt="cafe triste" />
        <h2 className="text-4xl text-red-600 text-center">Página no autorizada</h2>
      </center></>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-800">
        <div className="bg-white shadow-md rounded w-full md:w-96 px-8 pt-6 pb-8 mb-4 mt-4  ">
          <div className="flex justify-center mb-2">
            <img src="/LogoCafeXN.png" alt="Logo" className="h-16 w-16 mb-2" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Agregar Producto
          </h2>
          <div className="mb-6">
            <label
              htmlFor="nombre"
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Nombre
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              name="nombre"
              id="nombre"
              type="text"
              placeholder="Nombre del producto"
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
              name="descripcion"
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
              name="precio"
              id="precio"
              type="text"
              placeholder="Precio del producto"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="categoria"
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Categoría
            </label>
            <select
              className="form-select appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              name="categoria"
              id="categoria"
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
              id="visitas"
              type="hidden"
              value={0}
            />
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              name="likes"
              id="likes"
              type="hidden"
              value={0}
            />
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              name="evaluacion"
              id="evaluacion"
              type="hidden"
              value={0}
              placeholder="Evaluación del producto"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="fileInput"
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Imágenes del Producto
            </label>
            <input
              type="file"
              id="fileInput"
              name="imagenes"
              accept="image/*"
              multiple
              className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-labelledby="file_input_label"
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
              name="stock"
              id="stock"
              type="number"
              placeholder="Cantidad en stock"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="tienda"
              className="block tracking-wide text-grey-darker font-bold mb-2"
            >
              Tienda
            </label>
            <select
              className="form-select appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              name="tienda"
              id="tienda"
            >
              {tiendas.map((e: ITienda) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
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

export default AgregarProductosPage;
