'use client';
import { IRol } from "@/app/models/IRol";
import { IUsuario } from "@/app/models/IUsuario";
import Link from "next/link";
import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


const CrearCuentaPage = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);

    const darkModeHandler = (e: { matches: boolean | ((prevState: boolean) => boolean); }) => setIsDarkMode(e.matches);
    darkModeQuery.addListener(darkModeHandler);

    return () => darkModeQuery.removeListener(darkModeHandler);
  }, []);



  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const idRol = 2;
    const response = await fetch("http://localhost:8080/Usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: formData.get("nombre"),
        apellidoPaterno: formData.get("apellidoPaterno"),
        apellidoMaterno: formData.get("apellidoMaterno"),
        correoElectronico: formData.get("correoElectronico"),
        telefono: formData.get("telefono"),
        usuario: formData.get("usuario"),
        pwd: formData.get("pwd"),
        idRol: idRol,
      }),
    });
    const data = await response.json();
    alert(data.mensaje);
  }

  return (
    <div className="font-mono">
      <div className="container mx-auto">
        <div className="flex justify-center px-4 my-12">
          <div className="w-full dark:border-gray-600 xl:w-3/4 lg:w-11/12 md:w-4/5 flex border border-solid border-gray-400 rounded-lg">
            <div className="w-full lg:w-1/2 bg-white dark:bg-gray-700 dark:border-gray-700 p-5 rounded-lg lg:rounded-r-none">
              <form className=" px-8 pb-4 mb-2 dark:bg-gray-700 bg-white rounded" onSubmit={onSubmit}>
                <center>
                  <Image
                    src={isDarkMode ? '/LogoCafeXB.png' : '/LogoCafeXN.png'}
                    priority
                    alt="logotipo"
                    width={160}
                    height={160}
                  />
                </center>
                <h4 className="text-2x1 text-center dark:text-white">Crear Cuenta</h4>
                <div className="mb-4">
                  <label
                    className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="nombre"
                  >
                    Nombre
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="nombre"
                    type="text"
                    placeholder="Nombre"
                    required
                  />
                </div>
                <div className="mb-4 flex">
                  <div className="w-1/2 pr-2">
                    <label
                      className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="apellidoPaterno"
                    >
                      Apellido Paterno
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="apellidoPaterno"
                      type="text"
                      placeholder="Apellido Paterno"
                      required
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label
                      className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="apellidoMaterno"
                    >
                      Apellido Materno
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="apellidoMaterno"
                      type="text"
                      placeholder="Apellido Materno"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4 flex">
                  <div className="w-1/2 pr-2">
                    <label
                      className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="correoElectronico"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="correoElectronico"
                      type="email"
                      placeholder="Correo Electrónico"
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label
                      className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="telefono"
                    >
                      Teléfono
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="telefono"
                      type="tel"
                      placeholder="Teléfono"
                    />
                  </div>
                </div>
                <div className=" flex mb-4">
                  <div className="w-1/2 pr-2">
                    <label
                      className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="usuario"
                    >
                      Usuario
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="usuario"
                      type="text"
                      placeholder="Usuario"
                      required
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label
                      className="block mb-1 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="pwd"
                    >
                      Contraseña
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      name="pwd"
                      type="password"
                      placeholder="********"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 ,,focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Crear Cuenta
                  </button>
                </div>
                <hr className="mb-2 border-t" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline dark:text-white hover:text-blue-800"
                    href="Login"
                  >
                    ¿Ya tienes una cuenta?
                  </Link>
                </div>
              </form>
            </div>
            <div className="w-full h-full bg-gray-700 hidden lg:block lg:w-3/5 bg-cover rounded-l-lg">
              <img
                className="rounded-r-lg"
                src="https://i.pinimg.com/736x/3d/92/23/3d92234b076fbe89f50c48d0b5f92d3d.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearCuentaPage;
