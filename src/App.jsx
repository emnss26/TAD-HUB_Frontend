import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Home Page
import {Home} from './General/pages/Home'
import {LoginPage} from './General/pages/LoginPage'
import {About} from './General/pages/About'
import {Contact} from './General/pages/Contact'
import {CheckoutSuccess} from './General/pages/Checkout'
import {Cart} from './General/pages/cart'
import { MyCourses } from './General/pages/Mycourses';
import { MyAPIs } from './General/pages/MyApis';

//CoursesPages
import {HomeCourses} from './Courses_Shop/pages/Home.Courses'

//APIS Pages
import {HomeApis} from './API_Shop/pages/Home.APIs'

//APS App Pages
import {HomeApsApp} from './APS_App/pages/Home.APS'

// Component
import {ProtectedRoute} from './components/protected.route'

//styles
import './App.css'


function App() {
  
  return (
      <Router>

        <Routes>
          {/* Página principal y contenido genral*/}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact />} />

          {/* Rutas protegidas */}
          <Route 
            path="/checkout-success" 
            element={
                    <ProtectedRoute>
                      <CheckoutSuccess/>
                    </ProtectedRoute>} />

          <Route 
            path="/cart" 
            element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>} />

          <Route 
            path="/my-courses" 
            element={
                    <ProtectedRoute>
                      <MyCourses />
                    </ProtectedRoute>} />

          <Route 
            path="/my-apis" 
            element={
                    <ProtectedRoute>
                      <MyAPIs />
                    </ProtectedRoute>} />

          {/* Opción 1: Cursos en línea */}
          {/* Rutas protegidas */}
          <Route  path="/courses" 
                  element={
                    <ProtectedRoute>
                      <HomeCourses />
                    </ProtectedRoute>
                  } 
                  />

          {/* Opción 2: Tienda de APIs */}
          <Route path="/apisshop" element={<HomeApis />} />

          {/* Opción 3: Aplicación de servicios de plataforma de Autodesk */}
          <Route path="/apsapp" element={<HomeApsApp />} />

        </Routes>

      </Router>
  )
}

export default App
