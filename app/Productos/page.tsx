"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Link from "next/link";
import { IProducto } from "../models/IProducto";
import { ITienda } from "../models/ITienda";
import { ICategoria } from "../models/ICategoria";
import "public/estilo.css";

interface SubFilter {
  id: string;
  label: string;
  selected: boolean;
}

interface Filter {
  id: string;
  label: string;
  selected: boolean;
  subfilters?: SubFilter[];
}

const filtersData: Filter[] = [
  {
    id: "categoria",
    label: "Categoría",
    selected: false,
    subfilters: [],
  },
  {
    id: "precio",
    label: "Precio",
    selected: false,
    subfilters: [
      { id: 'hasta_300', label: 'Hasta $300', selected: false },
      { id: 'entre_300_y_800', label: '$300 a $800', selected: false },
      { id: 'mayores_800', label: 'Más de $800', selected: false },
    ],
  },
  {
    id: "tienda",
    label: "Tienda",
    selected: false,
    subfilters: [],
  },
];


function ProductosPage() {
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [filters, setFilters] = useState<Filter[]>(filtersData);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [tiendas, setTiendas] = useState<ITienda[]>([]);

  const applyFilters = () => {
    const filteredProductos = productos.filter((producto) => {
      const categoriaFilter = filters.find((filter) => filter.id === 'categoria');
      const precioFilter = filters.find((filter) => filter.id === 'precio');
      const tiendaFilter = filters.find((filter) => filter.id === 'tienda');

      const categoriaSelected = categoriaFilter?.subfilters?.find((subfilter) => subfilter.selected);
      const tiendaSelected = tiendaFilter?.subfilters?.find((subfilter) => subfilter.selected);

      let precioRangeFilter;
      if (precioFilter) {
        precioRangeFilter = precioFilter.subfilters?.find((subfilter) => subfilter.selected);
      }

      const categoriaMatch = !categoriaSelected || producto.categoria === Number(categoriaSelected.id);
      const tiendaMatch = !tiendaSelected || producto.tienda === tiendaSelected.id;

      let precioMatch = true;
      if (precioRangeFilter) {
        const precio = producto.precio; 
        switch (precioRangeFilter.id) {
          case 'hasta_300':
            precioMatch = precio <= 300;
            break;
          case 'entre_300_y_800':
            precioMatch = precio > 300 && precio <= 800;
            break;
          case 'mayores_800':
            precioMatch = precio > 800;
            break;
          default:
            precioMatch = true;
        }
      }

      return categoriaMatch && tiendaMatch && precioMatch;
    });

    setProductos(filteredProductos);
  };

  const handleFilterChange = (filterId: string) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.id === filterId) {
          return { ...filter, selected: !filter.selected };
        } else if (filter.subfilters) {
          return {
            ...filter,
            subfilters: filter.subfilters.map((subfilter) =>
              subfilter.id === filterId
                ? { ...subfilter, selected: !subfilter.selected }
                : subfilter
            ),
          };
        }
        return filter;
      })
    );

    setSelectedFilters((prevSelectedFilters) => {
      if (prevSelectedFilters.includes(filterId)) {
        return prevSelectedFilters.filter((id) => id !== filterId);
      } else {
        return [...prevSelectedFilters, filterId];
      }
    });
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFilters]);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  useEffect(() => {
    async function fetchData() {
      try {
        const datos = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}Producto`,
          {
            cache: "no-cache",
          }
        );
        const json = await datos.json();
        setProductos(json);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const datos = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}Tienda`,
          {
            cache: "no-cache",
          }
        );
        const json = await datos.json();
        setTiendas(json);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      //Obtener categorías desde la API
      try {
        const categoriasDatos = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}Categoria`, {
          cache: "no-cache",
        });
        const categorias = await categoriasDatos.json();

        setFilters((prevFilters) =>
          prevFilters.map((filter) => {
            if (filter.id === "categoria") {
              return {
                ...filter,
                subfilters: categorias.map((categoria:ICategoria) => ({
                  id: categoria.id.toString(),
                  label: categoria.categoria,
                  selected: false,
                })),
              };
            }
            return filter;
          })
        );
      } catch (error) {
        console.error("Error fetching category data: ", error);
      }
    }

    async function fetchStores() {
      //Obtener tiendas desde la API
      try {
        const tiendasDatos = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}Tienda`, {
          cache: "no-cache",
        });
        const tiendas = await tiendasDatos.json();

        setFilters((prevFilters) =>
          prevFilters.map((filter) => {
            if (filter.id === "tienda") {
              return {
                ...filter,
                subfilters: tiendas.map((tienda: ITienda) => ({
                  id: tienda.id.toString(),
                  label: tienda.nombre,
                  selected: false,
                })),
              };
            }
            return filter;
          })
        );
      } catch (error) {
        console.error("Error fetching store data: ", error);
      }
    }

    fetchCategories();
    fetchStores();
  }, []);

  
  return (
    <div className="flex static">
      <Sidebar filters={filters} handleFilterChange={handleFilterChange} />

      <div className="flex-1 p-8">
        <Link
          className="hover:shadow-form rounded-md bg-[#2F4858] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          href={"/Productos/Agregar"}
        >
          Agregar
        </Link>
        <h1 className="text-3xl font-bold mb-4 text-center text-brown mt-4 dark:text-white">
          Productos
        </h1>
        <div className="static grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 ">
        {productos.map((producto) => (
            <div key={producto.id} className="p-2">
              <div>
                <div>
                  <div
                    className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 
                      rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white
                      cursor-pointer duration-150 hover:scale-105 hover:shadow-md
                      dark:bg-gray-700 dark:border-gray-800 rounded-l-lg"
                  >
                    <div
                      className="w-full md:w-1/3 bg-white grid place-items-center
                    dark:bg-gray-700 border-gray-600 rounded-l-lg"
                    >
                      <Link href={`/Productos/Detalles/${producto.id}`}>
                        <img
                          src={producto.urlsImagenes[0]}
                          alt="imagen cafe"
                          className="rounded-xl "
                        />
                      </Link>
                    </div>
                    <div
                      className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3
                    dark:bg-gray-700 border-gray-600 rounded-l-lg"
                    >
                      <div className="flex justify-between item-center">
                        {/* Estrellas nuevas */}
                        <div className="rating flex items-center">
                          <p className="text-gray-600 font-bold text-sm ml-1">
                            <span className="text-gray-500 font-normal dark:text-white">
                              ({producto.interacciones.visitas} visitas)
                            </span>
                          </p>

                          {Array.from(
                            { length: producto.interacciones.evaluacion },
                            (_, i) => i
                          ).map((_, index) => (
                            <span key={index} className="star-filled">
                              ★
                            </span>
                          ))}
                          {Array.from(
                            { length: 5 - producto.interacciones.evaluacion },
                            (_, i) => i
                          ).map((_, index) => (
                            <span key={index} className="star-empty">
                              ★
                            </span>
                          ))}
                          <br />
                          <p className="text-gray-600 font-bold text-sm ml-1 dark:text-white">
                            {producto.interacciones.evaluacion}
                          </p>
                        </div>

                        {/*  Corazon like */}
                        <button className="btn">
                          <svg
                            className="icon"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
                          </svg>
                        </button>
                      </div>
                      <Link href={`/Productos/Detalles/${producto.id}`}>
                        <h3 className="font-black text-gray-800 md:text-3xl dark:text-white">
                          {producto.nombre}
                        </h3>
                        <p className="md:text-lg text-gray-500 text-base dark:text-white">
                          {producto.descripcion}
                        </p>
                        <p className="font-black text-gray-800 dark:text-white">
                          {producto.precio}
                          <span className=" text-gray-600 text-base dark:text-white">
                            {" "}
                            (MXN)
                          </span>
                        </p >
                        {tiendas.map(
                          (tienda) =>
                            producto.tienda === tienda.id && (
                              <p
                                key={tienda.id}
                                className="text-gray-500 text-base dark:text-white"
                              >
                                Tienda: {tienda.nombre}
                              </p>
                            )
                        )}
                      </Link>
                      <div className="flex flex-wrap items-center justify-center mt-2">
                        <Link
                          className="hover:shadow-form rounded-md bg-green-700 py-2 px-4 text-center text-base font-semibold text-white outline-none"
                          href={`Productos/Modificar/${producto.id}`}
                        >
                          Modificar
                        </Link>
                        <div className="ml-2"></div>
                        <Link
                          className="hover:shadow-form rounded-md bg-red-700 py-2 px-4 text-center text-base font-semibold text-white outline-none"
                          href={`Productos/Eliminar/${producto.id}`}
                        >
                          Eliminar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductosPage;
