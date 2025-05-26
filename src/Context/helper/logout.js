import { apiCaller } from "../../utils/apiCaller";

export const logout = async (setUserDetails, navigate) => {
  // const response = await apiCaller({
  //   endpoint: "/auth-api/logout",
  // });

  setUserDetails(null); // Clear user data
  navigate("/");
};
