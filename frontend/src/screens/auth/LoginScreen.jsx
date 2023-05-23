// frontend\src\screens\LoginScreen.jsx

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '../../components/Loader';
import { useUserStore, useFlashMessageStore } from '../../state/store.js';
import { loginUser } from '../../services/api.js';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useUserStore();

  const { setFlashMessage } = useFlashMessageStore();
  const navigate = useNavigate();

  const loginUserMutation = useMutation(
    async ({ email, password }) => {
      const user = await loginUser({ email, password });
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

  const submitHandler = (e) => {
    e.preventDefault();
    loginUserMutation.mutate({ email, password });
  };

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
          disabled={loginUserMutation.isLoading}
          type='submit'
          className='register-button mt-3'
        >
          Sign In
        </button>
      </form>

      {loginUserMutation.isLoading && <Loader />}

      <div className='py-3'>
        New Customer? <Link to='/register'>Register</Link>
      </div>
    </div>
  );
};

export default LoginScreen;
