import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useStore } from '../state/store.js';
import { logoutUser } from '../services/api.js';

const Header = () => {
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  const logoutMutation = useMutation(
    async () => {
      const response = await logoutUser(); // <-- Change this line
      return response;
    },
    {
      onSuccess: () => {
        setUser(null);
        navigate('/login');
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  const logoutHandler = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link className="navbar-item" to={`/`}>MERN Auth</Link>
        </div>
        <div className="navbar-menu">
          {user ? (
            <>
              <div className="navbar-dropdown">
                <button className="navbar-item">{user.name}</button>
                <div className="navbar-dropdown-menu">
                  <Link to="/profile" className="navbar-item">Profile</Link>
                  <button onClick={logoutHandler} className="navbar-item">Logout</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link className="navbar-item" to={`/login`}>Sign In</Link>
              <Link className="navbar-item" to={`/register`}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
