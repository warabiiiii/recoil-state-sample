import { selector } from "recoil";
import { accountAtom } from "./atoms";
import { AccountUiState } from "./types";

export const accountUiState = selector<AccountUiState>({
  key: "accountUiState",
  get: ({ get }) => {
    const { account, isLoading, error } = get(accountAtom);

    if (isLoading) {
      return { status: "Loading" };
    }

    if (error) {
      return { status: "ShowError", error: error };
    }

    if (account) {
      return { status: "LoggedIn", account: account };
    }

    return { status: "NotLoggedIn" };
  },
});
