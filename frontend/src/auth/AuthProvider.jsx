import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    //already logged in
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  //Login: Save user info and update state
  const login = (userData) => {
    setUser(userData.data.user);
    localStorage.setItem("user", JSON.stringify(userData.data.user));
  };

  // 5. Logout: Remove user info
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 6. Provide this context
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
