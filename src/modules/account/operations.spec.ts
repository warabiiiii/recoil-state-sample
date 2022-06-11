import { act, renderHook } from "@testing-library/react-hooks";
import { RecoilRoot, useRecoilValue } from "recoil";

import { accountApi } from "../../infrastructure/accountApi";

import { accountAtom } from "./atoms";
import { useRefreshAccount } from "./operations";
import { AccountAtom } from "./types";

jest.mock("../../infrastructure/accountApi");

export const isNotError = <V>(v: V | Error): v is V => {
  return !(v instanceof Error);
};

const renderRecoilHooks = (initialValue: AccountAtom) =>
  renderHook(
    () => ({
      refreshAccount: useRefreshAccount(),
      atom: useRecoilValue(accountAtom),
    }),
    {
      wrapper: ({ children }: { children: React.ReactNode }) =>
        RecoilRoot({
          children,
          initializeState: ({ set }) => {
            set(accountAtom, initialValue);
          },
        }),
    },
  );

describe("AccountOperations", () => {
  test("refreshAccount success", async () => {
    (
      accountApi.get as jest.Mock<ReturnType<typeof accountApi.get>>
    ).mockResolvedValueOnce({
      isSuccess: true,
      value: { id: "testId", name: "test" },
    });

    const initialValue: AccountAtom = {
      isLoading: false,
      account: null,
      error: null,
    };
    const { result } = renderRecoilHooks(initialValue);

    await act(async () => {
      await result.current.refreshAccount();

      const all = result.all.filter(isNotError);

      const [init, loading, success] = all;

      expect(init.atom).toStrictEqual<AccountAtom>({
        isLoading: false,
        account: null,
        error: null,
      });

      expect(loading.atom).toStrictEqual<AccountAtom>({
        isLoading: true,
        account: null,
        error: null,
      });

      expect(success.atom).toStrictEqual<AccountAtom>({
        isLoading: false,
        account: { id: "testId", name: "test" },
        error: null,
      });
    });
  });

  test("refreshAccount false", async () => {
    (
      accountApi.get as jest.Mock<ReturnType<typeof accountApi.get>>
    ).mockResolvedValueOnce({
      isSuccess: false,
      value: null,
    });

    const initialValue: AccountAtom = {
      isLoading: false,
      account: null,
      error: null,
    };
    const { result } = renderRecoilHooks(initialValue);

    await act(async () => {
      await result.current.refreshAccount();

      const all = result.all.filter(isNotError);

      const [init, loading, failure] = all;

      expect(init.atom).toStrictEqual<AccountAtom>({
        isLoading: false,
        account: null,
        error: null,
      });

      expect(loading.atom).toStrictEqual<AccountAtom>({
        isLoading: true,
        account: null,
        error: null,
      });

      expect(failure.atom).toStrictEqual<AccountAtom>({
        isLoading: false,
        account: null,
        error: null,
      });
    });
  });
});
