
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { Link } from 'react-router-dom';

export function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-semibold mb-4">¡Congratulation Success!</h2>
        <p className="mb-6">Gracias por tu compra. Has añadido los cursos a tu cuenta.</p>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Go Back Home
        </Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}