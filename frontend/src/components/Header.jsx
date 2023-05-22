import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
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

      <div className="navbar-container">
        <div className="navbar-brand">
          <Link className="navbar-item" to={`/`}>MERN Auth</Link>
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
