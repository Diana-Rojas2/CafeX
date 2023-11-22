"use client";

import Link from "next/link";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";

/* async function getRoles() {
  const roles = await fetch("http://localhost:8080/Rol");
  const respuesta = await roles.json();
  return respuesta;
} */

const AgregarUPage = async () => {
  //const roles: IRol[] = await getRoles();

/*   async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
  } */

  return (
    <div className="flex items-center justify-center p-12 dark:text-white">
      <div className="mx-auto w-full max-w-[550px]">
        <form /* onSubmit={onSubmit} */>
          <h2 className="uppercase text-center">Solicitud de Vendedor </h2>
          <div className="mb-4">
            <label
              htmlFor="rfc"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              RFC
            </label>
            <input
              type="text"
              name="rfc"
              placeholder="RFC"
              id="rfc"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="curp"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              CURP
            </label>
            <input
              type="text"
              name="curp"
              placeholder="CURP"
              id="curp"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="claveElector"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              Clave de elector
            </label>
            <input
              type="email"
              name="claveElector"
              id="claveElector"
              placeholder="Correo Electronico"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="motivo"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              Motivo de solicitud
            </label>
            <textarea name="motivo" id="motivo" 
            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            ></textarea>
          </div>
          <div className="mb-5">
            <label
              htmlFor="descripcion"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              Descripcion de sus productos
            </label>
            <textarea name="descripcion" id="descripcion" 
            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            ></textarea>
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
