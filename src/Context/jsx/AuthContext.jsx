import React, { createContext, useState, useEffect } from "react";
import { login } from "../helper/login";
import { logout } from "../helper/logout";
import { checkSession } from "../helper/checkSession";
import { useNavigate } from "react-router-dom";

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (credentials) =>
    await login(setUserDetails, credentials);
  const handleLogout = async () => {
    console.log("Logging out...");
    logout(setUserDetails, navigate);
  };

  // Check session on mount
  useEffect(() => {
    checkSession(setUserDetails, setLoading);
  }, []);

  return (
    <AuthContext.Provider
      value={{ userDetails, handleLogin, handleLogout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
