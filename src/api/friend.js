export async function sendARequestsAPI(params) {
  const response = await fetch("http://localhost:3000/friend/requests", {
    body: JSON.stringify({
      login: params.Login,
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
  }
}

export async function getRequestsAPI() {
  const res = await fetch("http://localhost:3000/friend/requests", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Requset failed");
  }
  const data = await res.json();
  return data;
}

export async function answerARequestAPI(login, condition) {
  const response = await fetch("http://localhost:3000/friend/requests/add", {
    body: JSON.stringify({
      login: login,
      condition: condition,
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
  }
}

export async function seeTheReqAPI(notSeenReqCount) {
  const response = await fetch("http://localhost:3000/friend-requests", {
    body: JSON.stringify({
      ids: notSeenReqCount,
    }),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  }
}

export async function friendsListAPI(params, limit) {
  const res = await fetch(
    `http://localhost:3000/friends-list/${params.Login}?limit=${limit}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Requset failed");
  }
  const data = await res.json();
  return data;
}

export async function removeAFriendAPI(friend_id) {
  const response = await fetch("http://localhost:3000/friend", {
    body: JSON.stringify({
      id: friend_id,
    }),
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  }
}

export async function friendDataAPI(login) {
  const res = await fetch(
    `http://localhost:3000/friend-data/${login}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Requset failed");
  }
  const data = await res.json();
  return data;
}