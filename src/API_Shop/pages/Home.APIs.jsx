import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { FaStar, FaShoppingCart } from 'react-icons/fa'; 
import Slider from 'react-slick';
import { useCart} from '../../context/cart.context'


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { apiData } from '../data/api.data';

export function HomeApis () {
    const [filters, setFilters] = useState({ price: '' });
    const [filteredApis, setFilteredApis] = useState(apiData); 
    const [apisData, setApisData] = useState(apiData); 
    const { addToCart,cart } = useCart();

    useEffect(() => {
        
        setApisData(apiData);
        setFilteredApis(apiData);
    }, []);

    //Lastest APIs
    const getLatestApis = () => {
        return apisData.slice(0, 4);  
    }

    //Best price apois
    const getBestApis = () => {
        return [...apisData].sort((a, b) => b.price - a.price).slice(0, 4);
    }

    // Carusel configuration
    const slickSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
              centerPadding: '10px', 
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              centerPadding: '10px', 
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '5px',
            },
          },
        ],
    };

    //Flters on change
    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    //Apply filters
    const applyFilters = () => {
        let filtered = apisData;

        if (filters.price) {
            // Puedes ajustar las opciones de filtro según tus necesidades
            if (filters.price === 'below50') {
                filtered = filtered.filter(api => api.price < 50);
            } else if (filters.price === '50to70') {
                filtered = filtered.filter(api => api.price >= 50 && api.price <= 70);
            } else if (filters.price === 'above70') {
                filtered = filtered.filter(api => api.price > 70);
            }
        }

        setFilteredApis(filtered);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Header */}
            <Header />

            <div className="flex-1 mb-4 p-4 px-4 bg-white w-full">

                {/* Contenedor del Carrusel de Últimas APIs */}
                <div className="pt-10 px-6 bg-gray-100 mb-4 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg mb-4 p-2">Últimas APIs</h2>
                    <Slider {...slickSettings}>
                        {getLatestApis().map(api => (
                            <div
                                key={api.id}
                                className="bg-white p-6 rounded-lg shadow-md mb-4" 
                                style={{ marginRight: '20px' }}>
                                <img
                                    src={api.image}
                                    alt={api.title}
                                    className="w-full h-[105px] object-cover rounded-md mb-4"
                                />
                                <h3 className="text-sm font-semibold text-black">{api.title}</h3>
                                <p className="text-sm text-black">Precio: ${api.price}</p>
                                
                                {/* Button Add to Cart */}
                                <button
                                    onClick={() => addToCart({ ...api, type: 'api' })}
                                    className="mt-2 bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600 flex items-center"
                                    disabled={cart.find(item => item.id === api.id && item.type === 'api')}
                                >
                                    <FaShoppingCart className="mr-1" />
                                    {cart.find(item => item.id === api.id && item.type === 'api') ? 'En Carrito' : 'Agregar al Carrito'}
                                </button>

                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Contenedor del Carrusel de Mejores APIs */}
                <div className="pt-10 px-6 bg-gray-100 mb-4 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg mb-4 p-2">Mejores APIs</h2>
                    <Slider {...slickSettings}>
                        {getBestApis().map(api => (
                            <div 
                                key={api.id} 
                                className="bg-white p-6 rounded-lg shadow-md mb-4" 
                                style={{ marginRight: '20px' }}>
    
                                <img 
                                    src={api.image} 
                                    alt={api.title} 
                                    className="w-full h-[105px] object-cover rounded-md mb-4" 
                                />
                                <h3 className="text-sm font-semibold text-black">{api.title}</h3>
                                <p className="text-sm text-black">Precio: ${api.price}</p>
                               
                               {/* Button Add to Cart */}
                               <button
                                    onClick={() => addToCart({ ...api, type: 'api' })}
                                    className="mt-2 bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600 flex items-center"
                                    disabled={cart.find(item => item.id === api.id && item.type === 'api')}
                                >
                                    <FaShoppingCart className="mr-1" />
                                    {cart.find(item => item.id === api.id && item.type === 'api') ? 'En Carrito' : 'Agregar al Carrito'}
                                </button>

                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Contenedor de la Lista de APIs con Filtros */}
                <div className="flex pt-10 px-6 gap-6 bg-gray-100">
                    {/* Lista de APIs */}
                    <div className="w-5/6 h-auto overflow-y-scroll">
                        <h2 className="text-lg mb-4 p-2">Lista de APIs</h2>
                        <div className="space-y-6">
                            {filteredApis.map(api => (
                                <div key={api.id} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold text-black">{api.title}</h3>
                                        <p className="text-sm text-black">Precio: ${api.price}</p>
                                        
                                    </div>
                                    <img
                                        src={api.image}
                                        alt={api.title}
                                        className="w-[340px] h-[75px] object-cover rounded-md"
                                    />
                                    <button
                                            onClick={() => addToCart({ ...api, type: 'api' })}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-600"
                                            disabled={cart.find(item => item.id === api.id && item.type === 'api')}
                                        >
                                             <FaShoppingCart className="mr-1" />
                                            {cart.find(item => item.id === api.id && item.type === 'api') ? 'En Carrito' : 'Agregar al Carrito'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="w-1/6 h-auto bg-gray-100 p-4 rounded-lg shadow-md">
                        <h3 className="text-sm font-semibold mb-4">Filtros</h3>
                        <div>
                            <label className="block text-xs font-medium mb-2">Precio</label>
                            <select
                                name="price"
                                value={filters.price}
                                onChange={handleFilterChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-xs"
                            >
                                <option value="">TODOS</option>
                                <option value="below50">Menos de $50</option>
                                <option value="50to70">$50 - $70</option>
                                <option value="above70">Más de $70</option>
                            </select>
                        </div>
                        {/* Puedes agregar más filtros si tienes más campos en apiData */}
                        {/* Ejemplo para Features si los datos estuvieran disponibles
                        <div className="mt-4">
                            <label className="block text-xs font-medium mb-2">Características</label>
                            <select
                                name="features"
                                value={filters.features}
                                onChange={handleFilterChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-xs"
                            >
                                <option value="">TODOS</option>
                                <option value="certificate">Certificado</option>
                                <option value="updated2025">Actualizado 2025</option>
                                <option value="includesExercises">Incluye Ejercicios</option>
                            </select>
                        </div>
                        */}
                        <button
                            onClick={applyFilters}
                            className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md text-xs"
                        >
                            Aplicar Filtro
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
