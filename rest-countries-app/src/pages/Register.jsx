import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/487535.jpg'; // Import your background image

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('https://globepeekbackend.azurewebsites.net/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setMessage('✅ Registered successfully!');
      setFormData({ email: '', password: '' });
      setTimeout(() => navigate('/login'), 1000); // Redirect to login after successful registration
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Left Section with Background Image */}
      <div className="hidden md:flex w-3/4 bg-cover bg-center"></div>

      {/* Right Section with Register Form */}
      <div className="flex flex-col  justify-center items-center w-full md:w-1/4 p-8 " style={{
            backgroundColor: 'rgba(0, 1, 31, 0.8)', // Semi-transparent background
          }}>
      
        <div
          className="w-full max-w-md rounded-2xl shadow-lg p-8"
          
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Create Account</h2>
          {message && (
            <div className="mb-4 text-sm text-center text-red-500">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-200">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border  focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2  hover:bg-blue-700 transition-colors"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className="mt-6 text-sm text-center text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-blue-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
