import { getProductLogo, IMAGE_ASSETS_KEYS } from "../../../assets/productsLogo/productLogo.assets";
import { LoginForm } from "../../../Auth/js/LoginForm";
import { useAuth } from "../../../Context/jsx/AuthContext";

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
