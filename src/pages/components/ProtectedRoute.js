import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import Spinner from './Spinner';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const [fakeLoading, setFakeLoading] = useState(true);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !fakeLoading) {
      if (!user) {
        const logoutFlag = sessionStorage.getItem("logout");

        if (!logoutFlag) {
          Swal.fire({
            icon: 'warning',
            title: 'Acceso restringido',
            text: 'Debes iniciar sesión para acceder a esta página.',
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          sessionStorage.removeItem("logout");
        }

        setRedirect(<Navigate to="/" replace />);
      }
    }
  }, [loading, fakeLoading, user]);

  if (loading || fakeLoading) {
    return <Spinner />;
  }

  if (redirect) {
    return redirect;
  }

  return children;
}

export default ProtectedRoute;
