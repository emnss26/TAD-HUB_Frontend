import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import {Link, useNavigate } from "react-router-dom";
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../../context/auth.context';
import { FaStar } from 'react-icons/fa';

export function MyCourses() {
    const { currentUser } = useAuth();
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPurchasedCourses = async () => {
        if (!currentUser) {
          setLoading(false);
          return;
        }
  
        try {
          const purchasesRef = collection(db, "users", currentUser.uid, "purchasedCourses");
          const q = query(purchasesRef, orderBy("purchasedAt", "desc"));
          const querySnapshot = await getDocs(q);
  
          const courses = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
  
          setPurchasedCourses(courses);
        } catch (error) {
          console.error("Error al obtener los cursos comprados:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPurchasedCourses();
    }, [currentUser]);
  
    if (!currentUser) {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <div className="flex-1 flex flex-col items-center justify-center p-4 mt-12">
            <h2 className="text-2xl font-semibold mb-4">Debes iniciar sesión para ver tus cursos.</h2>
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Iniciar Sesión
            </Link>
          </div>
          <Footer />
        </div>
      );
    }
  
    return (
      <div className="min-h-screen flex flex-col bg-white">
        {/* Header */}
        <Header />
        
        <div className="flex-1 mb-4 p-4 px-4 bg-white w-full mt-12"> {/* Ajusta el margen superior según el header */}
          <h2 className="text-2xl font-semibold mb-4">Mis Cursos</h2>
          
          {loading ? (
            <p>Cargando tus cursos...</p>
          ) : purchasedCourses.length === 0 ? (
            <p>No has comprado ningún curso todavía.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedCourses.map(course => (
                <div key={course.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-md mb-4" />
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.level}</p>
                  <p className="text-sm text-gray-600">Duración: {course.duration}</p>
                  <p className="text-sm text-gray-600">Rating: {course.rating} <FaStar className="inline text-yellow-500" /></p>
                  {/* Puedes agregar más detalles o enlaces si es necesario */}
                </div>
              ))}
            </div>
          )}
        </div>
  
        {/* Footer */}
        <Footer />
      </div>
    );
  }