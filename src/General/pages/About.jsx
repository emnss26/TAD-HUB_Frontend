import React from 'react';

import {Header} from '../../components/header';
import {Footer} from '../../components/footer';

export function About () {

    return (
         <div className="min-h-screen flex flex-col bg-white">
             
            {/* Header */}
            <Header />
        
            {/* General Content */}  
            <div className="flex flex-col justify-center items-center flex-grow pt-20">
                <h1 className="text-3xl font-bold text-gray-900 opacity-90 mb-10">TAD | Taller de Arquitectura Digital</h1>
                
                <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
                    <p className="text-s text-gray-700 text-center">
                        TAD HUB is a digital platform for architects and engineers, where you can find the best courses and tools to improve your skills and boost your career and projects.
                    </p>
                    <p className="text-s text-gray-700 text-center">
                        Our mission is to provide high-quality content and resources to help professionals in the AEC industry to grow and succeed in their projects and careers.
                    </p>
                    <p className="text-s text-gray-700 text-center">
                        We are constantly updating our platform with new courses, tools, and resources to help you stay up-to-date with the latest trends and technologies in the industry.
                    </p>
                    <p className="text-s text-gray-700 text-center">
                        Join TAD HUB today and take your career to the next level!
                    </p>
                    </div>
            </div>
            {/* Footer */}
            <Footer />
        </div> 
    )

}
