// src/App.js
import {
  DynamicProvider,
  useDynamicContext,
} from "../../Context/jsx/DynamicContext.jsx";

export const App = () => (
  <DynamicProvider>
    <ComponentA />
    <ComponentB />
  </DynamicProvider>
);

// src/components/ComponentA.js
export const ComponentA = () => {
  const { setValue } = useAppContext();

  const handleClick = () => {
    setValue("user", "Danishan");
    setValue("theme", "dark");
  };

  return <button onClick={handleClick}>Set Global Context</button>;
};

// src/components/ComponentB.js
export const ComponentB = () => {
  const { state, removeValue, resetContext } = useDynamicContext();

  return (
    <div>
      <p>User: {state.user || "Not set"}</p>
      <p>Theme: {state.theme || "Not set"}</p>
      <button onClick={() => removeValue("user")}>Remove User</button>
      <button onClick={resetContext}>Reset All</button>
    </div>
  );
};
