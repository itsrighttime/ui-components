"use client";

import {
  getProductLogo,
  IMAGE_ASSETS_KEYS,
} from "../../../assets/productsLogo/productLogo.assets.js";
import { LoginForm } from "../../../Auth/js/LoginForm.jsx";
import { useAuth } from "../../../Context/jsx/AuthContext.jsx";

export const LoginPage = ({ handleToggleFullscreen = null }) => {
  const { handleLogin } = useAuth();
  const irtLogo = getProductLogo(IMAGE_ASSETS_KEYS.itsrighttime);
  return (
    <LoginForm
      handleLogin={handleLogin}
      handleToggleFullscreen={handleToggleFullscreen}
      handleForgotId={() => {
        console.warn("Currently not Implemented");
      }}
      handleForgotPassword={() => {
        console.warn("Currently not Implemented");
      }}
      formIcon={irtLogo}
    />
  );
};
