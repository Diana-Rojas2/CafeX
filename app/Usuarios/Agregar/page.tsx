"use client";
import { IRol } from "@/app/models/IRol";
import { IUsuario } from "@/app/models/IUsuario";
import Link from "next/link";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";

async function getRoles() {
  const roles = await fetch("http://localhost:8080/Rol");
  const respuesta = await roles.json();
  return respuesta;
}

const AgregarUPage = async () => {
  const roles: IRol[] = await getRoles();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
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
        idRol: formData.get("idRol"),
      }),
    });
    const data = await response.json();
    alert(data.mensaje);
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
                  placeholder="Contraseña"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <input type="hidden" name="idRol" value={2} />
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              Rol
            </label>
            <select
              className="form-select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
              name="idRol"
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
                className="hover:shadow-form rounded-md bg-[#2F4858] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Agregar
              </button>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarUPage;
