"use server";

import { cookies } from "next/headers";
import { FormEvent } from "react";

export const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const cookieStore = cookies();

  const formData = new FormData(e.currentTarget);

  const loginObject = {
    userId: formData.get("userId"),
    userPassword: formData.get("userPassword"),
  };

  try {
    const response = await (
      await fetch(`http://192.168.10.21:10992/api/users/login`, {
        headers: {
          // Authorization: `Bearer ${cookieStore.get("accessToken")}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify(loginObject),
      })
    ).json();

    if (response.success) {
      // cookieStore.set('accessToken', response)
    }

    console.log(response);
  } catch (error) {
    console.error(error);
  }

  return;
};
