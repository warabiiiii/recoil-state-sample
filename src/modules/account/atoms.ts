import { atom } from "recoil";
import { AccountAtom } from "./types";

export const accountAtom = atom<AccountAtom>({
  key: "account",
  default: {
    isLoading: false,
    account: null,
    error: null,
  },
});
