"use client";

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Context/jsx/AuthContext.jsx";
import { Loading } from "../../../SpecialPages/js/Loading.jsx";

export const ProtectedRoutes = ({ children }) => {
  const { userDetails } = useAuth();

  const [authState, setAuthState] = useState({
    loading: true,
    authorized: false,
  });

  useEffect(() => {
    const checkAuthorization = () => {
      if (userDetails) {
        setAuthState({ loading: false, authorized: true });
      } else {
        setAuthState({ loading: false, authorized: false });
      }
    };

    // Call the authorization logic
    checkAuthorization();
  }, [userDetails]);

  if (authState.loading) {
    return <Loading />;
  }

  if (!authState.authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
