import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const jwtToken = Cookies.get('token');
    if (jwtToken) {
      setToken(jwtToken);
      setUserInfo(jwt_decode(jwtToken));
    }
  }, [token]);

  const logout = () => {
    Cookies.remove('token');
    setToken('');
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
