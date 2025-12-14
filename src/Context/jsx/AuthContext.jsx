import React, { createContext, useState, useEffect } from "react";
import { login } from "../helper/login.js";
import { logout } from "../helper/logout.js";
import { checkSession } from "../helper/checkSession.js";
import { useNavigate } from "react-router-dom";

/**
 * AuthContext
 *
 * React Context responsible for managing authentication state
 * and exposing auth-related actions across the application.
 *
 * Provides:
 * - Logged-in user details
 * - Login and logout handlers
 * - Session loading state
 *
 * @context
 */
const AuthContext = createContext();

/**
 * AuthProvider Component
 *
 * Wraps the application and provides authentication state
 * and actions via `AuthContext`.
 *
 * On mount, it automatically checks for an existing user session
 * and updates the authentication state accordingly.
 *
 * Designed to support multi-workspace authentication flows.
 *
 * @component
 *
 * @param {Object} props - Component props
 *
 * @param {React.ReactNode} props.children
 * Child components that require access to authentication state.
 *
 * @param {string} props.workspace
 * Identifier for the active workspace used during authentication
 * (e.g., DEV, WorkSpace, DevAssemble).
 *
 * @returns {JSX.Element} Auth context provider wrapper
 *
 * @example
 * <AuthProvider workspace="WorkSpace">
 *   <App />
 * </AuthProvider>
 */
export const AuthProvider = ({ children, workspace }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (credentials) =>
    await login({ setUserDetails, credentials, navigate, workspace });
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

/**
 * useAuth Hook
 *
 * Custom hook for accessing authentication state and actions
 * from `AuthContext`.
 *
 * @returns {Object} Auth context value
 *
 * @property {Object|null} userDetails
 * Currently authenticated user information, or `null` if not logged in.
 *
 * @property {Function} handleLogin
 * Triggers the login flow using provided credentials.
 *
 * @property {Function} handleLogout
 * Logs out the current user and clears authentication state.
 *
 * @property {boolean} loading
 * Indicates whether the authentication session check is in progress.
 *
 * @example
 * const { userDetails, handleLogin, handleLogout, loading } = useAuth();
 */
export const useAuth = () => React.useContext(AuthContext);
