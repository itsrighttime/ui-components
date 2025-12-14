"use client";

import { makeUrl } from "../../Layout/Workspace/helper/urlFormatter.js";
import { workspaceLayoutKeys } from "../../Layout/Workspace/helper/workspaceLayoutKeys.js";
import { ScreenType } from "../../Layout/Workspace/jsx/WorkspaceLayoutWrapper.jsx";
import { apiCaller } from "../../utils/apiCaller.js";
const { LEVELS, ZONES, POSITIONS } = workspaceLayoutKeys;

export const login = async ({
  setUserDetails,
  credentials,
  navigate,
  workspace,
}) => {
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

  navigate(
    makeUrl(
      {
        level: LEVELS.primary,
        zone: ZONES.commandBar,
        position: POSITIONS.start,
        workspaceId: workspace,
        key: workspace,
      },
      true
    )
  );
};
