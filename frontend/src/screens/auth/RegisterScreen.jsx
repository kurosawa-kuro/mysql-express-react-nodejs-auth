// frontend\src\screens\RegisterScreen.jsx

// External Packages
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Internal Modules
import { useUserStore, useFlashMessageStore } from '../../state/store.js';
import { registerUser } from '../../services/api.js';
import { Loader } from '../../components/Loader';

const RegisterScreen = () => {
  // Navigation
  const navigate = useNavigate();

  // Component State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Global State
  const { setUser } = useUserStore();
  const { setFlashMessage } = useFlashMessageStore();

  // API Mutation
  const registerUserMutation = useMutation(
    async ({ name, email, password }) => {
      const user = await registerUser({ name, email, password });
      return user;
    },
    {
      onSuccess: (user) => {
        setUser(user);
        setFlashMessage("User registration successful!");
        navigate('/');
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || error.message);
      },
    }
  );

  // Form Handler
  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      registerUserMutation.mutate({ name, email, password });
    }
  };

  // Component JSX
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
