"use client";

import Link from "next/link";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const AgregarVendedorPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session?.user.token);
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const idUsuario = session?.user.data.Id;/* AQUI ACCEDES AL ID DEL USUARIO QUE INICIA SESION */
    const response = await fetch(
      "http://localhost:8080/Vendedor/SolicitarVendedor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${session?.user.token}`,
        },
        body: JSON.stringify({
          idUsuario: idUsuario,/* AQUI SE ASIGNA */
          rfc: formData.get("rfc"),
          curp: formData.get("curp"),
          claveElector: formData.get("claveElector"),
          motivoSolicitud: formData.get("motivoSolicitud"),
          descripcionProductos: formData.get("descripcionProductos"),
        }),
      }
    );
    if (response.ok) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Solitud enviada",
        showConfirmButton: false,
        timer: 1500
      });
      router.push("/");
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

  return (
    <div className="flex items-center justify-center p-12 dark:text-white">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={onSubmit}>
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
              type="text"
              name="claveElector"
              id="claveElector"
              placeholder="Correo Electronico"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="motivoSolicitud"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              Motivo de solicitud
            </label>
            <textarea
              name="motivoSolicitud"
              id="motivoSolicitud"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            ></textarea>
          </div>
          <div className="mb-5">
            <label
              htmlFor="descripcionProductos"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              Descripcion de sus productos
            </label>
            <textarea
              name="descripcionProductos"
              id="descripcionProductos"
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
              <Link
                className="m-2 hover:shadow-form rounded-md bg-gray-700 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                href={"/"}
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

export default AgregarVendedorPage;
