import { cookies } from "next/headers";
import { fetchAuthRetry } from "./fetchAuthRetry";
import { fetchThrowingError } from "./fetchThrowingError";

const cookieStore = cookies();
const accessToken = cookieStore.get("accessToken");

const fetchExtended = fetchAuthRetry({
  fetch: fetchThrowingError({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
});

export default fetchExtended;
