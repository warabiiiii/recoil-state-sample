import { useRecoilCallback } from "recoil";
import { accountApi } from "../../infrastructure/accountApi";
import { accountAtom } from "./atoms";

export const useRefreshAccount = () =>
  useRecoilCallback(
    ({ set }) =>
      async () => {
        set(accountAtom, (v) => ({ ...v, isLoading: true }));

        const accountResult = await accountApi.get();

        if (accountResult.isSuccess) {
          set(accountAtom, (v) => ({
            ...v,
            isLoading: false,
            account: accountResult.value,
          }));
        } else {
          set(accountAtom, (v) => ({
            ...v,
            isLoading: false,
            account: null,
          }));
        }
      },
    [],
  );
