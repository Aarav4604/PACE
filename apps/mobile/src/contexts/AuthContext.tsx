import React from 'react';

export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  user?: { name: string; email: string; avatar: string } | null;
  login(email: string, pass: string): void;
  logout(): void;
}>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<{ name: string; email: string; avatar: string } | null>(null);
  const login = (email: string, pass: string) => {
    setUser({ name: 'Aarav P', email, avatar: 'https://i.pravatar.cc/100' });
  };
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 