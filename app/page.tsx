import Nav from './components/nav';
import FooterPage from './components/footer';

const InicioPage = () => {
  return (
    <>
      <Nav />
      <div className="container mx-auto p-4 dark:text-white">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a la página de inicio</h1>
        <p className="text-lg mb-4">¡Disfruta de nuestro contenido sobre café!</p>

        {/* Contenido sobre café */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-md shadow-md mb-4">
          <h2 className="text-2xl font-bold mb-2 ">Nuestro café especial</h2>
          <p className="text-gray-700 dark:text-white">
            En nuestro café, cada grano se selecciona con cuidado para ofrecerte la mejor experiencia de sabor.
          </p>
        </div>

      </div>
      <FooterPage />
    </>
  );
};

export default InicioPage;
