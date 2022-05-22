import { act, renderHook } from "@testing-library/react-hooks";
import { RecoilRoot, useRecoilValue } from "recoil";

import { accountApi } from "../../infrastructure/accountApi";

import { accountAtom } from "./atoms";
import { useRefreshAccount } from "./operations";
import { AccountAtom } from "./types";

jest.mock("../../infrastructure/accountApi");

const isSuccess = <T,>(v: T | Error): v is T => {
  if (v instanceof Error) {
    throw v;
  }
  return true;
};

const renderRecoilHooks = (initialValue: AccountAtom) =>
  renderHook(
    () => ({
      refreshAccount: useRefreshAccount(),
      atom: useRecoilValue(accountAtom),
    }),
    {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(accountAtom, initialValue);
          }}
        >
          {children}p
        </RecoilRoot>
      ),
    },
  );

describe("AccountOperations", () => {
  test("refreshAccount success", async () => {
    /* mock setup  */
    (
      accountApi.get as jest.Mock<ReturnType<typeof accountApi.get>>
    ).mockResolvedValueOnce({
      isSuccess: true,
      value: { id: "testId", name: "test" },
    });

    /* Recoilのsetup */
    const initialValue: AccountAtom = {
      isLoading: false,
      account: null,
      error: null,
    };
    const { result } = renderRecoilHooks(initialValue);

    await act(async () => {
      /* operation実行 */
      await result.current.refreshAccount();

      /* 結果の判定 */
      const all = result.all.filter(isSuccess);

      expect(all.length).toBe(3);

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
    /* mock setup  */
    (
      accountApi.get as jest.Mock<ReturnType<typeof accountApi.get>>
    ).mockResolvedValueOnce({
      isSuccess: false,
      value: null,
    });

    /* Recoilのsetup */
    const initialValue: AccountAtom = {
      isLoading: false,
      account: null,
      error: null,
    };
    const { result } = renderRecoilHooks(initialValue);

    await act(async () => {
      /* operation実行 */
      await result.current.refreshAccount();

      /* 結果の判定 */
      const all = result.all.filter(isSuccess);

      expect(all.length).toBe(3);

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
