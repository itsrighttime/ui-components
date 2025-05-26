import { ScreenType } from "../../Layout/Workspace/jsx/WorkspaceLayoutFullScreen";
import { apiCaller } from "../../utils/apiCaller";

export const login = async (setUserDetails, credentials) => {
  const successCodes = ["CGP0046"];
  // const response = await apiCaller({
  //   endpoint: "/api/login",
  //   method: "POST",
  //   body: credentials,
  // });

  setUserDetails({
    user: {
      userId: "H59SW8E",
      name: "Danishan Farookh",
      role: "OWNER",
      screenType: ScreenType.FULL_SCREEN,
    },
  });
};
