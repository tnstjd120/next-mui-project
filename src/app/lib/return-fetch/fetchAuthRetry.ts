import { API_PATH } from "@/app/api/API_PATH";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import returnFetch, { ReturnFetch } from "return-fetch";

export const fetchAuthRetry: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      response: async (response, requestArgs, fetch) => {
        if (response.status !== 401) return response;

        console.log("not authorized, trying to get refreshToken..");

        const session = await auth();

        if (!session) throw Error("faild to undfined session");

        const { PATH, METHOD } = API_PATH.USERS.REFRESH_TOKEN_RETRY;
        const responseSilentRefresh = await fetch(PATH, {
          method: METHOD,
          body: JSON.stringify({
            userId: session?.user?.userId,
            refreshToken: session?.user?.refreshToken,
          }),
        });

        if (![200, 201].includes(responseSilentRefresh.status))
          throw Error("faild to refresh token");

        const { accessToken, refreshToken } =
          await responseSilentRefresh.json();

        const cookieStore = cookies();
        cookieStore.set("accessToken", accessToken);
        cookieStore.set("refreshToken", refreshToken);

        console.log("requestArgs ==> ", requestArgs);

        return fetch(...requestArgs);
      },
    },
  });
