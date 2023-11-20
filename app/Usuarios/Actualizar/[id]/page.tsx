'use client'
import { IRol } from '@/app/models/IRol';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'

export interface Props {
  params: { id: number };
}

const ActualizarUPage = ({ params }: Props) => {

    const { handleSubmit, register, setValue } = useForm();
  const router = useRouter();
  const [roles, setRoles] = useState<IRol[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/Rol').then(res => {
      setRoles(res.data);
      axios.get(`http://localhost:8080/Usuario/${params.id}`).then(prod => {
        setValue("id", prod.data.id);  
        setValue("nombre", prod.data.nombre);
        setValue("apellidoPaterno", prod.data.apellidoPaterno);
        setValue("apellidoMaterno", prod.data.apellidoMaterno);
        setValue("correoElectronico", prod.data.correoElectronico);
        setValue("telefono", prod.data.telefono);
        setValue("usuario", prod.data.usuario);
        setValue("pwd", prod.data.pwd);
      } )
    })
  }, [])

  const onSubmit = handleSubmit(async (formData) => {
    await axios.put(`http://localhost:8080/Usuario/${params.id}`, formData);
    router.push("/Usuarios");
    router.refresh();
  })


  return (
    <div className="flex items-center justify-center p-12 dark:text-white">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={onSubmit}>
          <h2 className="uppercase text-center">Actualizar Usuario</h2>
          <input type="hidden" {...register("id")} />
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="dark:text-white mb-3 block text-base font-medium text-[#07074D]"
            >
              Nombre
            </label>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
              {...register("nombre")}
            />
          </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="apePat"
                  className="dark:text-white mb-3 block text-base font-medium text-[#07074D]"
                >
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  {...register("apellidoPaterno")}
                  placeholder="Apellido Paterno"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="apeMat"
                  className="dark:text-white mb-3 block text-base font-medium text-[#07074D]"
                >
                  Apellido Materno
                </label>
                <input
                  type="text"
                  {...register("apellidoMaterno")}
                  placeholder="Apellido Materno"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="correo"
              className="dark:text-white mb-3 block text-base font-medium text-[#07074D]"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              {...register("correoElectronico")}
              placeholder="Correo Electronico"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="telefono"
              className="dark:text-white mb-3 block text-base font-medium text-[#07074D]"
            >
              Teléfono
            </label>
            <input
              type="text"
              {...register("telefono")}
              placeholder="Telefono"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="usuario"
              className="dark:text-white mb-3 block text-base font-medium text-[#07074D]"
            >
              Usuario
            </label>
            <input
              type="text"
              {...register("usuario")}
              placeholder="Usuario"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="pwd"
              className="dark:text-white mb-3 block text-base font-medium text-[#07074D]"
            >
              Contraseña
            </label>
            <input
              type="password"
              {...register("pwd")}
              placeholder="Contraseña"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#402E32] focus:shadow-md"
            />
          </div>
          <div>
            <center>
                <button type='submit' className='m-2 hover:shadow-form rounded-md bg-[#2F4858] py-3 px-8 text-center text-base font-semibold text-white outline-none'>Actualizar</button>
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

export default ActualizarUPage;
