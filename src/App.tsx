import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useRefreshAccount } from "./modules/account/operations";
import { accountUiState } from "./modules/account/selectors";

export const App = () => {
  const refreshAccount = useRefreshAccount();

  useEffect(() => {
    refreshAccount();
  }, [refreshAccount]);

  const account = useRecoilValue(accountUiState);
  switch (account.status) {
    case "Loading": {
      return <div>Loading...</div>;
    }
    case "ShowError": {
      return <div>Error: {account.error.message}</div>;
    }
    case "NotLoggedIn": {
      return (
        <button
          onClick={() => {
            // SignIn
          }}
        >
          SignIn
        </button>
      );
    }
    case "LoggedIn": {
      return <div>name: {account.account.name}</div>;
    }
  }
};
