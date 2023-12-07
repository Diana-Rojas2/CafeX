"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ILogin } from "../models/ILogin";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const [error, SetError] = useState<string>("");
  const { handleSubmit, register } = useForm<ILogin>();
  const { data: session, status } = useSession();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);

    const darkModeHandler = (e: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => setIsDarkMode(e.matches);
    darkModeQuery.addListener(darkModeHandler);

    return () => darkModeQuery.removeListener(darkModeHandler);
  }, []);

  const onSubmit = handleSubmit(async (formData) => {
    const responseLogin = await signIn("credentials", {
      usuario: formData.usuario,
      password: formData.pwd,
      redirect: false,
    });

    if (responseLogin?.ok) {
      console.log(session?.user.data.Id_Rol);
      router.push("/");
    } else {
      SetError("Usuario y/o password incorrectos");
      return;
    }
  });

  return (
    <div className="font-mono ">
      <div className="container mx-auto dark:border-gray-600">
        <div className="flex justify-center px-6 my-12 dark:border-gray-600">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex border border-solid border-gray-400 dark:border-gray-600 rounded-lg">
            <div className="w-full dark:bg-gray-700 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
              <img
                className="rounded-l-lg"
                src="https://puntadelcielo.com.mx/cdn/shop/collections/categorias_1_06b6e7fb-f951-432a-9195-a9987e71e666.jpg?v=1667409306"
                alt=""
              />
            </div>

            <div className="w-full lg:w-1/2 dark:bg-gray-700 bg-white p-5 rounded-lg lg:rounded-l-none">
              <form
                className="px-8 pt-1 pb-8 mb-2 dark:bg-gray-700 bg-white dark:border-gray-600 rounded"
                onSubmit={onSubmit}
              >
                <center>
                  <Image
                    src={isDarkMode ? "/LogoCafeXB.png" : "/LogoCafeXN.png"}
                    priority
                    alt="logotipo"
                    width={160}
                    height={160}
                  />
                </center>
                <h4 className="text-2x1 text-center dark:text-white text-black">
                  Iniciar Sesión
                </h4>
                <div className="mb-2">
                  <label
                    className="block mb-2 text-sm font-bold  text-black"
                    htmlFor="usuario"
                  >
                    Usuario
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight  text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="usuario"
                    type="text"
                    placeholder="Usuario"
                    {...register("usuario")}
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="block mb-2 text-sm font-bold  text-black"
                    htmlFor="pwd"
                  >
                    Contraseña
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-2 text-sm leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="pwd"
                    type="password"
                    placeholder="********"
                    {...register("pwd")}
                  />
                </div>
                <div className="row mt-3">
                  <h3 className="text-red-800 text-sm"> {error}</h3>
                </div>

                <div className="mb-3 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold  text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Iniciar Sesión
                  </button>
                </div>
                <hr className="mb-2 border-t" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 dark:text-white"
                    href="CrearCuenta"
                  >
                    Crear Cuenta!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
