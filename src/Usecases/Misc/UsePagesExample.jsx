import { ErrorPage } from "../../SpecialPages/js/ErrorPage";
import { Loading } from "../../SpecialPages/js/Loading.jsx";
import { LoadingChat } from "../../SpecialPages/js/LoadingChat.jsx";

export const UsePagesExample = () => {
  return (
    <div>
      <ErrorPage />
      <Loading />
      <LoadingChat />
    </div>
  );
};
