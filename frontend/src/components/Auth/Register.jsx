import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/users/register', {
        name,
        email,
        password,
      });
      navigate('/login');
    } catch (error) {
      setError('User already exists.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="p-6 bg-white shadow-md rounded">
        <h2 className="mb-4 text-xl font-bold">Register</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
