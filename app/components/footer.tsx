import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#a2b38b] dark:bg-gray-900">
      <div className="container px-5 mx-auto">
        <div className="flex flex-row items-center text-center">
          <center>
            <Image
              priority={true}
              src="/LogoCafeXB.png"
              alt="logotipo"
              width={120}
              height={120}
            />
          </center>

          <p className="text-dark dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <hr className="border-gray-200 dark:border-gray-700"/>

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-dark dark:text-gray-500">
            © Copyright 2021. All Rights Reserved.
          </p>

          <div className="flex sm:mt-0">
            <a
              href="#"
              className=" text-sm text-dark dark:text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Teams{" "}
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;