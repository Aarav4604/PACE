import React, { createContext, useState, useContext } from 'react';

export type UserType = {
  name: string;
  balance: number;
  balanceGain: number;
  gainPct: number;
  phone: string;
  email: string;
  broker: string;
};

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const defaultUser: UserType = {
  name: 'NAME',
  balance: 10000,
  balanceGain: 250,
  gainPct: 2.5,
  phone: '+1 555-555-5555',
  email: 'user@email.com',
  broker: 'Robinhood',
};

export const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType>(defaultUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 