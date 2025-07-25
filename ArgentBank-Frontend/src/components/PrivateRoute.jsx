import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const tokenFromRedux = useSelector((state) => state.auth.token);
  const tokenFromStorage = localStorage.getItem('token') || sessionStorage.getItem('token');
  const token = tokenFromRedux || tokenFromStorage;

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

export default PrivateRoute;
