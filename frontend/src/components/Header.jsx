import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useStore } from '../state/store.js';

const Header = () => {
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  // const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      setUser(null);  // Update the user state to null on logout
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
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
