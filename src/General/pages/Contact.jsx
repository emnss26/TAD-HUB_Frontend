import { useState } from 'react';

import {Header} from '../../components/header';
import { Footer } from '../../components/footer';

export function Contact () {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitStatus, setSubmitStatus] = useState(null);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!firstName || !lastName || !email || !message) {
        setSubmitStatus({ success: false, message: 'Por favor, completa todos los campos.' });
        return;
        }

        //simulate form submission
        setSubmitStatus({ success: true, message: '¡Tu mensaje ha sido enviado correctamente!' });

        // Clear the form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
    };

    return (
    <div className="min-h-screen flex flex-col bg-white">
    
        {/* Header */}
        <Header />
    
        {/* Main Content */}
      <div className="flex flex-col justify-center items-center flex-grow pt-20 px-4">
        <h1 className="text-3xl text-gray-900 opacity-90 mb-10">Contact Us</h1>

        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
            {/* First Name */}
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 text-xs font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Your first name"
                required
              />
            </div>

            {/* Apellido */}
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700 text-xs font-bold mb-2">
              Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Your last name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="youremail@example.com"
                required
              />
            </div>

            {/* Question or Suggestion */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-xs font-bold mb-2">
                Question or Suggestion
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Write your question or suggestion here..."
                rows="5"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Send
              </button>
            </div>

            {/* Mensaje de Estado */}
            {submitStatus && (
              <div className={`mt-4 text-center ${submitStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>
        {/* Footer */}
        <Footer />
    </div>
  );
}