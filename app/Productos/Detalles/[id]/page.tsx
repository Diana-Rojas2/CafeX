"use client";
import React, { useEffect, useState } from "react";
import "public/estilo.css";
import { useSession } from "next-auth/react";
import Cart from "@/app/components/car";
import axios from "axios";
import Swal from "sweetalert2";
import { ILike } from "@/app/models/ILike";
import { IEvaluacion } from "@/app/models/IEvaluacion";
import { IUsuario } from "@/app/models/IUsuario";

export interface Props {
  params: { id: number };
}

interface StarRatingProps {
  calificacion: number;
}

const ProductPage: React.FC<Props> = (props) => {
  const [product, setProduct] = useState<any>(null);
  const { data: session, status } = useSession();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  
  const obtenerComentarios = async () => {
    // Lógica para obtener los comentarios del API
    try {
      fetch("http://localhost:8080/Evaluacion", {
        cache: "no-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${session?.user.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setEvaluaciones(json);
        });
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
    }
  };

  useEffect(() => {
    obtenerComentarios();

    const interval = setInterval(obtenerComentarios, 30000);

    return () => clearInterval(interval);
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

  useEffect(() => {
    const config = {
      headers: { Authorization: `${session?.user.token}` },
    };
    fetch("http://localhost:8080/Evaluacion", config)
      .then((response) => response.json())
      .then((data) => {
        setEvaluaciones(data);
      })
      .catch((error) => {
        console.error("Error al obtener las evaluaciones:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idProducto = props.params.id;
        const idUsuario = session?.user.data.Id;

        const productResponse = await fetch(
          `http://localhost:8080/Producto/Id/${idProducto}`,
          {
            cache: "no-cache",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );

        if (productResponse.ok) {
          const productData = await productResponse.json();
          setProduct(productData);

          const visitResponse = await fetch("http://localhost:8080/Visita", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user.token}`,
            },
            body: JSON.stringify({
              idProducto,
              idUsuario,
            }),
          });

          if (visitResponse.ok) {
            console.log("Visita registrada correctamente");
          }
        } else {
          console.error("Error al obtener los detalles del producto");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [props.params.id]);

  useEffect(() => {
    // usuario ya dio like al cargar la página
    const checkUserLiked = async () => {
      try {
        const config = {
          headers: { Authorization: `${session?.user.token}` },
        };

        const idProducto = props.params.id;
        const idUsuario = session?.user.data.Id;

        const likesResponse = await fetch(
          `http://localhost:8080/Like/${idProducto}`,
          config
        );
        const likesData = await likesResponse.json();

        const userLiked = likesData.some(
          (like: ILike) => like.idUsuario === idUsuario
        );
        setLiked(userLiked);
      } catch (error) {
        console.error("Error al obtener información de likes:", error);
      }
    };

    checkUserLiked();
  }, [props.params.id]);

  const handleLikeClick = async () => {
    try {
      const idProducto = props.params.id;
      const idUsuario = session?.user.data.Id;

      const config = {
        headers: { Authorization: `${session?.user.token}` },
      };

      // likes del producto
      const likesResponse = await fetch(
        `http://localhost:8080/Like/${idProducto}`,
        config
      );
      const likesData = await likesResponse.json();

      const userLiked = likesData.find(
        (like: ILike) => like.idUsuario === idUsuario
      );

      if (userLiked) {
        const response = await fetch(
          `http://localhost:8080/Like/${userLiked.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );

        if (response.ok) {
          console.log("Like eliminado correctamente");
          setLiked(false);
        } else {
          const dataText = await response.text();
          throw new Error(dataText);
        }
      } else {
        const response = await fetch("http://localhost:8080/Like", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify({
            idProducto: idProducto,
            idUsuario: idUsuario,
          }),
        });

        if (response.ok) {
          console.log("Se dio like al producto correctamente");
          setLiked(true);
        } else {
          const dataText = await response.text();
          throw new Error(dataText);
        }
      }
    } catch (error) {
      console.error("Error al dar like al producto:", error);
      const errorMessage =
        (error as Error).message || "Error al dar like al producto.";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
  };

  // Función para manejar cambios en el comentario
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value); // Actualiza el estado del comentario al valor ingresado por el usuario
  };

  // Función para manejar cambios en la calificación
  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRating = parseInt(event.target.value); // Obtén el valor de la calificación seleccionada
    const newRating = 6 - selectedRating; // Calcula la nueva calificación basada en la cantidad de estrellas seleccionadas
    setRating(newRating); // Actualiza el estado de la calificación
  };  

  // enviar el comentario y la calificacion
  const submitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const idProducto = props.params.id;
      const idUsuario = session?.user.data.Id;

      // Realizar la solicitud POST al backend con los datos del comentario y la calificación
      const response = await fetch(`http://localhost:8080/Evaluacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
          idProducto,
          idUsuario,
          calificacion: rating, // Enviar la calificación
          comentario: comment, // Enviar el comentario
        }),
      });

      if (response.ok) {
        console.log("Comentario y calificación guardados correctamente");
        obtenerComentarios();
        setComment(""); 
        setRating(0); 
      } else {
        console.error("Error al guardar el comentario y la calificación");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const StarRating = ({ calificacion }: StarRatingProps) => {
    const maxStars = 5;
    const filledStars =
      calificacion > 0
        ? calificacion <= maxStars
          ? calificacion
          : maxStars
        : 0;

    return (
      <div className="flex items-center">
        {[...Array(maxStars)].map((_, index) => {
          return (
            <svg
              key={index}
              className={`h-5 w-5 fill-current ${
                index < filledStars ? "text-yellow-500" : "text-gray-300"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                pathLength="360"
                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
              />
            </svg>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-300 flex p-5 lg:p-10 overflow-hidden">
      <div
        className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto 
      text-gray-800  md:text-left"
      >
        {product && (
          <div key={product.id} className="md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div className="grid grid-cols-2 gap-4">
                {product.urlsImagenes.map((imageUrl: string, index: number) => (
                  <img
                    key={index}
                    src={imageUrl}
                    className="w-full h-40 object-cover rounded-md"
                    alt={`${product.nombre}-${index}`}
                  />
                ))}
              </div>
              <div className="border-4 border-gray-600 mt-4 rounded-md"></div>
            </div>
            {/*    card producto */}

            <div className="w-full md:w-1/2 px-10 relative rounded-xl shadow-lg mx-auto border border-white">
              <label className="cont mt-2">
                <input type="checkbox" checked={liked} readOnly />
                <svg
                  onClick={handleLikeClick}
                  id="Layer_1"
                  version="1.0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                </svg>
              </label>
              <div className="mb-5">
                <h1 className="font-bold text-2xl mb-2">{product.nombre}</h1>
                <span className="text-2xl leading-none align-baseline">
                  {product.precio}
                </span>{" "}
                <br />
                <p className="text-sm mb-5">{product.descripcion}</p>
              </div>
              <div className="mb-5 flex items-center justify-center h-full">
                <button className="bg-[#2F4858] opacity-75 hover:opacity-100 text-white hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                  <i className="mdi mdi-cart -ml-2 mr-2"></i> Agregar al carrito
                </button>
              </div>
              {/*   Comentarios  */}
              <div className="flex mx-auto items-center justify-center">
                <form
                  className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
                  onSubmit={submitReview}
                >
                  <div className="flex flex-wrap -mx-3 mb-6" />
                  <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg text-center">
                    ¿Qué te pareció tu producto?
                  </h2>
                  {/* Estrellas nuevas */}
                  <div className="rating flex items-center justify-center mb-2">
                    <input
                      type="radio"
                      id="star-1"
                      name="star-radio"
                      value="1"
                      onChange={handleRatingChange}
                    />
                    <label htmlFor="star-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          pathLength="360"
                          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                        ></path>
                      </svg>
                    </label>
                    <input
                      type="radio"
                      id="star-2"
                      name="star-radio"
                      value="2"
                      onChange={handleRatingChange}
                    />
                    <label htmlFor="star-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          pathLength="360"
                          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                        ></path>
                      </svg>
                    </label>
                    <input
                      type="radio"
                      id="star-3"
                      name="star-radio"
                      value="3"
                      onChange={handleRatingChange}
                    />
                    <label htmlFor="star-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          pathLength="360"
                          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                        ></path>
                      </svg>
                    </label>
                    <input
                      type="radio"
                      id="star-4"
                      name="star-radio"
                      value="4"
                      onChange={handleRatingChange}
                    />
                    <label htmlFor="star-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          pathLength="360"
                          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                        ></path>
                      </svg>
                    </label>
                    <input
                      type="radio"
                      id="star-5"
                      name="star-radio"
                      value="5"
                      onChange={handleRatingChange}
                    />
                    <label htmlFor="star-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          pathLength="360"
                          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                        ></path>
                      </svg>
                    </label>
                  </div>{" "}
                  {/* Terminan estrellas */}
                  <div className="w-full md:w-full px-3 mb-2 mt-2">
                    <textarea
                      className="rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-500 focus:outline-none focus:bg-white"
                      name="body"
                      placeholder="El producto me pareció..."
                      value={comment}
                      onChange={handleCommentChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-5 flex items-center justify-center h-full">
                    <button
                      className="bg-[#2F4858] opacity-75 hover:opacity-100 text-white hover:text-gray-900 rounded-full px-10 py-2 font-semibold"
                      type="submit"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>{" "}
              {/* termina comentarios */}
            </div>
          </div>
        )}
        {!product && <p>Cargando...</p>}
        {/*   Seccion comentarios */}
        
            <div className="relative py-2 md:px-4 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
              <div className="flex flex-col justify-start items-start w-full space-y-1">
                <div className="flex justify-start items-start">
                  <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-white ">
                    Reviews
                  </p>
                </div>
                {evaluaciones
          .filter(
            (evaluacion: IEvaluacion) =>
              String(evaluacion.idProducto) === String(props.params.id)
          )
          .map((evaluacion: IEvaluacion) => (
                <div className="relative w-full flex justify-start items-start flex-col bg-gray-50 dark:bg-gray-800 p-8">
                  <div id="menu" className="md:block">
                    <div className=" flex justify-start items-center flex-row ">
                      <div className="flex  justify-start items-start ">
                        <p className=" flex flex-col text-base font-medium leading-none text-gray-800 dark:text-white">
                        {usuarios.find((user) => user.id === evaluacion.idUsuario)?.nombre ||
                          'Usuario no encontrado'} {usuarios.find((user) => user.id === evaluacion.idUsuario)?.apellidoPaterno ||
                          'Usuario no encontrado'} {usuarios.find((user) => user.id === evaluacion.idUsuario)?.apellidoMaterno ||
                          'Usuario no encontrado'}
                          <br />

                          <p className="text-sm ">
                          {evaluacion.fecha instanceof Date
                            ? evaluacion.fecha.toLocaleDateString()
                            : evaluacion.fecha}</p>
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-base leading-normal text-justify text-gray-600 dark:text-white w-full ">
                      {evaluacion.comentario} <br />
                    </p>
                    

                    <div className="absolute top-0 right-0 mt-2 mr-2">
          <StarRating calificacion={evaluacion.calificacion} />
        </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          
      </div>
    </div>
  );
};

export default ProductPage;
