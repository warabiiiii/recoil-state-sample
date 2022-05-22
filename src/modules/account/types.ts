import { UiState } from "../types";

export type Account = {
  id: string;
  name: string;
};

export type AccountAtom = {
  isLoading: boolean;
  account: Account | null;
  error: Error | null;
};

export type AccountUiState = UiState<
  | { status: "Loading" }
  | { status: "LoggedIn"; account: Account }
  | { status: "NotLoggedIn" }
  | { status: "ShowError"; error: Error }
>;
