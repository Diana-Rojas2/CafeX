"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSession, signOut } from "next-auth/react";

const iconColor = "text-black dark:text-white";

const NavB = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);

    const darkModeHandler = (e: { matches: boolean | ((prevState: boolean) => boolean); }) => setIsDarkMode(e.matches);
    darkModeQuery.addListener(darkModeHandler);

    return () => darkModeQuery.removeListener(darkModeHandler);
  }, []);


  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeUserMenu);
    return () => {
      document.removeEventListener("mousedown", closeUserMenu);
    };
  }, []);

  return (
    <>
      <nav className="bg-[#a2b38b]  border-gray-200 dark:bg-gray-900 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-2">
          
          <Link
            href="/"
            className=" flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={isDarkMode ? '/LogoCafeXB.png' : '/LogoCafeXN.png'}
              alt="logotipo"
              priority={true}
              width={60}
              height={60}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CafeX
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <FontAwesomeIcon
              style={{ fontSize: "15px" }}
              icon={faBars}
              className={iconColor}
            ></FontAwesomeIcon>
          </button>

          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMobileMenuOpen ? "flex" : "hidden"
            }`}
          >
            <ul className="bg-[#a2b38b] dark:bg-gray-900  flex flex-col w-full p-2 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  className="bg-[#a2b38b] dark:bg-gray-900  block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                  href={"/"}
                >
                  Inicio
                </Link>
              </li>
              {session && session.user.data.Id_Rol === 1 ? (
        <><li>
                  <Link
                    href={"/Usuarios"}
                    className="bg-[#a2b38b] dark:bg-gray-900 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page"
                  >
                    Usuarios
                  </Link>
                </li><li>
                    <Link
                      href={"/Vendedores/Solicitudes"}
                      className="bg-[#a2b38b] dark:bg-gray-900 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      aria-current="page"
                    >
                      Solicitudes
                    </Link>
                  </li></>
                  
      ) : (
        <li>
                <Link
                  href={"/Encargados"}
                  className="bg-[#a2b38b] dark:bg-gray-900 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Encargados
                </Link>
              </li>
      )}
              
              
              <li>
                <Link
                  href="/Productos"
                  className="bg-[#a2b38b] dark:bg-gray-900  block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/Tiendas"
                  className="bg-[#a2b38b] dark:bg-gray-900  block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Tiendas
                </Link>
              </li>
              <li>

                {session ? (
                  <button
                  onClick={() => signOut()} 
                  className="bg-[#a2b38b] dark:bg-gray-900  block mr-5 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Cerrar Sesion
                </button>
                ) : (
                  <Link
                      className="bg-[#a2b38b] dark:bg-gray-900  block mr-5 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" 
                      href={"/Login"}>
                  Iniciar Sesion
                </Link>
                )}
              </li>
              <li>
                <div className="relative mt-3 md:hidden">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FontAwesomeIcon
                      style={{ fontSize: "15px" }}
                      icon={faSearch}
                      className="iconColor"
                    />
                  </span>
                  <input
                    type="text"
                    id="search-Navbar"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Buscar..."
                  />
                </div>
              </li>
            </ul>
            <div className="relative hidden md:block">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FontAwesomeIcon
                  style={{ fontSize: "15px" }}
                  icon={faSearch}
                  className="iconColor"
                />
              </span>
              <input
                type="text"
                id="search-navbar"
                className=" mr-2 block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar..."
              />
              
            </div>
            
          </div>
          
        </div>
        
      </nav>
    </>
  );
};

export default NavB;
