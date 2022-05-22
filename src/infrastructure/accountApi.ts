import { Account } from "../modules/account/types";
import { sleep } from "../util/sleep";

type Result<T, F> =
  | { isSuccess: true; value: T }
  | { isSuccess: false; value: F };

export const accountApi = {
  get: async (): Promise<Result<Account, null>> => {
    await sleep(1000);

    return {
      isSuccess: true,
      value: {
        id: "testId",
        name: "foo",
      },
    };
  },
};
