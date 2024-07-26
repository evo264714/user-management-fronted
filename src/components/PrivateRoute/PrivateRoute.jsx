import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase.config';
import { AuthContext } from '../AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [setCurrentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
