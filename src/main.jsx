import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../src/context/auth.context.jsx';
import {CartProvider} from '../src/context/cart.context.jsx'

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    
  </StrictMode>,
)
