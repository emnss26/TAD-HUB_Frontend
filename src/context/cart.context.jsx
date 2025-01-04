import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './auth.context'; 

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    if (currentUser) {
      const storedCart = localStorage.getItem(`cart_${currentUser.uid}`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]);
      }
    }
  }, [currentUser]);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.uid}`, JSON.stringify(cart));
    }
  }, [cart, currentUser]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      // Evitar duplicados
      if (prevCart.find((cartItem) => cartItem.id === item.id && cartItem.type === item.type)) {
        return prevCart;
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (itemId, itemType) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === itemId && item.type === itemType)));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};