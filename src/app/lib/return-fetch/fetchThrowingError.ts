import returnFetch from "return-fetch";
import type { ReturnFetch } from "return-fetch";

export const fetchThrowingError: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      response: async (response) => {
        if (response.status >= 400 && response.status !== 401) {
          throw await response.text().then(Error);
        }

        return response;
      },
    },
  });
