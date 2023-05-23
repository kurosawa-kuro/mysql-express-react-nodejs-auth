// frontend\src\screens\ProfileScreen.jsx

// External Packages
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// Internal Modules
import { useUserStore } from '../../state/store.js';
import { fetchUserProfileApi, updateUserProfileApi } from '../../services/api.js';
import { Loader } from '../../components/Loader';

const ProfileScreen = () => {
  // Component State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Global State
  const { user, setUser } = useUserStore();

  // API Query
  const { data: userProfile, isLoading } = useQuery(['userProfile'], fetchUserProfileApi);

  // Sync local state with fetched user data
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setEmail(userProfile.email);
    }
  }, [userProfile]);

  // API Mutation
  const updateUserMutation = useMutation(
    async ({ name, email, password }) => {
      const updatedUser = await updateUserProfileApi({ name, email, password });
      return updatedUser;
    },
    {
      onSuccess: (updatedUser) => {
        setUser(updatedUser);
        toast.success('Profile updated successfully');
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || error.message);
      },
    }
  );

  // Form Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      updateUserMutation.mutate({ id: user.id, name, email, password });
    }
  };

  // Loading State
  if (isLoading) return <Loader />;

  // Component JSX
  return (
    <div className="form-container">
      <h1>Update Profile</h1>

      <form onSubmit={submitHandler}>
        <div className='my-2' id='name'>
          <label>Name</label>
          <input
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className='my-2' id='email'>
          <label>Email Address</label>
          <input
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className='my-2' id='password'>
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>

        <div className='my-2' id='confirmPassword'>
          <label>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
          />
        </div>

        <button type='submit' className='submit-button mt-3'>
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileScreen;