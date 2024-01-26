import { cookies } from "next/headers";
export const GET = () => {
  const cookieStore = cookies();

  console.log("SingOut Route.ts");

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return new Response("", {
    status: 302,
    headers: {
      "Set-Cookie": "connect.sid=;Max-Age=0",
      location: "/",
    },
  });
};
