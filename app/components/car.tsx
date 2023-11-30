const Cart: React.FC<{ cartOpen: boolean, toggleCart: () => void }> = ({ cartOpen, toggleCart }) => {
  return (
    <div className="float-right">
  <div
    className={`fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300 ${cartOpen ? 'translate-x-0 ease-out z-50' : 'translate-x-full ease-in z-50'}`}
  >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">Tu carito</h3>
        <button onClick={toggleCart} className="text-gray-600 focus:outline-none">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <hr className="my-3" />

      <div className="flex justify-between mt-6">
        <div className="flex">
          <img className="h-20 w-20 object-cover rounded" src="https://chedrauimx.vtexassets.com/arquivos/ids/21966437/7501038350325_00.jpg?v=638350898081630000" alt="" />
          <div className="mx-3">
            <h3 className="text-sm text-gray-600">Cafe tostado</h3>
            <div className="flex items-center mt-2">
              <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
              <span className="text-gray-700 mx-2">1</span>
              <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <span className="text-gray-600">$200</span>
      </div>
      <button className="w-full">
      <a className="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
        
        <span>Hacer pedido</span>
        <svg className="h-5 w-5 mx-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </a>
        </button>
    </div>
    </div>
  );
};

export default Cart;
