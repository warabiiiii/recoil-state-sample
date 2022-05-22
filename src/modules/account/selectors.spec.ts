import { renderHook } from "@testing-library/react-hooks";
import { RecoilRoot, useRecoilValue } from "recoil";

import { accountAtom } from "./atoms";
import { accountUiState } from "./selectors";
import { Account, AccountAtom, AccountUiState } from "./types";

const renderRecoilHooks = (initialValue: AccountAtom) =>
  renderHook(() => useRecoilValue(accountUiState), {
    wrapper: ({ children }: { children: React.ReactNode }) =>
      RecoilRoot({
        children,
        initializeState: ({ set }) => {
          set(accountAtom, initialValue);
        },
      }),
  });

describe("AccountSelectors", () => {
  test("is Loading", async () => {
    const initialValue: AccountAtom = {
      isLoading: true,
      account: null,
      error: null,
    };

    const { result } = renderRecoilHooks(initialValue);

    const expected: AccountUiState = {
      status: "Loading",
    };

    expect(result.current).toStrictEqual(expected);
  });

  test("is NotLoggedIn", async () => {
    const initialValue: AccountAtom = {
      isLoading: false,
      account: null,
      error: null,
    };

    const { result } = renderRecoilHooks(initialValue);

    const expected: AccountUiState = {
      status: "NotLoggedIn",
    };

    expect(result.current).toStrictEqual(expected);
  });

  test("is LoggedIn", async () => {
    const account: Account = {
      id: "testId",
      name: "test",
    };
    const initialValue: AccountAtom = {
      isLoading: false,
      account: account,
      error: null,
    };

    const { result } = renderRecoilHooks(initialValue);

    const expected: AccountUiState = {
      status: "LoggedIn",
      account: account,
    };

    expect(result.current).toStrictEqual(expected);
  });

  test("is ShowError", async () => {
    const error = new Error("sign in failure.");
    const initialValue: AccountAtom = {
      isLoading: false,
      account: null,
      error: error,
    };
    const { result } = renderRecoilHooks(initialValue);
    const expected: AccountUiState = {
      status: "ShowError",
      error: error,
    };
    expect(result.current).toStrictEqual(expected);
  });
});
