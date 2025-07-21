import { getProductLogo } from "../../../assets/productsLogo/productLogo.assets";
import { LoginForm } from "../../../Auth/js/LoginForm";
import { useAuth } from "../../../Context/jsx/AuthContext";
import { getIconByKey } from "./getIconByKey";

export const LoginPage = ({ handleToggleFullscreen = null }) => {
  const { handleLogin } = useAuth();
  const irtLogo = getProductLogo("itsRIGHTtime");
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
