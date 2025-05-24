import { ErrorPage } from "../../SpecialPages/js/ErrorPage";
import { Loading } from "../../SpecialPages/js/Loading";
import { LoadingChat } from "../../SpecialPages/js/LoadingChat";

export const UsePagesExample = () => {
  return (
    <div>
      <ErrorPage />
      <Loading />
      <LoadingChat />
    </div>
  );
};
