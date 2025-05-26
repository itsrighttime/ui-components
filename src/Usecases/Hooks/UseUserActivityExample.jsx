import { useUserPresentOnTab } from "../../Hooks/useUserPresentOnTab";

export const UseUserActivityExample = () => {
  useUserPresentOnTab({
    onFocus: (source) => {
      console.log("User is active again:", source);
    },
    onBlur: (source) => {
      console.log("User switched away:", source);
    },
  });

  return (
    <div>
      <h1>Focus Tracking Demo</h1>
      <p>Switch tabs or applications to test it.</p>
    </div>
  );
};
