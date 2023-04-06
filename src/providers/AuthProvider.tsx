import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useState, type FC } from 'react';

const AuthContext = React.createContext<{ isUserLogin: boolean } | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setIsUserLogin(true);
    } else {
      setIsUserLogin(false);
    }
  });

  return <AuthContext.Provider value={{ isUserLogin }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (auth == null) {
    throw Error('useAuth needs to be used inside AuthContext Provider');
  }

  return auth;
};
