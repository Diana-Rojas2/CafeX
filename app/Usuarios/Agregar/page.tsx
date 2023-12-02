"use client";
import { IRol } from "@/app/models/IRol";
import { IUsuario } from "@/app/models/IUsuario";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const AgregarUPage = () => {
  const { data: session, status } = useSession();
  const [roles, setRoles] = useState<IRol[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/Rol", {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setRoles(json);
      });
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("http://localhost:8080/Usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user.token}`,
      },
      body: JSON.stringify({
        nombre: formData.get("nombre"),
        apellidoPaterno: formData.get("apellidoPaterno"),
        apellidoMaterno: formData.get("apellidoMaterno"),
        correoElectronico: formData.get("correoElectronico"),
        telefono: formData.get("telefono"),
        usuario: formData.get("usuario"),
        pwd: formData.get("pwd"),
        idRol: formData.get("idRol"),
      }),
    });
    if (response.ok) {
      router.push("/Usuarios");
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
        console.error("Error parsing response as text:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al procesar la respuesta del servidor.",
        });
      }
    }
  }

  if (session?.user.data.Id_Rol !== 1) {
    return (
      <>
      <center>
      <img className="w-72" src="https://cdn-icons-png.flaticon.com/512/7564/7564865.png" alt="cafe triste" />
        <h2 className="text-4xl text-red-600 text-center">Página no autorizada</h2>
      </center></>
    );
  }

  return (
    <div className="flex items-center justify-center p-12 dark:text-white">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={onSubmit}>
          <h2 className="uppercase text-center">Agregar Usuario</h2>
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              id="nombre"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            />
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="apellidoPaterno"
                  className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
                >
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  placeholder="Apellido Paterno"
                  id="apellidoPaterno"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="apellidoMaterno"
                  className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
                >
                  Apellido Materno
                </label>
                <input
                  type="text"
                  name="apellidoMaterno"
                  placeholder="Apellido Materno"
                  id="apellidoMaterno"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="correoElectronico"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              name="correoElectronico"
              placeholder="Correo Electronico"
              id="correoElectronico"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="telefono"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              placeholder="Telefono"
              id="telefono"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            />
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="usuario"
                  className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  name="usuario"
                  id="usuario"
                  placeholder="Usuario"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="pwd"
                  className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="pwd"
                  id="pwd"
                  placeholder="Contraseña"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="idRol"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              Rol
            </label>

            <select
              name="idRol"
              id="idRol"
              className="form-select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            >
              {roles.map((e: IRol) => (
                <option key={e.id} value={e.id}>
                  {e.rol}
                </option>
              ))}
            </select>
          </div>
          <div>
            <center>
              <button
                type="submit"
                className="m-2 hover:shadow-form rounded-md bg-[#2F4858] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Agregar
              </button>
              <Link
                className="m-2 hover:shadow-form rounded-md bg-gray-700 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                href={"/Usuarios"}
              >
                Regresar
              </Link>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarUPage;
