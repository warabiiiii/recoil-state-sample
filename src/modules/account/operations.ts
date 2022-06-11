import { useRecoilCallback } from "recoil";
import { accountApi } from "../../infrastructure/accountApi";
import { accountAtom } from "./atoms";

export const useRefreshAccount = () =>
  useRecoilCallback(
    ({ set }) =>
      async () => {
        set(accountAtom, (prev) => ({ ...prev, isLoading: true }));

        const accountResult = await accountApi.get();

        if (accountResult.isSuccess) {
          set(accountAtom, (prev) => ({
            ...prev,
            isLoading: false,
            account: accountResult.value,
          }));
        } else {
          set(accountAtom, (prev) => ({
            ...prev,
            isLoading: false,
            account: null,
          }));
        }
      },
    [],
  );
