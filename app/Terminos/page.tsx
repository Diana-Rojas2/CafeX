"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IUsuario } from "../models/IUsuario";
import Swal from "sweetalert2";
import { IVendedor } from "../models/IVendedor";

const TerminosPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { data: session } = useSession();
  const [vendedor, setVendedor] = useState<IVendedor[]>([]);
  const [termsChecked, setTermsChecked] = useState(false); // Nuevo estado para el checkbox

  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);

    const darkModeHandler = (e: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => setIsDarkMode(e.matches);
    darkModeQuery.addListener(darkModeHandler);

    return () => darkModeQuery.removeListener(darkModeHandler);
  }, []);
  return (
    <div className="font-mono ">
      <div className="container mx-auto dark:border-gray-600">
        <div className="flex justify-center px-6 my-12 dark:border-gray-600">
        <div className="max-w-3xl mx-auto dark:bg-gray-700 bg-white rounded-lg lg:rounded">
  <div className="px-4 pt-1 pb-4 dark:bg-gray-700 bg-white dark:border-gray-600 rounded">
              <h4 className="text-xl text-center mt-2 dark:text-white text-black">
              Términos y Condiciones
              </h4>
              <center>
                <Image
                  src={isDarkMode ? "/LogoCafeXB.png" : "/LogoCafeXN.png"}
                  priority
                  alt="logotipo"
                  width={160}
                  height={160}
                />
              </center>
              <div className="mb-2">
              <div className="mb-2 px-4 dark:bg-gray-700 bg-white dark:border-gray-600 rounded text-justify">
                  <ul className="mb-4 dark:text-white text-black">
                    <li>
                        Los presentes términos y condiciones de uso (en
                        adelante, los "Términos y Condiciones") regulan el
                        acceso y uso de la página web de “CAFEX” (en adelante,
                        la "Página Web"), propiedad de “Grupo CAFEX SA. CV”. (en
                        adelante, la "Empresa"). La utilización de la Página Web
                        implica la aceptación de los presentes Términos y
                        Condiciones, por lo que el usuario debe leerlos
                        atentamente antes de comenzar a utilizar la Página Web.
                    </li>
                    <hr className="mb-2 border-t" />
                    <li>
                      <strong>1. Datos personales</strong><br />
                        La Empresa se compromete a tratar los datos personales
                        de los usuarios de la Página Web de manera segura y
                        confidencial, de conformidad con la legislación
                        aplicable en materia de protección de datos. Los datos
                        personales facilitados por los usuarios serán utilizados
                        para la gestión de su cuenta de usuario, el
                        procesamiento de sus pedidos y la evaluación de los
                        mismos. La Empresa no cederá los datos personales de los
                        usuarios a terceros, salvo en los casos previstos en la
                        legislación aplicable en materia de protección de datos.
                    </li>
                    <hr className="mb-2 border-t" />
                    <li>
                      <strong>2. Uso de la Página Web</strong><br />
                        Los usuarios podrán utilizar la Página Web para realizar
                        pedidos de café y para crear una cuenta de vendedor para
                        poner sus productos a la venta. Para crear una cuenta de
                        usuario, se deberá proporcionar la siguiente
                        información:
                        <ul className="mb-4 dark:text-white text-black pl-6">
                          <li>1. Nombre y apellidos</li>
                          <li>2. Dirección de correo electrónico</li>
                          <li>3. Teléfono</li>
                          <li>4. Nombre</li>
                          <li>5. Contraseña</li>
                        </ul>
                        Para crear una cuenta de vendedor, los usuarios deberán
                        proporcionar la siguiente información:
                        <ul className="mb-4 dark:text-white text-black pl-6">
                          <li>1. RFC</li>
                          <li>2. CURP</li>
                          <li>3. Clave de elector</li>
                          <li>4. Exposición de motivos</li>
                        </ul>
                        Los usuarios son responsables de la veracidad de la
                        información que proporcionen a la Empresa. La Empresa se
                        reserva el derecho a rechazar cualquier pedido o
                        registro de cuenta de vendedor que no cumpla con los
                        requisitos establecidos en los presentes Términos y
                        Condiciones.
                    </li>
                    <hr className="mb-2 border-t" />
                    <li>
                      <strong>3. Propiedad intelectual</strong><br />
                        El contenido de la Página Web, incluyendo, a título
                        enunciativo, textos, imágenes, marcas, logotipos,
                        diseños, etc., es propiedad de la Empresa o de sus
                        proveedores de contenidos, y está protegido por las
                        leyes de propiedad intelectual. Los usuarios no podrán
                        reproducir, distribuir, modificar, copiar, comunicar
                        públicamente, transformar o utilizar el contenido de la
                        Página Web de ninguna forma, salvo en los casos
                        permitidos en la ley o expresamente autorizados por la
                        Empresa.
                    </li>
                    <hr className="mb-2 border-t" />
                    <li>
                      <strong>4. Responsabilidad</strong><br />
                        La Empresa no será responsable de los daños o perjuicios
                        que se pudieran ocasionar a los usuarios como
                        consecuencia de la utilización de la Página Web,
                        incluyendo, a título enunciativo, fallos técnicos,
                        interrupciones, desconexiones, virus informáticos,
                        averías telefónicas, retrasos o bloqueos en el uso del
                        presente sistema electrónico causados por causas ajenas
                        a la Empresa. La Empresa tampoco será responsable de los
                        daños o perjuicios que se pudieran ocasionar a los
                        usuarios como consecuencia de la utilización de la
                        Página Web por parte de terceros, incluyendo, a título
                        enunciativo, el acceso no autorizado a los datos
                        personales de los usuarios, o la utilización de los
                        mismos para fines ilícitos o fraudulentos.
                    </li>
                    <hr className="mb-2 border-t" />
                    <li>
                      <strong>
                        5. Modificaciones de los Términos y Condiciones
                      </strong><br />
                        La Empresa se reserva el derecho a modificar los
                        presentes Términos y Condiciones en cualquier momento,
                        sin previo aviso. Los usuarios serán responsables de
                        consultar periódicamente los presentes Términos y
                        Condiciones para conocer las modificaciones que se
                        pudieran haber producido.
                    </li>
                    <hr className="mb-2 border-t" />
                    <li>
                      <strong>
                        6. Legislación aplicable y jurisdicción competente
                      </strong><br />
                        Los presentes Términos y Condiciones se regirán por la
                        ley mexicana. En caso de cualquier controversia derivada
                        del uso de la Página Web, las partes se someten a la
                        jurisdicción de los Juzgados y Tribunales de la ciudad
                        de México.
                    </li>
                    <hr className="mb-2 border-t" />
                    <li>
                      <strong>7. Disposiciones finales</strong><br />
                        En el caso de que cualquier disposición de los presentes
                        Términos y Condiciones sea declarada nula o ineficaz, la
                        misma será sustituida por otra disposición que tenga el
                        mismo sentido o alcance que la misma, y que sea válida y
                        eficaz. Los presentes Términos y Condiciones forman
                        parte del contrato entre la Empresa y los usuarios de la
                        Página Web.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="mb-2 border-t" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminosPage;
