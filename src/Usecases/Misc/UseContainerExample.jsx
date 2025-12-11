import { FlexContainer } from "../../Layout/Containers/jsx/FlexContainer.jsx";
import { GridContainer } from "../../Layout/Containers/jsx/GridContainer.jsx";

export const UseContainerExample = () => {
  return (
    <div>
      <FlexContainer justify="between" align="center" gap={16}>
        <div>Left</div>
        <div>Right</div>
      </FlexContainer>

      <GridContainer cols={3} gap={24}>
        <div>Item A</div>
        <div>Item B</div>
        <div>Item C</div>
      </GridContainer>
    </div>
  );
};
