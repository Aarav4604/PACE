import React, { createContext, useState, useContext } from 'react';

export interface UserData {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  setUser: (u: UserData) => void;
}

export const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  user: null,
  setUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 