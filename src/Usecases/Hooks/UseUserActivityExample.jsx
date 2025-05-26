import { useUserActivity } from "./hooks/useUserActivity";

export const UseUserActivityExample = () => {
  useUserActivity({
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
