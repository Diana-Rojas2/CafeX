"use client";
import Nav from "./components/nav";
import FooterPage from "./components/footer";
import Correo from "./components/correo";
import { useSession } from "next-auth/react";
import NavB from "./components/navb";
import { useEffect, useState } from "react";
import { IProducto } from "./models/IProducto";
import Image from "next/image";
import Link from "next/link";

const InicioPage = () => {
  const { data: session } = useSession();
  if (session) {
    console.log(session.user.data.Id_Rol)
  }
  const [productos, setProductos] = useState<IProducto[]>([]);


  // ... tu código existente para obtener los productos ...

useEffect(() => {
  async function fetchData() {
    try {
      const datos = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}Producto`,
        {
          cache: "no-cache",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await datos.json();

      // Ordenar los productos por la cantidad de visitas de manera descendente
      const productosOrdenadosPorVisitas = json.sort(
        (a: { interacciones: { visitas: number; }; }, b: { interacciones: { visitas: number; }; }) => b.interacciones.visitas - a.interacciones.visitas
      );

      setProductos(productosOrdenadosPorVisitas);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  fetchData();
}, []);

const productosMasPopulares = productos.slice(0, 4); // Tomar los 4 productos más populares

  
  return (
    <>
      {/* {session ? session.user.data.Id_Rol === 2 ? <Nav /> : <NavB /> : <Nav />} */}
      {/* {session ? session.user.data.Id_Rol === 3 ? <Nav /> : <NavB /> : <Nav />} */}

      {session &&
      (session.user.data.Id_Rol === 1 ||
        session.user.data.Id_Rol === 3 ||
        session.user.data.Id_Rol === 4) ? (
        <NavB />
      ) : session && session.user.data.Id_Rol === 2 ? (
        <Nav />
      ) : (
        <Nav />
      )}

      <main className="my-8">
        <div className="container mx-auto px-6">
          {session ? <Correo></Correo> : <p className="dark:text-white">Sesion no iniciada</p>}

          <div className="h-64 rounded-md overflow-hidden bg-cover bg-center bg-[url('https://lacasadelcafe.es/wp-content/uploads/2021/02/curiosidades_cincoreglas.jpg')]">
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">
                  ¡Despierta con el mejor café!
                </h2>
                <p className="mt-2 text-gray-400 text-justify">
                DESCUBRE CAFEX, DONDE LA TRADICIÓN DEL CAFÉ SE ENCUENTRA CON LA INNOVACIÓN DIGITAL PARA BRINDARTE UNA EXPERIENCIA ÚNICA EN CADA TAZA
                </p>
                <Link href={"/Productos"}>
                <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  <span>Ver variedad</span>
                  <svg
                    className="h-5 w-5 mx-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:flex mt-8 md:-mx-4">
            <div className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2 bg-[url('https://www.cafeseros.com/wp-content/uploads/2020/10/Cafe_Capuchino.jpg')]">
              <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                <div className="px-10 max-w-xl">
                  <h2 className="text-2xl text-white font-semibold">
                  MISIÓN:
                  </h2>
                  <p className="mt-2 text-gray-400 text-justify">
                  En Cafex, creemos en la innovación con propósito. Nuestra aplicación no solo ofrece una experiencia excepcional a los consumidores, sino que también innova para el beneficio común, creando vínculos significativos entre comunidades. Creemos que cada taza de café cuenta una historia, y queremos ser el puente que une esas historias.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2 bg-[url('https://www.eluniversal.com.mx/resizer/BS-nM_2ZdzthceBawbBGFl2kL1U=/1100x666/cloudfront-us-east-1.images.arcpublishing.com/eluniversal/OBYJOCOJJFGNDJ2E3YU2LKIGNQ.jpg')]">
              <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                <div className="px-10 max-w-xl">
                  <h2 className="text-2xl text-white font-semibold">
                  Nuestra Visión
                  </h2>
                  <h2 className="text-base text-white font-mono ml-80">CONECTANDO PASIONES</h2>
                  <p className="mt-2 text-gray-400 text-justify">
                  Queremos construir un puente entre los caficultores y los consumidores, eliminando intermediarios innecesarios y empoderando a los productores para que obtengan el reconocimiento y el valor que merecen por sus productos excepcionales. Buscamos crear una comunidad global que celebre la diversidad de los granos de café y apoye las prácticas agrícolas sostenibles.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-64 mt-6 rounded-md overflow-hidden bg-cover bg-center bg-[url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBgXFBUZGRgaHCQbGxsbGx8dHx0iIxsiISEdIR0fIi0kHx0qHxsdJjclKi4xNDQ0ISM6PzozPi0zNDEBCwsLEA8QHxISHzMqJCo1MzM8NTMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//AABEIAIwBaAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAQIEBQYAB//EADsQAAECBAQEBAUDBAIBBQEAAAECEQADITEEEkFRBSJhcROBkaEGMrHR8ELB4RRScvEjYjM0gqKy0hX/xAAXAQADAQAAAAAAAAAAAAAAAAAAAQID/8QAIhEAAgMAAwADAAMBAAAAAAAAAAECESESMUEDUWEicYEy/9oADAMBAAIRAxEAPwDAcbXzK0Yt+CLzhGLM3DZSainW30vGOxK1qJHrE/hk2ZKQTXKoe0ZcaRspXIbj5d+8CwqxlBNWBoTtf6wfDyVYmaEILPc6ARcTeAjClKlOtOoID9WgbwaVuytQpCUqKXHcgFtImJw6USws5jm+VLUYlQDuC5NSDpTeJvEPDmIC0JApRm96XgOLxSVypRFClIlq7pJb1oPOMmzZJEGbLUpOVKgzspwxrWqtWApAkGmX0YgktQkirdKWMPYnVZURmqTVtTd7CLabh/ClhSUgLmB1KIqlJqEp2e5PYQxd6U4miWkAsybuzg6Brtb1h2ALoUaPckA08yd2FKwFEvMpaaGjuas1Df8AyHpCSZwUQmmVKbUBdy4cVYEv5xVEp6SM4ytULW4VbcWswtRrwKakNL8gUnqH00AZ66neC4SWSorLEhwl7XJdmZmf1hmLDJLqcINO9L7beY2helPqwCcTUgAF/wAZrbxLM3atg9CXFS22o8/Sumq+WoFmALUf2b94sJODmLSVpol6afy0NpExbGeEf1EFTj5SC1zcUKg4HrCrWUqNVU5b1q1AO1fKBif4b50PsXsTr1PpBUB1FSATyjKdHHMe7NCGcFHMAH5Q9bs1n0H3MBElT8x5SfRi9Werlhu0SUys0xJKmCnJUbM9qXL6Nr1aExaiXBorMSQzfMRoLHoWIAMKxtFfLG7avTctv9oOhJYLIBLEqFu9B9IGAlJe5Javm9h006RJwyLEnmAHLStSdqsmKbIiiRLltLD3QoApq2720N+76QxCwzkEmtCHLM1dAHZtNI5IBLljXqkBiQT6ip2bzRdKkHIGSWodTXq7U0YxBoNQlNVKBK8ztYVLFuxDvAUcxqSoJFGf+3UasYeqaC/KHSkaAA8urVJLGBlN2HLqE0ow02Ln0MUQzlzM/wCnLlcOXLip1q+jbNSGs7MTaopWuv8AMKoukm9rl7u7dQx9IVagCCWqXDFiHJ+kMQ+Why6ioOSSRZ6lu1PrCiUhgEi9STc6+X+7w8S6JUXayQS73BOra1gipYK+WlgSCKACiL0cg+20KyqEmS0sWALoAqLOCdWINfraGIQ4JUU8pALqsDRwnVqvdqO144FOckmg2JGjP+bQCayaiyWCq1P2F7GAGJOZSnDMNA4fX6ECJUpTlJYAB7MwqKndQcNAzdmACmAG2hp1cVpHECqVMGSAwS1U0JNq/YQCGglKXOpfKBar0N2sG6+RetSiVkgBwzuatR9d/YQMqSQkgM79dbUsS14JMTlJJflZq0qGatqk0+0ADCGQ+bsHrZmO128zCrWHL1UzABy1WJv79IPicUDlGUJZO7uXudXZx5QFLkB6VJDXq7DvAMYpSk8qialwNmr6dYVQL32cgmgJ+WtzpCS2KmUQ6UvS5Nq+hgrDqQ25Y120GnrvAIahLLckimXUa3fen0hktAIUXZyWBoTXe+jxyJlSl91V617w4g5sxGjXL0Z72rrDASWfkSm6akM4WQqzf27/ALQRKAVZibVI2rma9oCoqDENmU7a+Tm8PQSGNqMdGqzk7V66wAhs+p5gz2H50gpmui/OGSzUYA1f0HnAJ6hnodXJ8vp9usKp2d3rW+7HzgFZ08ZEECmYimuj+lI6FUgKNgwDV0pU11cj8EdAAmByqmlKwCHcta++0W3EVpAygMNYreAc6koQl5item5O0bdPDZEpLzAlZZypdjuBVh2ipZhEPsyPw1OQmeo00/eNT8QTAqUG0/LxneJ4ZE0rmSJeVAfnAZJbRu+vTS8D4dxMzEFKiXHXy1hdldYV6MWUHJoaj7QwYkoW4BUDdIevprFgOFJUgTJhLZiEJBYqa5J0HaFXJSmiUgHVnf1d4VopJgJCwuYhBaqgFPcAqr9frFxxniKVpezP7WAhvBOBImAzCKIVRj+q7+VIr/iTCy5YUWIJNKnp7ViLTdFU1FsrkLyy0l6qdSvMlh6N6mE4BgDNWVOwDxCXNdOVN2A7NFr8M4wy1pQA6ioU3q8ayxMxjrSL2R8NKVMCFzSknmDgEtasQ+M8C8MlJmKUb/p9bdYtZnE0S8QpcxbE1ALksQRcd7RBxPEVTZhUJa2AYDKa08z1tGW9m7roocTw+ZLWEs71dIv37Rt/hvw1ysmXnAYg6dIzfFJy1rKihSAhPIHrV+Z/IhuhiLwjiZQoLBqTzDfr9YpptExai6Lfi3DsnzCr+0UMl5czLcE06HTyjR8Q4umZzPcMYzeJnArF2vTdi3u0JOxyVBkLYpqA1QX1e596/wDURyyxBuSTmJLgu7GurEB6Xh2HTmUASKMWtUDU7hx6wmHKRlUTR6kjXc66g9mhiA4hOZkuKc1BSoJ0tYCCYdfiEJcUs1ySGI603jlliGKlOauOa9ulC9tTA5EpSDVIexGtXZnLBqV6weC6ZPZCQEXBclqOGNK6sfZ4ZPSqVnSslnGYBiRlIUEuzVcO3TaBpqoZbF6Hmy1oOrtDMSFTALgAsHqS9Xa4fm/1Eop9HSGKiAgpcXSGrcVIsAfeI6kuakc9tAa39REj+pyk5Xr8xI2GhI6flICmWKLpsXLVOr3Jv5iLIYVCLhwC7DYvqCWp+VgSA6gGBOopUDroG0rDpZKmDFrbPUa6+2sDlqOZwwd0mjkByAwHSAZLlLDEl3NA16UP/wBobNRlLs7/AKblmLqNad++xhqWSGsel7ihqQzke0SAAA5NW1NWD0qKJYadO0T0V2AmoSAXAcCta/SrJah6R3hAM5qSGADF6gAudWemj94ehTCiQVLIAo/Noeuh7PDpTBSnIUlic2zB67VNuhgCkBQrn5AyQaFy9C+t9n+0KUKKucglQLDYg7kX5nhZaqrVcZqHL6toGJga1gOpTly1at1pStfvDEPUoFyG6UY3v12MOQwClqLn9NLvcsdKmkARNplFW3HWrDpWCSV1ol3PK7lqkWvWnvAARYS4fKos9L9jsb+0DmKYkpoAwIdidW7Bt4chwf8AkZVeYC4IoxFxb1gSxzBRS2erF2/Gr6wIGcQAyk3eodm1I/NoRSmY/KW2L3oBYvBVyQxCqVc08tWLNausDIUpnPyppo3Xv+4hiFUk3FSaEn9KbN5nWDLXyqUrKwIGWmgIs1SOm4eBjImpIe4F02ux6iBLQ5CQ5L8zGj1HmR+PCDoJKSAC5YsWD1J6Dfvo8KpJUMqWLVDj2hJk9NMulR6tUekPkzHL/pJd2LuG9qHXSAM6ASZgqaAMKGpoe+5ghLJIzkEgmoAdnoCNWLQKeRlLkVBAcV+YO2oL/tEjD5XT4hIDednAA6sBtV4bEvoHh1MHFDqetx5mOhk8Vu37vbvCwBbRaY7CnBLUuUHQr1FbdO0Ol4leJbx1FMoVKUkZldKOw6xfYof1EkJTQEOXFiGp609Il4DgkuXIKDUs5V13/ZtInln6Xx38KHifF0iWUIZEsJypGrbRiJc1QWWeu0X2Lw8rxShamNw5IFe1IZieG+Fzoq4u706GLjSWmU028JqyqYiSZa8oSgJUlVGWPmNnqTFcoLYqKq01NKa0huPxQPPK5Q3MnqL+USMDhJ8xAVkDGoobbwqpFXbo2vwvy4IKuSpVdyVN6RmOPqExc5RsAEJ7s5P09ItOFYhUrDmUuigSRUgMS79YzvFJgBLGhd2vTbv+0Qu8NH1pE4Xw2YtGYME7mCy0rw0wKdC6FJCg4qNn3YitwIX+pmTAAkskBglIoBpaIs1BzpQrMMxZyGEaW2zJxVdGolf05w+ZMtOfORzcygP0h1aAMB2iVL4qnwxnWlISTSx1sIiYrCSjKSDSlCDXt2jLTcOjOkfpKgCdWKmPtC4fY+ZfcRVMn1lJdJAdZoml2OtSYjy+DEIIJTnFyD0NLMdYteKccRWXLQcqORKUhmalu7xTKxyszmWoD8+8Sm6LfG9IeOQpI1oL6U33idwTgviDxJiimW1Kcyzq2yesJMlrWiqQlCnFTW1KaCLPD8RfDoSHzWCRvsOjCKvCKXIr5uH5/wDjQyWoVE1ajudAdemrQOShgpeU5UqLtvT0ckU6RpJeH8KQtUwcxGRD3NySAdC/uYyk+eAoJFXNAK1pprtEJ8sLarQxSEgqA1vYsWFT/dags8AWgeJfMwHM1CMunSjRZr4NOWARLIAcklnO96CnSImJUk3DOpyp7NQJAfmck+kNCYqFApSlRZ6F3cg1oB/jQwWRMSUgFJZCXVW5zOwFvl+sRUKDhwRtVgKMQCRob9xBEDMkFI+ckOzMWNd9h1gaKTI2LWTlZKkh6at+P7CkIv5WcUIJNfT86QTEoGVgfms2pYa7OYYAxQCObUNZwXvelYpdGb7OnKSWACswqGLMLftCBR1DBhmD1u5I2/3HA5nJBTqBuSLN6CGqLkAGhDl9SdCb/wC4BkxAYCpIfMUitbML6AekLNLrKvlBTydzUnpoPKBKQwAencvqTejwRSlB15mDAAM/6qaUuIko5Es5k8x5We7kBqCtLfWGz5bOUsOUUYF7jyq9Oph04LScpBWUkdB81XsaE2tCT0KzM7k1JAs5JNGsl29YAEUohxLdzckihKRWmlRA0EgVJBAArptcVoResEmEkE5W0Ae9qUvar9Y4kjNlCnPzVo9stbswEMQ5UpI0ckgsa1KXAv8A5O0Rlr8NQyqsRbcEHegprBlmytXCWpu5LC1t7PEYqchiVUsRrR63fSBAyTiJniTFKUSFKPKmmW/MTplbzt1hEjKCaKWAzGrHqCRWh9YYg2o5SdAXP7tZ/wCIdMU6+YpF3J/TQM3lRoPwX6OQkKTWqjUDSlXa14ag5rO7EKNiwNmNKA6dY6XLADJYEgM4oT/D6dN4UhkqUnlHVVSXrQ1094AOWgAJymrsSlugKau9TDFTGDJLKBo/76awktGYMS7m5NBU0ba3tCS5YLuNa9aiH/YX9CJQ6VKJL1JDin7VMPCmSFEuSNfy1ISdLZ7gVCmoKGne5Dw2bLTygHMCHGl2pXW4ptALocugAcKBHrZ7ga/SCkqVkdVqAEGl6nQCulaQzElL2BAoWGzG4+scAACSo1Nd7W9fpAMYpJKiSU9Wt0+8dHK5bhlE2ry++1YSARo08YRLmqRYGYSm9HZwQ1OZzfeNFjMcDL/yDU6CPOcSfElp0mSwytCU6Hq0WuE4wFoAVRSRUHXqITjQ4zvGUfHCROJ6CJGExC8hdQazH8pC4/nmEgUtFeuTlU1axotRk8k2HlIClqQU/MKEEHKd6aRrfh3jQMvIaEU9D0jOYCX4ZzKDPQOPMnsADEDDLWFKWkUJNPOE1ZUXRruJzxNKvY7Oa/eK/B8GMwKXMVllgs+7X+1LxXS8WVCgPn+5i1wmLnKkolpQVBCySkUIJUWKibhi4sKVMZVJGylFkxBlocS5dBQE6ga7CujGKzGnOpISCQDzlIokPUuYtMcrIhKVAKmXb9MtO3VT7uPrFLicecpQjmUqlP2hRW4EpZpGTxFayULUGTygsxbe7RDxyAzhTxpMBwIJkKXMFb1YE73v/MZ/GYYGZlSb7a9o3T2jBxyy5x+IypQQVZVoSp/IX3q/pEOXOLmpJbM3TfrDpCwhAlzQciapVcpe4bVJOkFQlsq0nMB8rXHTqKWMZ0jS2RV4wlQCnSk0KjpFrwJaPEXVgkFCKAjTMroWJrETGKRMTkQkhS6BPX7CJH/8edKSOYGjBxVqUfZwIUmqocYtysPxniRmG/KkAB9hqesWHAeFJQBPmJOY0GuRJ1bfc6RlsLLWrEITM+XM/QtvGv4hxAoUiVKTmWRW7NoOt3bYQuuiu9D8a4mUSwlIClrZKE/3F6nogOK6vFDjOGpky2Kgo5wVKTq6g6QD+kaHpEmQrLOdZ8WbqomgarJbQGKjiuOM2alKTRJrs+ge0NJktoHNAK0AFgDYbvob6mCJnOKsopIrpUGvVhTyhJjlBGUgLAy0Z0g/MDtS40gUlATUAEBVz2d7jR+8AXTwJPQEoBJzEUoOapNA9APtAFqL5mYmmUXALEeUSX8QAK00s/N9erwCYlRCkkWIch6nv+WhoH+AwGBclWUkjqTXfp7Q1SMyDVtXq96CHJWTkc0A5hqa0r1hCvnbRioP3fy0EMklJQWAYFtGuwcBvx6+RpVWVysEl9qD5srBzUnuX0gSlZUkIKVApDlqpq7F6BWl61EPUrJk5iwLinR/Wg9Yk0QKUu5DMNqMBodSX/NIahQKQflOYFzqW9WhfD5hXckaqBFMxoP9mHyV5lKSDUKAdn/TUhg4H3gEClKCcofnoAeajsC21A/mWhigokpSSoEOXJAO3lS9IkTMpKQkqBapoAX6aNbyhCpKFkS6igcNYuCCTUCt4dioHMWsgpAAoHLAAgJYkXNbv0gRADmoYgB62D26sIkJSp6PsdGr0sCSB1gWGWkuHNLdf5FYaExiFqHOaEpJFCO9dNbeUKDmIJ5hQdj+U8ofLnAIUblm1NwQrV44pzGxvmcVejkt6+kADjmZIUHUHoS7n6trSOngZQxIs42Ydba+0GUFKBdiQLdAxc9reZiPKfUPmq27MaepPnSFY2vBqF1ASwo4bTKbq8h7Q+gJIdrncAih2a3Z4dJUCMqqk1OzGw8n94HiFgqBAe5tcafvSD0PBJalFQcvRy7akv0vCIYkpdwGNer+9b6QiVO72B6PV9bQqKrNK07MPeGSGlKKk5iQxu1G0p0rYHUQ2WTWoIBB6E2p0c+0NUWBSzOPIPTKKNQCHTieV2DaWvXaAYJQ5i5cmoHYW7XhIciWXc1FGbQXD9I6CxUM4gnKslJ5h+eYiAZhKgQGMa/iHAPEQlaFsCwL6RWDh/8ATTFCYQtDA5hsz+7xakq0hwd4BwXDpswOxA6wSbgZaCFGYMya0qzb6RPxPEJuJTkw8vJKFCbZm3OvYRFmcAnJDqKS1hEN7rNElWKyDMnzJqlIQzkX1IGg2ifjZKZeHQUsygTaoIpWIfCuHTVTMwWlCknU/tHcfwk6W2dspcgpLipJPapis6RG02xfhlKSV+InMgsFdA/3iwxOBKSVSlECwY1bYj2gPw7hVolKWvKlCxQKNVVuAK3F4h41U1Fbp0O20KWvBxyNsi4wzWOYnrSH8EnplrCljzP3hvDyqfMShRIBNa1942fGeDyxLBlpZIQB1d9e4gk6VBFW7spuNcb8QgJoBQAWL/vFThpWVWaYSV6DqesW3wlw5U2cpwMsu1KuaCJHxDh0BZSjzMTyp0iuNq2OXg5K3CpqFLF0JVYuzdWiErhSAcoKk3qlRow2MQ8BwnOJq2cIDjubnyhJ2CWUBYUbMWP1EFr7Da6FOCVJWlTkqFXOo6dov5vHkzJaRrGeQkzMiFqJUTVRJORINfLr9o0c+XIkgIQxVZk1V3JvrClpUHRQrnLM1BQKhQqxa7VPYxeS58uXMWuYpIWUs4FBzEkAs1QUVF20tEc44BJOTVqsHewHptCplzZrunIMtHDvpXo3aEPsgqmTJ5UmQlkksV19oNK+HzLBzEjrWJnBeKJw6ly1JNACOjio7Up3h2P4oJhSH0r/ADFN0QlbKXGqWMoKnFQD0OjWDmvpCTUBNGckk+Xrrv2h3EFFaWloJ7An3gCUKoCklrKNx1Z6ekJdDfYeWcpH/YsqouHYdqtXrWHT5mlkggUqq32Iidw+ShctbDMut70DDsaxD/oZmQKfMlRJUGYhj+rV+nbaFdsrpEWegknQs4qBqAGHYBoHmuySGPoXGvl7QeYoOWBccrAM4e5BD1u0MnI/tACjTKTVzqR5k7UikQ0Pw6SAHDa3cEvQkalx5RJxa0qKfDBGVHOSR82rbh99zEBaAlw7CrFxvSvc3iWJvJy2TVyQHD6b0ekJr0qL8OylhmepJNdB07flYQZcqspYku5oDUtbuPwR2TmD8qQGBp2pXfXYwiSErBBZWYLepqC7jt7wADClJBIAY0FyQTSpuRQmm0JORzOxoAxIuxepNzUQUoBIKlEhTjvWv/tBAbU+8CSDUAlSUOxPSvdr1eGI7FYglOZL8+xYUY13Nj5R2HkBk5khhdi1XqQ3nbrCyUAioGl6fmvWsdNWHqCctQDpTW2gqK3g/A/WMUATqkv8xJZmNSBqwBt/CoKyv/Ea0f8AK06wVNczM1q6FTB21YC+kDmpDKKlCgdIBoQFMQKdh6wCoQJJLvRRt3eja2NXhEryZS9zV7gNalAKQ7DTsrAgWYA7NUjrDJaCVlqAXJ628/5hgctQ5kjleg1YajtQekKuaMxYOkfavlD5mEDEgW9T0DvSBqmgpCQBW7uA/wC7GANQ4oOYih1AFqsLwqmBBZ3BSRsxoRXeEnTEgEsTUEB37d7wNKWAJoog636DyhBYVSiQHuCQXch33DbN5wviOS46kkCrWvoKwwLITYMSLkUDX184KdQRyge2u0MBilsKXKsp2br6X+8dDELdiWyi1KuwDne5joBWW/DMWsTRLmLJTo+hFRfzgvxBM/4UAgOSVE9CA30MCwvB5k+YJlUpBcMKq7bDrC/EOHWUlAX/AONIVlLWU4ApV+W0TjkVqTB8C4rNRLShBQlO5Z6aObdusSOI4uaokKW7tXKoDsHSIpeEYhaJZ8NZSp+le2o8oj4nEzHdbncvWKcHyIU6iHVMmeKMhBWakCw6FrmLPjEpSZClTJhUolm/SaO4GjRW4PGoT8iXU1SYDiZ8ycpIVV/lSPr0GrxVE2W2PLBBQHKEJASNUgVH1gE1ZU9XTsG9/WEw04EZCoFaKP8A3ACjPtDpUlec5EuVhmtUa/n7xBp2U+HeVOzJLZQVjyDt7NG8TxlMyU5Ic3FIwmMSc6szBkkd3LfvF5I4aUJ8WbKWUqFEg/Kltt23h/JVJi+O7aSCcD4qlE6Yl2CwCDo4J+oPtCcVmBzV3rDV8Mw8xBXKJQpNShfKquo/uEUhxK0rCSM1WBapq0Skm8Lk2lpovhTHJlzVoXULFt9/aD8QkDDzWTWXMFez3PUV94Dhfhla2WtWQpqw0894FxXEqSMqilTWU9vKJtN4FNLSomyBLnMo8quUkbOCD5tGuRwyStKFmqRcaAaBhQjRusYHG4rMwa0WODxEzKEoWsgX+wjRp0ZxkraNShKJa0rZIFQQAzCz9NIDi/iSVKScnOpmDWD7nWM4ouT4hUf8iY5cyQE5UO5cEBIYkhgyiXvv0a0JRKbHYLBTJ8zOVBALkqIcAAPbW0aKb8OShKKkeKtYGZ1FKU7upNwlt6xL4XhQiWDMLhAYnRhf1sBFMeOTP6YoLnMsnMb5HcAn09IV30Pjx7H4Xi82UsIJzJsMtO1BGhRipM1JzZTSuaih0dnBpGIw+HmTQVSy60EctOYas+op7xJw3E0qKUzEEqFLkFybN6QNYCe6GxU4SlqVLslRSRqQkt63aJCOMIWHlkpUzH/ts9dIpOM41JUUpl5FVB0fqRYnrE/CcDeUlYNSD6tQekPgmrFzadB55WrIlaUkOecFlh9waNEDFS1IURRSUsykORQMPYxGnYiZL1ITD5sxSkgKW4dyhmajuf2gphaCpJmAkFILkg2FdOzxyxlYE5qUAsHHdhd9WMDRNBTWxDBt3Zy9X01vEpaCHUFWLBQLXdiNf0v2I3gY1p00BQSBUAhalh3A1BcVr5a60RAqQNL9vlCg9y9WG5hiCwLaEs9QyTQbeZ3gmcjnWSVKDAgWLtr/ANRCGDxUwFDO9SCBcVe4OoA9oSiKgDKwdrg2pufvCzSShSruXs+le4f6QRKQpIJXVqJB30tv5+sAegpBAqaJAep6szG4bTpAxNKgSAzaEMXd3c6uQOtIOg5iagaUow1J1BqfysRyXUVF1FnuXoWpsHhoT6HFTlSQbDNsAfS5eDTCMyRQCpu76F9gHbuTDSwSogF1EgA1UNQ+56tRoFIBKgHAyjVOvfXygAYac4awAB6n9hB8MtKSoqJbWhcntdmpA8WaHR6AbncN0Lw7DzsgzBibMWLmz7MxMPwlYxcTigU8pbpV+3SgFYBKQ4dxUuBRzX1h805klWUBzvyi2scpBUQEgIZN9yHrU1JgWIHrB4iaGFP3HaCS0ro4AIYvt/JrHKkAEPVhQNr131h6s2VQq5PZqVOxgD+x+Ilhhmu/zas400hgYj5rFyH1ar9PW0LiUOCxLCpJFiNCT5GBya1BYkP0Y9IPBvsPIWGJFgTTsOrUavlHQGWczbMbauWH1EdBQWzeSMbiVAIkyMgBYqmUpYnfr5Wir+I5suTKUgKzzZh51m9Omg6bDpC/Ds+bPltMnLOgYs+zkB4qfjDh6JKAAedRepJJGpJOloUYq6CU3Vmcws8JJgqyZiwliR0gOCQl3UbaRrOCcPSylqDUcDYaRpJ1plFcsKadySygIQlJYlTOt/8AI6VsBEbCqXlITc0KjtoA1W6CLrEYJc9REpLtc2HaA8LkJlqCZgD5iHFr7xHK0Xwp/hEwGEQFEzFlPVj+1vOLuTKQmWVpmKUoLYEEUGUU9TFyjh0tnZ0kUPmIoeKgS+VKjkVWzVs/YjWJ5O6ZpxSWGd4hN58x3f3ja4bj+aXlDFwBU2+9IwmMS5ISCT0gmEMxNCGpr9O8XKKaM4S4tk/jEwGu21HrUdtIdh8ZK8aWpI5AK6mgcA9XEQ5cqZOmBAFT5sIsMPhEKmpkPyJdSyLnLoPOjxOdF69JOO4tMmPcJI5aFgPLXrEH+nC2MxRAP6iDlboLk+0XKuIKlzSklKZZSSEBIowZn1JH5eLnjUlC5KFISOZOYMOmkTq6HSfZlE4fCBTZFLaxUph6ARYKmIlJC5YcfKZaiD5pUO2sZzGysqwVOBq20SJSUrA5gUip5i7aAOOsU1a0lOnhd4DE4eeSKJV/ar76xE4hwxEuYFpSGCgSOj3aKcyCoLmoDZS7C0KOJkoIUD5uffaFwd3Flc1VMuuKYvxlolILS0jMTpW5O94quIzg+VApYb+Z1MP4FhgtJzzMiR5+QrF+nhslAdLKcO5h1RFuX+mb4XOXJVWjxNxqkzFBagygxBb0J3gXFGYj0hqMEVoSpCSwHMrQ1p2DesHej6wSbkmA5zzC1XPcecSuF8RMtJlqJYFx/EA4TwdcydkCgzOojQfgi44nLlyiES0gqVStSepe0F1iBRvWVePKVOxeG4Xh65ktASCoqz5ugDZfqYh8Rlrlm6SbHK7e4jT/AAdxKXKklUypC2UGqQQWA8yDCk2o2ioJOVMqRwfw2Vc3rX1FoTD42YZgSFuwJ3FstjahMd8R8e8RZCRlS9ALtELhK0eI7ixvrBFSauQpSinUSXjkZSpku4zFrD+411Yj0jhoSXBGhB1F/T3ECxU8LmFSQQEpZJDeZ72gmHQp2Y0vqwbp0p5wNYCeiLWcpASKKCWNxWgvZr+UOluLjMbkPo5o40DHWkcnmUCaCw6Gl6OzmOWHSSzO7kkB2elagMW8uwgGRlF7uAaOTcu2amou3aFXLY0FU07sbnpX2O0OWbEJoeYa10D7094SSghiSOr3vQN1GY+sUSIuWQoMDRxUs2qtai43hUjluHUXNK6U/NzDwoOot8tK9SaU0cXNSXhTzKcg1ZgC9gQ9A0IKGYtFR0LuGG7skUA7QyQzkA6P9SQNYdmP/VhatWBN/T3EIiVRRfmFKVFWZnEPwXoXE4XwyEODYukgjdi2oYeo2gS1EzKjR3Fy38COQrMvcCoALAjV6+UPxGVLtRiLauR/P0hDHJlhyS+Uksl6g6d2p7xwJcqFquNAbNU70hpJKuU3A70P3eBpVZLOe19WJ7OXgCxkxSiDcD5m3LwQL5OWnLe+kOWc5JAqpsodgmhq5sIVLmhp1egr0/KQxDCwRV7DKAIWOYk3bQ6/XTV46CwosfhviXhSlqyvldQ0f+KwHh+FmY6epcwuaPsNkgaJG0SpnBpsxeWWoBCXBJYJB2G56RK4aDgUkgomFR0oxI2IrQbwNraGk3SfhH4/wNEtLC8dhuKlchEtA5yW/OkA4lxjxXJoq35s32iL8JlInqzkBLFibO/XcUgp8XYNrkjapCJEgEXPKndSjrFJxvB+HhWV8xXmNnBbKw2DIH1i9U0+agZwUyySQn5U0o+mtO0ZL4x4v40zKgulPKG16xnBOy/kaqwnCuPqEnITWov0+4fzitx+IVM5UgksyWqzUHsIq14VaGrTWN78NYWXkcN13MaypOzKNtUUs+aPDQFoCFpDUDBX+niIvFAGinq/tGpx3CgvM9qM9zvGM4zg0y1OmJSV0ym3VouPheegTJi1UUByP2MN4PwfELX4yZashzAU+YHUekZsYhTgo+bRo9Hw+LICc03KoVyscoGjF9txEzTi89Kg1Jb4UeP4TPKgoy2IOosGYj0i34BM/wCNUpRBUh2Jf5Ta/V4ZxLFTFn/ypZqVH3eM9igtJC/ED2y1ch6+T9NIItscopAOLpBUW3iDwrCpWohRJFrsIOXmBSkOwv0ipnpKFOCY1SyjBvbL/ESVIKpMlRWFD5QBfqpqgdxErDfD07w2KEvZsweJHw+tCJGejqNagE1tWLk48zEqyp8JKQSVEKf1Ayi9z7xEpV2aKN6jCTJEyWVA0ylil6j+IuvEKJKFLUStVQDUBNra6+kV3HUu6+ZsyWzUKqEkttUX6w3H4oKZrBKR/wDEO3m8PuhL+NhJmEVOUhKfnUASQKB/9xo8dw6ZhZKU5jzMALAl7fzEj4Qw6Ey1TligArswiBxLiasTNzmkqU5HUglh3zfTpEa2aYlf2Vs7GqwylpCqqufqB0cwGTjkoSVkkzDqTYbNDMHLOIxHNVIqrz0iLxvBplTihJ5aU7xaS6M2334T+F8MVOCpi6IS5HU/aH4Dh2fOsWBCW7ua+Qi0wmLIwwlyxmUp2AqWbYQH4cm1nIU4UGWxDHYhulYJ4sD41ctKdWAGZYKRRv8AXerwmH4eknKzkVqQHHT0MWGJH/IR/cmjbj+PpFVjxmVLAJBqKUOkCbYSSR07D5PlDPobGNJ8MmX4YLjM1XvaA4b4dKpb8xAHXbrpECbgVyfkURr09Im7KUaJfEkJCgQKaj7ecQJkxS0sWF2pXr7W2iEriCirKr5nic1i36s3N1SSKF6MQXbaCmg5J9AM4BZ6JoG9661LQaan5bMp2sS4u+xtB8Lw2bMOdTjMXtWpc13iTMwQSHL0NNB1DDz9YASK5qm+W+j2Le9h3hmYuACXy1qWBe1YMuWHOQZXFQKDpEUnOpicoBrSw3u1YaE2HTLNEipcIS+pOjf+78aHLkhBUDUhQznSzsHq5iOlSiWK2Yu4NT2I++0cpZFbF3c7igv5wUFnS0JBZrPo/l+bw7O4TokMXN6/WGlOxJ0bQvr6t6w5SCWGUaP0q9Dud4YhkpZSSUh07sd6t6QqJZDuRu222t6Q/MXKRQAkjRx/qFJ1Y8wq/wBB5H2gAY1HKi1jswJ1bc6aRyQHdvmr2Y06aQ5DODQBzQ6CwPrCooDqE1FQ6iejwANIqobK302p0joIsM4AbMav0FK+Z7sI6ADTcT4qmUyQK6JFd699z3iuXLJdcwDMr5U/2j+6tiaeXuHhssHxZqhmWGYqr+l7WvAcdjVnMSawqod3pTcRJEwgVOrRZ/Dk1CQrOx3BG93EMw+HSEZ6lRuTFLPWQukaJeGTdaaTinGJnhlCJhCbMAPR7kRI+G+DpVKM2ZdL5gem4Otmim4IvMSogFQIAJDt1ALh/KNFwvFLKlhSs1rgaWsBEvMLj/J6VmOlk03/AD7RV4XiEyUvKkq6NF9ia5ib/wARQH/zjvAkngpNrS4RxxRotRJvUCn4IrZqvGmBADOb9HiXgf8A1Mz/ABP1R9zEsIAxKGA1+ohNJaUm5YzsR8KzJcpUxKpaglBLBJCmykHuWL+UTMNiFCSiYZSVkCpuAS9QNCa/xaNliEAy66hj2aMnwlbJnIHypKso2on/APavWI/67La49FYni0og5koCjd1KHt9or+JYvKkshKVKqCA1O92pZ4jcZHNE6YPExGGSuoOUEdHilFJkuTeAOGSVeGMoIzamg9TAsTwpZfmS+1Y0XEzfToLRULnHpFX6KsohYFYksVl3JGQEuOtLV9Wiyn4slGUJVzNUgqLixBUKGIeCSFz0ZgDX9o2nEEAFDAb+hpETfpXxrwzGKwIGXxnUu+R6Dud+kRsZKSBVKQ+g0846di1qUVqLqJJJO7w/DSgsZlOTtpY6QRHJhsJxQqlJw4XlTmZZeuW7jy1gfE8ZnyypKeUFkgC5s5+0VCkDxFfmgjX8FwiB4c0AZszMwaw6PqdYpqjNSbwk8J4OnDSzMmXAzKfdrd3+sZrD8NXjJi5hcJJuAT94tPi7HzFeHLJZBNQKRpuCSkolIygC8JfZbXhlJs6Zh5icyflTyAEUS3MzWJSXcxJ4jNAWichmyuSdUm+bo2neI/xYr/mfWn0h0qshD7KppAtWi6ZWYviEsqSUKIY920PeIeIxQMwLAoDQdIl8NwyJsolaQSNdfPeIWEwiSpQLsLV6GLUV0RKT7PROH/EMrwXSRmCbblrdXaMzi8UDc2Ye0Rk4dPhim30ioxjg0JvvGcVZq3QqhmnMgOdO/XpFgMEoBlKSGegBuGgHCcKls1XbfpE/FYdIS4Ff5ipPaJgssvsJxFHggABw1SSK79oqMdjM1VHtRgA9D1Jv6RnRiFJWwNNtIslYUKqSp+8DVA2NmYlL3gMlRVnWA50tYa10vFfLqaxbyksggWv5w2qITsWQSC9M2u+rjba0HUQRdJUwzAdnJH7xXLWQotsPKukGkXSereUFDsSYnIQRbrp1/N45K2+WhLVYtodfqYLxeWAmmw+sAll0B+n1goSehDLKibsxuWB1Pk3aOTmyirg3NHFWrDDVVfyoH0hyVlRrqAaUY9GtCKOXZkkcxuDp9v3hV7gVar9C7wi/mHb9xHTdPP8AaAQWbOdJGubMEZWcZWcKvcCnUwkNmrLD8/LCOh0DZ//Z')]">
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
            <div className="px-10 max-w-xl ml-40">
              <Image
                src={"/LogoCafeXB.png"}
                alt="logotipo"
                priority={true}
                width={200}
                height={200}
              />
              </div>
              <div className="px-10 max-w-xl ml-40">
                <h2 className="text-2xl text-white font-semibold">
                  ¿Quienes somos?
                </h2>
                <p className="mt-2 text-gray-400 text-justify">
                "Cafex" es una plataforma única y revolucionaria que redefine la experiencia de la industria cafetalera al conectar directamente a los caficultores con los amantes del café de todo el mundo. Somos un equipo apasionado de desarrolladores, diseñadores y entusiastas del café comprometidos con fomentar la transparencia, la sostenibilidad y la equidad en la cadena de suministro del café.
                </p>

              </div>
              
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-gray-600 text-2xl font-medium dark:text-white">
              Productos mas populares
            </h3>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 ">
            {productosMasPopulares.map((producto) => (
              <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden" key={producto.id}>
                <div className="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: `url(${producto.urlsImagenes[0]})`, backgroundSize: 'cover' }}>
                  <button className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </button>
                </div>
                <div className="px-5 py-3">
                  <h3 className="text-gray-700 uppercase dark:text-white">{producto.nombre}</h3>
                  <span className="text-gray-500 mt-2">${producto.precio}</span>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <FooterPage />
    </>
  );
};

export default InicioPage;
