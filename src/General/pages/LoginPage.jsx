import { useState } from 'react';
import { auth } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { FaGoogle } from 'react-icons/fa'; 
import {Header} from '../../components/header';
import {Footer} from '../../components/footer';


export function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
  
    // ----- REGISTER / LOGIN Email/Password -----
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      try {
        if (isRegistering) {
          // Registration
          const result = await createUserWithEmailAndPassword(auth, email, password);
          console.log('User registered:', result.user);

            const token = await result.user.getIdToken();
            console.log('ID TOKEN:', token);
            localStorage.setItem('firebaseToken', token);

        } else {
          // Login
          const result = await signInWithEmailAndPassword(auth, email, password);
          console.log('User logged in:', result.user);

            const token = await result.user.getIdToken();
            console.log('ID TOKEN:', token);
            localStorage.setItem('firebaseToken', token);
        }

        navigate('/');

      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
  
    // ----- LOGIN with Google -----
    const handleGoogleLogin = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        console.log('User with Google:', result.user);

        const token = await result.user.getIdToken();
        console.log('TOKEN Google:', token);
        localStorage.setItem('firebaseToken', token);

       navigate('/');

      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
  
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Contenido Principal */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold text-center text-black">
            {isRegistering ? 'Crear una cuenta' : 'Iniciar sesión'}
          </h2>

          {/* Botón de Login con Google */}
          <div>
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <FaGoogle className="mr-2" /> Iniciar sesión con Google
            </button>
          </div>

          {/* Separador */}
          <div className="flex items-center">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-sm text-gray-500">o</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Formulario Email/Password */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Contraseña</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tu contraseña"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-[#0077b7] rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isRegistering ? 'Registrarse' : 'Iniciar sesión'}
            </button>
          </form>

          {/* Alternar entre Login y Registro */}
          <div className="text-sm text-center">
            {isRegistering ? (
              <>
                ¿Ya tienes una cuenta?{' '}
                <button
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-600 hover:underline"
                >
                  Iniciar sesión
                </button>
              </>
            ) : (
              <>
                ¿No tienes una cuenta?{' '}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-blue-600 hover:underline"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}