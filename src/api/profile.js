export async function getProfileAPI() {
  const res = await fetch("http://localhost:3000/profile", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Requset failed");
  }
  const data = await res.json();
  return data;
}

export async function getProfileeAPI(login) {
  const response = await fetch("http://localhost:3000/profilee", {
    body: JSON.stringify({
      login: login,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const responseData = false;
    return responseData;
  }
}
export async function changeProfileAPI(username) {
  const res = await fetch("http://localhost:3000/profile", {
    body: JSON.stringify({
      login: username,
    }),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json("AAAAAA");
    return data;
  }
  const data = await res.json();
  return data;
}
