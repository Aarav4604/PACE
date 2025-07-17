import React from 'react';

export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  user?: { name: string; email: string; avatar: string } | null;
  login(credentials: { phone: string; password: string }): Promise<void>;
  register(userData: any): Promise<void>;
  logout(): void;
}>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<{ name: string; email: string; avatar: string } | null>(null);
  
  const login = async (credentials: { phone: string; password: string }) => {
    // Backend stub - accept password '1234'
    if (credentials.password === '1234') {
      setUser({ 
        name: 'Terry Melton', 
        email: 'melton89@gmail.com', 
        avatar: 'https://placehold.co/96x96' 
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };
  
  const register = async (userData: any) => {
    // Simulate registration
    setUser({ 
      name: userData.name || 'New User', 
      email: userData.email, 
      avatar: 'https://placehold.co/96x96' 
    });
  };
  
  const logout = () => setUser(null);
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!user, 
      user, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 