'use client'
import React, { useState } from 'react';

const Pedidospage = () => {
    const [activeTab, setActiveTab] = useState('todo'); // Default to 'Todo' tab

    const changeTab = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };
    const productos = [
        {
            id: 1,
            nombre: "Producto 1",
            precio: "$399",
            descripcion:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            imagen:
                "https://www.costco.com.mx/medias/sys_master/products/h09/hdb/121914622574622.jpg",
        },
        {
            id: 2,
            nombre: "Producto 2",
            precio: "$566",
            descripcion:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            imagen:
                "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750179161700L.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        },
        
    ];


    return (
        <div>
        <div className=" font-sans h-screen">
          <div className="p-8">
            <div className="max-w-md mx-auto">
              <div className="flex space-x-4 mb-4 p-2 bg-white rounded-lg shadow-md">
                <button
                  onClick={() => changeTab('todo')}
                  className={` flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${activeTab === 'todo' ? 'bg-blue-600 text-white' : ''}`}
                >
                  Todo
                </button>
                <button
                  onClick={() => changeTab('procesando')}
                  className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${activeTab === 'procesando' ? 'bg-blue-600 text-white' : ''}`}
                >
                  Procesando
                </button>
                <button
                  onClick={() => changeTab('completado')}
                  className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${activeTab === 'completado' ? 'bg-blue-600 text-white' : ''}`}
                >
                  Completado
                </button>
              </div>
              {/* Render content based on active tab */}
              {productos.map((producto) => (
                <div
                  key={producto.id}
                  className={`transition-all duration-300 ease-in-out transform ${
                    activeTab === 'todo' || activeTab === 'procesando' || activeTab === 'completado' ? '' : 'scale-0'
                  } ${activeTab === 'todo' ? 'scale-100' : ''} bg-white p-8 shadow-md border-l-4 border-blue-600 flex items-center`}
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="mr-4 rounded-md max-w-24 max-h-24"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 text-blue-600">{producto.nombre}</h2>
                    {activeTab === 'todo' && (
                      <>
                        <p className="text-gray-700">{producto.descripcion}</p>
                        <p className="text-blue-600 font-bold mt-4">{producto.precio}</p>
                      </>
                    )}
                    {activeTab === 'procesando' && (
                      <p className="text-gray-700">Estado: Procesando</p>
                    )}
                    {activeTab === 'completado' && (
                      <p className="text-gray-700">Estado: Completado</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Pedidospage;
