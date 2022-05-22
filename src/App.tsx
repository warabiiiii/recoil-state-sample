import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useRefreshAccount } from "./modules/account/operations";
import { accountUiState } from "./modules/account/selectors";

export const App = () => {
  const refreshAccount = useRefreshAccount();

  useEffect(() => {
    refreshAccount();
  }, [refreshAccount]);

  const value = useRecoilValue(accountUiState);

  return (
    <div>
      <header>{JSON.stringify(value)}</header>
    </div>
  );
};
