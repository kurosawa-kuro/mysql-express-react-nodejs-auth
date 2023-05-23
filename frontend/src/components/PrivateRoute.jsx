// frontend\src\components\PrivateRoute.jsx

import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../state/store.js';

const PrivateRoute = () => {
  const { user } = useStore();
  return user ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;