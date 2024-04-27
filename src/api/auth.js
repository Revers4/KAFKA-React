export async function loginAPI(email, password) {
  const res = await fetch("http://localhost:3000/login", {
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    const errorMessage = await res.json();
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
  console.log(await res.json());
  return res.ok;
}
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
export async function refreshTokenAPI() {
  const res = await fetch("http://localhost:3000/refresh-token", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Refresh token failed");
  }
  return res.ok;
}

export async function logoutAPI() {
  await fetch("http://localhost:3000/logout", {
    method: "DELETE",
    credentials: "include",
  });
}
