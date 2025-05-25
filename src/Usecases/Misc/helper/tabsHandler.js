import { homeIcon } from "../../../utils/icons";

const handleOnClick = (value) => {
  console.log(value);
};

export const tabsHandler = {
  // Level1 - Top
  leftTopLevel10: { onClick: handleOnClick, icon: homeIcon },
  leftTopLevel11: { onClick: handleOnClick, icon: homeIcon },
  leftTopLevel12: { onClick: handleOnClick, icon: homeIcon },
  midTopLevel10: { onClick: handleOnClick, icon: homeIcon },
  midTopLevel11: { onClick: handleOnClick, icon: homeIcon },
  midTopLevel12: { onClick: handleOnClick, icon: homeIcon },
  rightTopLevel10: { onClick: handleOnClick, icon: homeIcon },
  rightTopLevel11: { onClick: handleOnClick, icon: homeIcon },
  rightTopLevel12: { onClick: handleOnClick, icon: homeIcon },

  // Level1 - Bottom
  leftBottomLevel10: { onClick: handleOnClick, icon: homeIcon },
  leftBottomLevel11: { onClick: handleOnClick, icon: homeIcon },
  leftBottomLevel12: { onClick: handleOnClick, icon: homeIcon },
  midBottomLevel10: { onClick: handleOnClick, icon: homeIcon },
  midBottomLevel11: { onClick: handleOnClick, icon: homeIcon },
  midBottomLevel12: { onClick: handleOnClick, icon: homeIcon },
  rightBottomLevel10: { onClick: handleOnClick, icon: homeIcon },
  rightBottomLevel11: { onClick: handleOnClick, icon: homeIcon },
  rightBottomLevel12: { onClick: handleOnClick, icon: homeIcon },

  // Level1 - Left
  leftLeftLevel10: { onClick: handleOnClick, icon: homeIcon },
  leftLeftLevel11: { onClick: handleOnClick, icon: homeIcon },
  leftLeftLevel12: { onClick: handleOnClick, icon: homeIcon },
  midLeftLevel10: { onClick: handleOnClick, icon: homeIcon },
  midLeftLevel11: { onClick: handleOnClick, icon: homeIcon },
  midLeftLevel12: { onClick: handleOnClick, icon: homeIcon },
  rightLeftLevel10: { onClick: handleOnClick, icon: homeIcon },
  rightLeftLevel11: { onClick: handleOnClick, icon: homeIcon },
  rightLeftLevel12: { onClick: handleOnClick, icon: homeIcon },

  // Level1 - Right
  leftRightLevel10: { onClick: handleOnClick, icon: homeIcon },
  leftRightLevel11: { onClick: handleOnClick, icon: homeIcon },
  leftRightLevel12: { onClick: handleOnClick, icon: homeIcon },
  midRightLevel10: { onClick: handleOnClick, icon: homeIcon },
  midRightLevel11: { onClick: handleOnClick, icon: homeIcon },
  midRightLevel12: { onClick: handleOnClick, icon: homeIcon },
  rightRightLevel10: { onClick: handleOnClick, icon: homeIcon },
  rightRightLevel11: { onClick: handleOnClick, icon: homeIcon },
  rightRightLevel12: { onClick: handleOnClick, icon: homeIcon },

  // Level2 - Top
  leftTopLevel20: { onClick: handleOnClick, icon: homeIcon },
  leftTopLevel21: { onClick: handleOnClick, icon: homeIcon },
  leftTopLevel22: { onClick: handleOnClick, icon: homeIcon },
  midTopLevel20: { onClick: handleOnClick, icon: homeIcon },
  midTopLevel21: { onClick: handleOnClick, icon: homeIcon },
  midTopLevel22: { onClick: handleOnClick, icon: homeIcon },
  rightTopLevel20: { onClick: handleOnClick, icon: homeIcon },
  rightTopLevel21: { onClick: handleOnClick, icon: homeIcon },
  rightTopLevel22: { onClick: handleOnClick, icon: homeIcon },

  // Level2 - Bottom
  leftBottomLevel20: { onClick: handleOnClick, icon: homeIcon },
  leftBottomLevel21: { onClick: handleOnClick, icon: homeIcon },
  leftBottomLevel22: { onClick: handleOnClick, icon: homeIcon },
  midBottomLevel20: { onClick: handleOnClick, icon: homeIcon },
  midBottomLevel21: { onClick: handleOnClick, icon: homeIcon },
  midBottomLevel22: { onClick: handleOnClick, icon: homeIcon },
  rightBottomLevel20: { onClick: handleOnClick, icon: homeIcon },
  rightBottomLevel21: { onClick: handleOnClick, icon: homeIcon },
  rightBottomLevel22: { onClick: handleOnClick, icon: homeIcon },

  // Level2 - Left
  leftLeftLevel20: { onClick: handleOnClick, icon: homeIcon },
  leftLeftLevel21: { onClick: handleOnClick, icon: homeIcon },
  leftLeftLevel22: { onClick: handleOnClick, icon: homeIcon },
  midLeftLevel20: { onClick: handleOnClick, icon: homeIcon },
  midLeftLevel21: { onClick: handleOnClick, icon: homeIcon },
  midLeftLevel22: { onClick: handleOnClick, icon: homeIcon },
  rightLeftLevel20: { onClick: handleOnClick, icon: homeIcon },
  rightLeftLevel21: { onClick: handleOnClick, icon: homeIcon },
  rightLeftLevel22: { onClick: handleOnClick, icon: homeIcon },

  // Level2 - Right
  leftRightLevel20: { onClick: handleOnClick, icon: homeIcon },
  leftRightLevel21: { onClick: handleOnClick, icon: homeIcon },
  leftRightLevel22: { onClick: handleOnClick, icon: homeIcon },
  midRightLevel20: { onClick: handleOnClick, icon: homeIcon },
  midRightLevel21: { onClick: handleOnClick, icon: homeIcon },
  midRightLevel22: { onClick: handleOnClick, icon: homeIcon },
  rightRightLevel20: { onClick: handleOnClick, icon: homeIcon },
  rightRightLevel21: { onClick: handleOnClick, icon: homeIcon },
  rightRightLevel22: { onClick: handleOnClick, icon: homeIcon },
};

export const getTabDetails = (key) => {
  return tabsHandler[key];
};
