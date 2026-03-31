import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '@/lib/storage';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  
  // Check if the guest name exists via our central helper
  const isAuth = isAuthenticated();

  if (!isAuth) {
    // Redirect them to the Welcome page, saving the attempted location
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;