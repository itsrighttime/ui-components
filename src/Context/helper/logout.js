import { apiCaller } from "../../utils/apiCaller.js";

export const logout = async (setUserDetails, navigate) => {
  // const response = await apiCaller({
  //   endpoint: "/auth-api/logout",
  // });

  setUserDetails(null); // Clear user data
  navigate("/login");
};
