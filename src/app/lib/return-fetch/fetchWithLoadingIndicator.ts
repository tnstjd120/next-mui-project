import returnFetch from "return-fetch";
import type { ReturnFetch } from "return-fetch";

const fetchWithLoadingIndicator: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      request: async (args) => {
        // loading = true
        return args;
      },
      response: async (response) => {
        // loading = false
        return response;
      },
    },
  });
