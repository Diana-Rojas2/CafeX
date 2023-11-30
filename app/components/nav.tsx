"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./car";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { useSession, signOut } from "next-auth/react";

const iconColor = "text-black dark:text-white";

const Nav: React.FC = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const node = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);

    const darkModeHandler = (e: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => setIsDarkMode(e.matches);
    darkModeQuery.addListener(darkModeHandler);

    return () => darkModeQuery.removeListener(darkModeHandler);
  }, []);

  const toggleCart = () => {
    setUserMenuOpen(false);
    setCartOpen(!cartOpen);
  };

  const toggleUserMenu = () => {
    setCartOpen(false);
    setUserMenuOpen(!userMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (node.current && !node.current.contains(event.target as Node)) {
      setIsOpen(false);
      setCartOpen(false);
      setUserMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#a2b38b] border-gray-200 dark:bg-gray-900" ref={node}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Ícono para el menú de hamburguesas solo en pantallas pequeñas */}
          <div className="w-full text-white dark:text-white md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none mx-4 sm:mx-0"
            >
              <FontAwesomeIcon
                style={{ fontSize: "15px" }}
                icon={faBars}
                className={iconColor}
              ></FontAwesomeIcon>
            </button>
          </div>

          <div className="w-full items-center text-slate-900 dark:text-white md:text-center text-2xl font-semibold flex">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Image
                src={isDarkMode ? "/LogoCafeXB.png" : "/LogoCafeXN.png"}
                alt="logotipo"
                priority={true}
                width={60}
                height={60}
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                CafeX
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-end w-full">
            <button
              onClick={toggleCart}
              className="text-white focus:outline-none mx-4 sm:mx-0"
            >
              <FontAwesomeIcon
                style={{ fontSize: "15px" }}
                icon={faCartShopping}
                className={iconColor}
              ></FontAwesomeIcon>
            </button>
          </div>
          {/* Menu Usuario */}
          <div className="relative mx-2">
            <button
              onClick={toggleUserMenu}
              className="text-white focus:outline-none mx-4 sm:mx-0"
            >
              <FontAwesomeIcon
                style={{ fontSize: "15px" }}
                icon={faUser}
                className={iconColor}
              ></FontAwesomeIcon>
            </button>

            {userMenuOpen && (
              <div>
                {session ? (
                  <div className="absolute bg-white right-0 mt-2 py-2 w-48 border rounded-lg shadow-xl z-10">
                  <button
                    onClick={() => signOut()}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full"
                  >
                    Cerrar sesión
                  </button>
                  </div>
                ) : (
                  <div className="absolute bg-white right-0 mt-2 py-2 w-48 border rounded-lg shadow-xl z-10">
                    <Link
                      href="/Login"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/CrearCuenta"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Crear cuenta
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <nav
        className={`sm:flex sm:justify-center sm:items-center ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-[#a2b38b] dark:bg-gray-900 flex flex-col sm:flex-row p-2 md:p-0 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:border-0 md:dark:bg-gray-900 dark:border-gray-700">
          <Link
            className="block py-2 px-3  bg-[#a2b38b] dark:bg-gray-900 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            aria-current="page"
            href={"/"}
          >
            Inicio
          </Link>

          <Link
            href={"/Usuarios"}
            className="block py-2 px-3  bg-[#a2b38b] dark:bg-gray-900 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            aria-current="page"
          >
            Usuarios
          </Link>

          <Link
            href="/Productos"
            className="block py-2 px-3  bg-[#a2b38b] dark:bg-gray-900 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Productos
          </Link>

          <Link
            href="/Tiendas"
            className="block mr-5 py-2 px-3  bg-[#a2b38b] dark:bg-gray-900 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Tiendas
          </Link>
        </div>
      </nav>

      <div className="relative max-w-lg mx-auto">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faSearch} />
        </span>
        <input
          name="buscar"
          className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex justify-end">
        <Link className="text-gray-900 dark:text-white" href={"/Vendedores"}>
          ¿Quieres ser vendedor?
        </Link>
      </div>
      <Cart cartOpen={cartOpen} toggleCart={toggleCart} />
    </div>
  );
};

export default Nav;
