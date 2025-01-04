
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { useCart } from '../../context/cart.context';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {db} from '../../firebaseConfig';
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { useAuth } from '../../context/auth.context';

export function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleCheckout = async () => {
    if (!currentUser) {
      alert("Debes estar logueado para realizar una compra.");
      navigate('/login');
      return;
    }

    console.log("UID del Usuario:", currentUser.uid);

    try {
      // Crear batch para escrituras atómicas
      const batch = writeBatch(db);

      cart.forEach(item => {
        let userPurchasesRef;
        if (item.type === 'course') {
          userPurchasesRef = collection(db, "users", currentUser.uid, "purchasedCourses");
        } else if (item.type === 'api') {
          userPurchasesRef = collection(db, "users", currentUser.uid, "purchasedAPIs");
        } else {
          throw new Error(`Tipo de ítem desconocido: ${item.type}`);
        }
      
        const docRef = doc(userPurchasesRef); // Crear referencia a un nuevo documento
        batch.set(docRef, {
          ...item,
          purchasedAt: serverTimestamp()
        });
      });

      // Ejecutar batch
      await batch.commit();

      // Limpiar el carrito
      clearCart();

      // Redirigir a la página de confirmación
      navigate('/checkout-success');
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      
      if (error.message.includes("Tipo de ítem desconocido")) {
        alert("Hubo un problema con los ítems en tu carrito. Por favor, revisa y vuelve a intentarlo.");
      } else {
        alert("Hubo un error al procesar tu compra. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />
      
      <div className="flex-1 mb-4 p-4 px-4 bg-white w-full mt-12"> {/* Ajusta el margen superior según el header */}
        <h2 className="text-2xl font-semibold mb-4">Tu Carrito</h2>
        
        {cart.length === 0 ? (
          <p>No tienes cursos en tu carrito.</p>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={`${item.id}-${item.type}`} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.type === 'course' ? (
                    <>
                      <p className="text-sm text-gray-600">{item.level}</p>
                      <p className="text-sm text-gray-600">Duración: {item.duration}</p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-600">Tipo: API</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id, item.type)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          <button
            onClick={handleCheckout}
            className="w-full bg-green-500 text-white p-2 rounded-md text-sm hover:bg-green-600"
          >
            Proceder al Pago
          </button>
        </div>
      )}
    </div>

    {/* Footer */}
    <Footer />
  </div>
);
}