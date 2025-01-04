import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { Link } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../../context/auth.context';

export function MyAPIs() {
    const { currentUser } = useAuth();
    const [purchasedAPIs, setPurchasedAPIs] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPurchasedAPIs = async () => {
        if (!currentUser) {
          setLoading(false);
          return;
        }
  
        try {
          const purchasesRef = collection(db, "users", currentUser.uid, "purchasedAPIs");
          const q = query(purchasesRef, orderBy("purchasedAt", "desc"));
          const querySnapshot = await getDocs(q);
  
          const apis = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
  
          setPurchasedAPIs(apis);
        } catch (error) {
          console.error("Error al obtener las APIs compradas:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPurchasedAPIs();
    }, [currentUser]);
  
    if (!currentUser) {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <div className="flex-1 flex flex-col items-center justify-center p-4 mt-12">
            <h2 className="text-2xl font-semibold mb-4">Debes iniciar sesión para ver tus APIs.</h2>
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
        
        <div className="flex-1 mb-4 p-4 px-4 bg-white w-full mt-12">
          <h2 className="text-2xl font-semibold mb-4">Mis APIs</h2>
          
          {loading ? (
            <p>Cargando tus APIs...</p>
          ) : purchasedAPIs.length === 0 ? (
            <p>No has comprado ninguna API todavía.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedAPIs.map(api => (
                <div key={api.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <img src={api.image} alt={api.title} className="w-full h-40 object-cover rounded-md mb-4" />
                  <h3 className="text-lg font-semibold">{api.title}</h3>
                  <p className="text-sm text-gray-600">Precio: ${api.price}</p>
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