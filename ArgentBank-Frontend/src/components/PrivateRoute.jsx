import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const token = useSelector(state => state.auth.token);

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

export default PrivateRoute;
