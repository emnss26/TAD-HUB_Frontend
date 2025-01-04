import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa"; 
import { useAuth } from '../../src/context/auth.context';
import { useCart } from '../../src/context/cart.context'; 

export function Header() {
  const { currentUser, logout } = useAuth(); 
  const { cart } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="bg-gray-900 text-white w-full flex justify-between items-center h-12 px-6 fixed top-0 left-0 z-10">
      <div className="text-xs font-normal text-white">
        TAD | Taller de Arquitectura Digital
      </div>
      <nav className="flex items-center space-x-6">
        <Link to="/" className="text-white uppercase text-xs hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-white uppercase text-xs hover:underline">
          About
        </Link>
        <Link to="/contact" className="text-white uppercase text-xs hover:underline">
          Contact
        </Link>

         {/* ShoppingCar Icon */}
         <Link to="/cart" className="relative text-white hover:text-gray-400">
          <FaShoppingCart className="text-lg" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>

        {currentUser ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <FaUser className="text-white text-lg" />
              <span className="text-xs">{currentUser.email}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg">
                <Link
                  to="/my-courses"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Mis Cursos
                </Link>                
                <Link
                  to="/my-apis"
                  className="block px-4 py-2 text-sm hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Mis APIs
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <FaUser className="text-white text-lg hover:text-gray-400" />
          </Link>
        )}
      </nav>
    </header>
  );
}