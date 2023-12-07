/* tiendas */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ITienda } from "../models/ITienda";
import { ILocalidad } from "../models/ILocalidad";
import { IUsuario } from "../models/IUsuario";
import { useSession } from "next-auth/react";
import Sidebar from "../components/sidebar";

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
    id: "localidad",
    label: "Localidad",
    selected: false,
    subfilters: [],
  },
  {
    id: "orden",
    label: "Orden",
    selected: false,
    subfilters: [
      {
        id: "ascendente",
        label: "Ascendente",
        selected: false,
      },
      {
        id: "descendente",
        label: "Descendente",
        selected: false,
      },
    ],
  },
];

function TiendasPage() {
  const [tiendas, setTiendas] = useState<ITienda[]>([]);
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const { data: session, status } = useSession();

  //FILTROS
  const [filters, setFilters] = useState<Filter[]>(filtersData);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredTiendas, setFilteredTiendas] = useState<ITienda[]>([]);

  const applyFilters = () => {
    const localidadFilter = filters.find((filter) => filter.id === "localidad");
    const localidadSelected = localidadFilter?.subfilters?.find(
      (subfilter) => subfilter.selected
    );

    const tiendasFilteredByLocalidad = tiendas.filter((tienda) => {
      const localidadMatch =
        !localidadSelected || tienda.localidad === localidadSelected.id;
      return localidadMatch;
    });

    const ordenFilter = filters.find((filter) => filter.id === "orden");
    const ordenSelected = ordenFilter?.subfilters?.find(
      (subfilter) => subfilter.selected
    );

    let tiendasOrdenadas = [...tiendasFilteredByLocalidad];

    if (ordenSelected) {
      if (ordenSelected.id === "ascendente") {
        tiendasOrdenadas = tiendasOrdenadas.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
      } else if (ordenSelected.id === "descendente") {
        tiendasOrdenadas = tiendasOrdenadas.sort((a, b) =>
          b.nombre.localeCompare(a.nombre)
        );
      }
    }

    setFilteredTiendas(tiendasOrdenadas);
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
  }, [selectedFilters, tiendas]);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  useEffect(() => {
    async function fetchLocalidades() {
      try {
        const categoriasDatos = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}Localidad`,
          {
            cache: "no-cache",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `${session?.user.token}`,
            },
          }
        );
        const localidades = await categoriasDatos.json();

        setFilters((prevFilters) =>
          prevFilters.map((filter) => {
            if (filter.id === "localidad") {
              return {
                ...filter,
                subfilters: localidades.map((localidad: ILocalidad) => ({
                  id: localidad.id.toString(),
                  label: localidad.localidad,
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
    fetchLocalidades();
  }, []);

  useEffect(() => {
    if (session && session.user.data.Id_Rol === 3) {
      fetch("http://localhost:8080/Tienda", {
        cache: "no-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${session?.user.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          // Filtrar las tiendas según el idUsuario de la sesión
          const filteredTiendas = json.filter(
            (tienda: ITienda) =>
              tienda.idUsuario === String(session.user.data.Id)
          );
          setTiendas(filteredTiendas);
        });
    } else {
      // Si no es un usuario con Id_Rol igual a 3, muestra todas las tiendas
      fetch("http://localhost:8080/Tienda", {
        cache: "no-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${session?.user.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setTiendas(json);
        });
    }
  }, [session]);

  useEffect(() => {
    fetch("http://localhost:8080/Localidad", {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setLocalidades(json);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/Usuario", {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${session?.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setUsuarios(json);
      });
  }, []);

  return (
    <div className="flex static">
      {(session &&
        (session.user.data.Id_Rol === 1 || session.user.data.Id_Rol === 2 &&
          <Sidebar filters={filters} handleFilterChange={handleFilterChange} />
          ))}

      <div className="flex min-h-screen  justify-center  dark:bg-gray-800">
        <div className="mx-auto p-2">
          <div className="flex-1 p-8">
            {session && session.user.data.Id_Rol === 3 && (
              <Link
                className="hover:shadow-form rounded-md bg-[#2F4858] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                href={"/Tiendas/Agregar"}
              >
                Agregar
              </Link>
            )}
            <h1 className="mt-4 text-3xl font-bold mb-4 text-center text-brown dark:text-white">
              Tiendas
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredTiendas.map((tienda: ITienda) => (
                <div key={tienda.id} className="w-64 p-2 mx-2 mb-4">
                  <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                    <Link href={`/Tiendas/Detalles/${tienda.id}`}>
                      <img src={"https://cdn-icons-png.flaticon.com/512/11787/11787151.png"} className="rounded-xl" />
                      <p className="my-2 pl-2 font-bold text-gray-500">
                        {tienda.nombre}
                      </p>
                      <p className="mb-2 ml-2 text-sm text-gray-600">
                        {tienda.correoElectronico}
                      </p>
                      <p className="mb-2 ml-2 text-sm text-gray-600">
                        {tienda.telefono}
                      </p>
                      {localidades.map(
                        (localidad) =>
                          tienda.idLocalidad === localidad.id && (
                            <p
                              key={localidad.id}
                              className="mb-2 ml-2 text-sm text-gray-600"
                            >
                              Localidad: {localidad.localidad}
                            </p>
                          )
                      )}
                      {usuarios.map(
                        (usuario) =>
                          usuario.id !== undefined &&
                          tienda.idUsuario === String(usuario.id) && (
                            <p
                              key={usuario.id}
                              className="mb-2 ml-2 text-sm text-gray-600"
                            >
                              Vendedor: {usuario.nombre}
                            </p>
                          )
                      )}
                    </Link>
                    {session && session.user.data.Id_Rol === 3 && (
                      <div className="flex justify-center mt-2">
                        <Link
                          className="hover:shadow-form rounded-md bg-green-700 py-2 px-5 text-center text-base font-semibold text-white outline-none"
                          href={`/Tiendas/Modificar/${tienda.id}`}
                        >
                          Modificar
                        </Link>
                        <div className="ml-2"></div>
                        <Link
                          className="hover:shadow-form rounded-md bg-red-700 py-2 px-5 text-center text-base font-semibold text-white outline-none"
                          href={`/Tiendas/Eliminar/${tienda.id}`}
                        >
                          Eliminar
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TiendasPage;
