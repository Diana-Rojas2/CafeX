"use client";
import { IUsuario } from "@/app/models/IUsuario";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";

export interface Props {
  params: { idVendedor: number; idUsuario: number };
}

const AutorizarPage = ({ params }: Props) => {
  const router = useRouter();
  /* const { idVendedor } = router.query;
  const { idUsuario } = router.query; */
  const { data: session, status } = useSession();
  const [usuarios, setUsuarios] = useState<any>(null);
  const [vendedor, setVendedor] = useState<any>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:8080/Vendedor/Verificar/${params.idVendedor}/${params.idUsuario}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${session?.user.token}`,
        },
        body: JSON.stringify({
          idVendedor: params.idVendedor,
          idUsuario: params.idUsuario,
        }),
      }
    );
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Solitud de vendedor aceptada",
        showConfirmButton: false,
        timer: 2500,
      });
      router.push("/Vendedores/Solicitudes");
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

  useEffect(() => {
    fetch(`http://localhost:8080/Usuario/${params.idUsuario}`, {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: ` ${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setUsuarios(json);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/Vendedor/${params.idVendedor}`, {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: ` ${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setVendedor(json);
      });
  }, []);

  return (
    <div className="flex items-center justify-center p-12 dark:text-white">
      <div className="mx-auto w-full max-w-[550px]">
        <h2 className="uppercase text-center text-xl">Solicitud de Vendedor </h2>
          {usuarios && (
        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
          >
            Nombre:
          </label>
          <p className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md">
          {usuarios.nombre} {usuarios.apellidoPaterno} {usuarios.apellidoMaterno}
          </p>
        </div>
        )}
        {vendedor && (
          <><div className="mb-4">
            <label
              htmlFor="curp"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              CURP:
            </label>
            <p className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md">
              {vendedor.curp}
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="rfc"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              RFC:
            </label>
            <p className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md">
              {vendedor.rfc}
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="claveElector"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              Clave de elector:
            </label>
            <p className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md">
              {vendedor.claveElector}
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="motivoSolicitud"
              className="mb-3 block text-base font-medium text-[#07074D] dark:text-white"
            >
              Motivo de la solicitud:
            </label>
            <p className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md">
              {vendedor.motivoSolicitud}
            </p>
          </div>
          </>
        )}
          <form onSubmit={onSubmit}>
        <div className="mt-4 flex justify-center items-center space-x-4">
        <center>
            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-[#2F4858] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Autorizar
            </button>
            <Link
              className="m-2 hover:shadow-form rounded-md bg-gray-700 py-3 px-8 text-center text-base font-semibold text-white outline-none"
              href={"/Vendedores/Solicitudes"}
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

export default AutorizarPage;
