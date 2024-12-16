import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    username: '',
    wallets: [],
    isLoggedIn: false,
    token: '',
  });

  const handleLoginResult = (loginResult) => {
    const { token, user } = loginResult; 
    if (token && user) {
      setUser({
        id: user.id,
        username: user.name,
        wallets: user.wallets,
        isLoggedIn: true,
        token: token,
      });
    } else {
      setUser({
        id: '',
        username: '',
        wallets: [],
        isLoggedIn: false,
        token: '',
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleLoginResult }}>
      {children}
    </UserContext.Provider>
  );
};
