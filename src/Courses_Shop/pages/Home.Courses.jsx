import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {Header} from '../../components/header';
import { Footer } from '../../components/footer';
import {useCart} from '../../context/cart.context'

import {coursesData} from '../data/courses.data'

import { FaStar, FaShoppingCart } from 'react-icons/fa'; 
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// Function to get the best courses (rating > 4.5)
const getBestCourses = () => {
    return coursesData.filter(course => course.rating > 4.5);
}

// Function to get the first 4 courses (latest courses)
const getLatestCourses = () => {
    return coursesData.slice(0, 4);  
}

// Slick Carousel Settings
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


export function HomeCourses () {
    const [filters, setFilters] = useState({ duration: '', rating: '', language: '' });
    const [filteredCourses, setFilteredCourses] = useState(coursesData); // Filtered list
    const { addToCart, cart } = useCart();

    // Function to handle filter changes
    const handleFilterChange = (e) => {
    setFilters({
        ...filters,
        [e.target.name]: e.target.value
    });
    };

    // Function to apply the filters
    const applyFilters = () => {
    let filtered = coursesData;

    if (filters.duration) {
        filtered = filtered.filter(course => course.duration.includes(filters.duration));
    }

    if (filters.rating) {
        filtered = filtered.filter(course => course.rating >= parseFloat(filters.rating));
    }

    if (filters.language) {
        filtered = filtered.filter(course => course.language === filters.language);
    }

    setFilteredCourses(filtered); // Actualiza la lista filtrada
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">

        {/* Header */}
        <Header />
        
        <div className="flex-1 mb-4 p-4 px-4 bg-white w -full ">

            {/* Carousel Container Latest Courses */}
            <div className="h-[390px] pt-10 px-6 bg-gray-100 mb-4 p-4 rounded-lg shadow-md">
                <h2 className="text-s mb-2 mb-2 p-2">Last Courses</h2>
                <Slider {...slickSettings}>
                    {getLatestCourses().map(course => (
                    <div
                        key={course.id}
                        className="bg-white p-6 rounded-lg shadow-md mb-4" 
                        style={{ marginRight: '20px' }}>
                        <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-[105px] object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xs font-semibold text-black">{course.title}</h3>
                        <p className="text-xs text-black">{course.level}</p>
                        <p className="text-xs text-black">Duration: {course.duration}</p>
                        <p className="text-xs text-black">Rating: {course.rating} <FaStar className="inline text-yellow-500" /></p>
                    
                        {/* Button Add to Cart */}
                        <button
                          onClick={() => addToCart({ ...course, type: 'course' })}
                          className="mt-2 bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600 flex items-center"
                          disabled={cart.find(item => item.id === course.id && item.type === 'course')}
                        >
                          <FaShoppingCart className="mr-1" />
                          {cart.find(item => item.id === course.id && item.type === 'course') ? 'En Carrito' : 'Agregar al Carrito'}
                        </button>

                    </div>
                    ))}
                </Slider>
            </div>
    
            {/* Carousel Container Best Rated Courses */}
            <div className="h-[390px] pt-10 px-6 bg-gray-100 mb-4 p-4 rounded-lg shadow-md">
                <h2 className="text-s mb-2 mb-2 p-2 ">Best Courses</h2>
                <Slider {...slickSettings}>
                    {getBestCourses().map(course => (
                    <div 
                        key={course.id} 
                        className=" bg-white p-6 rounded-lg shadow-md mb-4 p-4" 
                        style={{ marginRight: '20px' }}>

                        <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-[105px] object-cover rounded-md mb-4" 
                        />
                        <h3 className="text-xs font-semibold text-black">{course.title}</h3>
                        <p className="text-xs text-black">{course.level}</p>
                        <p className="text-xs text-black">Duration: {course.duration}</p>
                        <p className="text-xs text-black">Rating: {course.rating} <FaStar className="inline text-yellow-500" /></p>
                    
                        {/* Button Add to Cart */}
                        <button
                          onClick={() => addToCart({ ...course, type: 'course' })}
                          className="mt-2 bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600 flex items-center"
                          disabled={cart.find(item => item.id === course.id && item.type === 'course')}
                        >
                          <FaShoppingCart className="mr-1" />
                          {cart.find(item => item.id === course.id && item.type === 'course') ? 'En Carrito' : 'Agregar al Carrito'}
                        </button>
                    </div>
                    ))}
                </Slider>
            </div>
    
            {/* Courses List Container with Filters */}
            <div className="flex pt-10 px-6 gap-6 bg-gray-100 ">
                {/* Lista de Cursos */}
                <div className="w-5/6 h-[900px] overflow-y-scroll">
                    <h2 className="text-s mb-2 mb-2 p-2">List of Courses</h2>
                    <div className="space-y-6">
                        {filteredCourses.map(course => (
                        <div key={course.id} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <h3 className="text-xs font-semibold text-black">{course.title}</h3>
                                <p className="text-xs text-black">{course.level}</p>
                                <p className="text-xs text-black">Duration: {course.duration}</p>
                                <p className="text-xs text-black">Rating: {course.rating} <FaStar className="inline text-yellow-500" /></p>
                            
                                {/* Button Add to Cart */}
                                <button
                                  onClick={() => addToCart({ ...course, type: 'course' })}
                                  className="mt-2 bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600 flex items-center"
                                  disabled={cart.find(item => item.id === course.id && item.type === 'course')}
                                >
                                  <FaShoppingCart className="mr-1" />
                                  {cart.find(item => item.id === course.id && item.type === 'course') ? 'En Carrito' : 'Agregar al Carrito'}
                                </button>
                            
                            </div>
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-[340px] h-[75px] object-cover rounded-md"
                            />
                            </div>
                        ))}
                    </div>
                </div>
        
                {/* Filtros */}
                <div className="w-1/6 h-[900px] bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xs font-semibold mb-4">Filters</h3>
                    <div>
                    <label className="block text-xs font-medium mb-2">Duración</label>
                    <select
                        name="duration"
                        value={filters.duration}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-xs"
                    >
                        <option value="">ALL</option>
                        <option value="10h">10 horas</option>
                        <option value="15h">15 horas</option>
                        <option value="5h">5 horas</option>
                    </select>
                    </div>
                    <div className="mt-4">
                    <label className="block text-xs font-medium mb-2">Rating</label>
                    <select
                        name="rating"
                        value={filters.rating}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-xs"
                    >
                        <option value="">ALL</option>
                        <option value="4.5">4.5+</option>
                        <option value="4.0">4.0+</option>
                    </select>
                    </div>
                    <div className="mt-4">
                    <label className="block text-xs font-medium mb-2">Idioma</label>
                    <select
                        name="language"
                        value={filters.language}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-xs"
                    >
                        <option value="">ALL</option>
                        <option value="Spanish">Español</option>
                        <option value="English">Inglés</option>
                    </select>
                    </div>
                    <button
                    onClick={applyFilters}
                    className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md text-xs"
                    >
                    Apply Filter
                    </button>
                </div>
            </div>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    );
  }