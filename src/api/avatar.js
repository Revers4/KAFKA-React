import React from "react";

export const sendFile = React.useCallback(async () => {
  try {
    const data = new FormData();
    data.append("avatar", img);
    await axios
      .post("/api/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => setAvatar(res.data.path));
  } catch (error) {}
}, [img]);

export async function registerAPI(login, email, password, avatar_url) {
  const response = await fetch("http://localhost:3000/registration", {
    body: JSON.stringify({
      login: login,
      email: email,
      password: password,
      avatar_url: avatar_url,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const responseMessage = await response.text();
  alert(responseMessage);
}
