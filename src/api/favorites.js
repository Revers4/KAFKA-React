export async function addToFavoriteAPI(params) {
  const response = await fetch("http://localhost:3000/favorites/anime", {
    body: JSON.stringify({
      id: params.Id,
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

export async function getFavotireAPI(loginParams) {
  const res = await fetch(
    `http://localhost:3000/favorites/anime/${loginParams}`,
    {
      credentials: "include",
    }
  );
  if (!res.ok) {
    throw new Error("Requset failed");
  }
  const animeIds = await res.json();
  if (animeIds.length == 0) {
    return false;
  } else {
    return animeIds;
  }
}

export async function DeleteFromFavoriteAPI(params) {
  const response = await fetch("http://localhost:3000/favorites/anime", {
    body: JSON.stringify({
      id: params.Id,
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

export async function CheckFavoriteAPI(params) {
  const res = await fetch(
    `http://localhost:3000/favorites/anime/check/${params.Id}`,
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
  const animeIds = await res.json();
  return animeIds;
}

export async function addToWAPI(params, status) {
  const response = await fetch("http://localhost:3000/watch/anime", {
    body: JSON.stringify({
      id: params.Id,
      status: status,
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
