// frontend\src\screens\ProfileScreen.jsx

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Loader } from '../../components/Loader';
import { useUserStore } from '../../state/store.js';
import { fetchUserProfile, updateUserProfile } from '../../services/api.js';



const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { user, setUser } = useUserStore();
  const { data: userProfile, isLoading } = useQuery(['userProfile'], fetchUserProfile);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setEmail(userProfile.email);
    }
  }, [userProfile]);

  const updateUserMutation = useMutation(
    async ({ name, email, password }) => {
      const updatedUser = await updateUserProfile({ name, email, password });  // <-- Change this line
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      updateUserMutation.mutate({ id: user.id, name, email, password });
    }
  };

  if (isLoading) return <Loader />;

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