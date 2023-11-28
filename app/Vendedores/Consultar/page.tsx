"use client";

import Link from "next/link";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";

const AgregarVendedorPage = async () => {

  return (
    <div className="flex items-center justify-center p-12 dark:text-white">
      <div className="mx-auto w-full max-w-[550px]">
        <form /* onSubmit={onSubmit} */>
          <h2 className="uppercase text-center text-xl">Mas informacion del Vendedor </h2>
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
              placeholder="cargar infromacion RFC"
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
              <Link
                    className="hover:shadow-form rounded-md mx-2  bg-[#2F4858] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    href={``}
                  >
                    Autorizar
                  </Link>
                  <Link
                    className="hover:shadow-form rounded-md mx-2  bg-red-700 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    href={``}
                  >
                    Rechazar
                  </Link>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarVendedorPage;
