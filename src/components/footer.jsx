import React from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white h-[90px] flex items-center justify-between px-6">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        {/* Title */}
        <h2 className="text-xs">TAD | Taller de Arquitectura Digital</h2>
        
        {/* Social Network */}
        <div className="flex space-x-4">
          <a 
            href="https://www.linkedin.com/in/taller-de-arquitectura-digital-363726185/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 transition duration-300"
          >
            <FaLinkedin size={20} />
          </a>
          <a 
            href="https://www.instagram.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500 transition duration-300"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
      
      {/* Rigth section */}
      <div className="flex flex-col items-end space-y-1">
        {/* Email */}
        <div className="flex items-center space-x-2">
          <FaEnvelope size={16} />
          <a 
            href="mailto:taller.arq.dgtl@gmail.com" 
            className="text-white hover:text-blue-400 transition duration-300 text-sm"
          >
            taller.arq.dgtl@gmail.com
          </a>
        </div>
        
        {/* Copyright */}
        <p className="text-xs">&copy; {new Date().getFullYear()} TAD Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}