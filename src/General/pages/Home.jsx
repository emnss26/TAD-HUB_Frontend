import React, { useState, useRef, useEffect} from "react";
import {Link, useNavigate } from "react-router-dom";
import {Header} from '../../components/header';
import {Footer} from '../../components/footer';

export function Home () {


    return (
        <div className="min-h-screen flex flex-col bg-white">
    
          {/* Header */}
          <Header />
    
          {/* General Content */}
      <div className="flex flex-col justify-center items-center flex-grow pt-20">
        <h1 className="text-5xl font-bold text-gray-900 opacity-90 mb-10">TAD HUB</h1>
        
        {/* Buttons row */}
        <div className="flex flex-row items-center justify-between gap-6 w-full max-w-3xl">
          <Link to="/courses" className="w-full">
            <button className="bg-white text-black font-bold uppercase text-xs py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition w-full">
              BIM Courses
            </button>
          </Link>
          <Link to="/apisshop" className="w-full">
            <button className="bg-white text-black font-bold uppercase text-xs py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition w-full">
              APIs Shop
            </button>
          </Link>
          <Link to="/apsapp" className="w-full">
            <button className="bg-white text-black font-bold uppercase text-xs py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition w-full">
              APS App
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}