// frontend\src\screens\LoginScreen.jsx

// External Packages
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Internal Modules
import { useUserStore, useFlashMessageStore } from '../../state/store.js';
import { loginUserApi } from '../../services/api.js';
import { Loader } from '../../components/Loader';

const LoginScreen = () => {
  // Navigation
  const navigate = useNavigate();

  // Component State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Global State
  const { setUser } = useUserStore();
  const { setFlashMessage } = useFlashMessageStore();

  // API Mutation
  const loginUserApiMutation = useMutation(
    async ({ email, password }) => {
      const user = await loginUserApi({ email, password });
      return user;
    },
    {
      onSuccess: (user) => {
        setUser(user);
        setFlashMessage("User login successful!");
        navigate('/');
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || error.message);
      },
    }
  );

  // Form Handler
  const submitHandler = (e) => {
    e.preventDefault();
    loginUserApiMutation.mutate({ email, password });
  };

  // Component JSX
  return (
    <div className="form-container">
      <h1>Sign In</h1>

      <form onSubmit={submitHandler}>
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

        <button
          disabled={loginUserApiMutation.isLoading}
          type='submit'
          className='register-button mt-3'
        >
          Sign In
        </button>
      </form>

      {loginUserApiMutation.isLoading && <Loader />}

      <div className='py-3'>
        New Customer? <Link to='/register'>Register</Link>
      </div>
    </div>
  );
};

export default LoginScreen;
