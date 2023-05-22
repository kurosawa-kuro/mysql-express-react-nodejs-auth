import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <a href="/" className="navbar-item">MERN Auth</a>
        </div>
        <div className="navbar-menu">
          {userInfo ? (
            <>
              <div className="navbar-dropdown">
                <button className="navbar-item">{userInfo.name}</button>
                <div className="navbar-dropdown-menu">
                  <a href="/profile" className="navbar-item">Profile</a>
                  <button onClick={logoutHandler} className="navbar-item">Logout</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <a href="/login" className="navbar-item">Sign In</a>
              <a href="/register" className="navbar-item">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
