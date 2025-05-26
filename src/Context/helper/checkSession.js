import { ScreenType } from "../../Layout/Workspace/jsx/WorkspaceLayoutFullScreen";
import { apiCaller } from "../../utils/apiCaller";

export const checkSession = async (setUserDetails, setLoading) => {
  // const response = await apiCaller({
  //   endpoint: "/auth-api/checkSession",
  // });

  setUserDetails({
    user: {
      userId: "H59SW8E",
      name: "Danishan Farookh",
      role: "OWNER",
      screenType: ScreenType.FULL_SCREEN,
    },
  });

  setLoading(false);
};
