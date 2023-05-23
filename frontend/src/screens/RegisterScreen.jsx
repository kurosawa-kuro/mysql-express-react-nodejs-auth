// frontend\src\screens\RegisterScreen.jsx

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useStore } from '../state/store.js';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const { setUser } = useStore();
  const queryClient = useQueryClient();

  const registerUserMutation = useMutation(
    async ({ name, email, password }) => {
      const response = await axios.post('/api/users', {
        name,
        email,
        password,
      });
      return response.data;
    },
    {
      onSuccess: (user) => {
        // If the registration is successful, navigate to the home page
        setUser(user);
        // Todo - set the user info in the zustand store
        navigate('/');
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || error.message);
      },
    }
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      registerUserMutation.mutate({ name, email, password });
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <div className='my-2' id='name'>
          <label>Name</label>
          <input
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='my-2' id='email'>
          <label>Email Address</label>
          <input
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='my-2' id='password'>
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='my-2' id='confirmPassword'>
          <label>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='register-button mt-3'>
          Register
        </button>

        {registerUserMutation.isLoading && <Loader />}
      </form>

      <div className='py-3'>
        <span>
          Already have an account? <Link to={`/login`}>Login</Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterScreen;
