export async function addToFavoriteAPI(params) {
  const response = await fetch("http://localhost:3000/favorites/anime", {
    body: JSON.stringify({
      id: params,
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
      id: params,
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

export async function getFavoriteAnimeAPI(dataId, limit, page) {
  const body = {
    query: `{
              animes(ids: "${dataId}", page: ${page}, limit: ${limit}) {
              english
              id
              russian
              score
              season
              url
              description
              descriptionHtml
              poster {
                  id
                  main2xUrl
                  mainAlt2xUrl
                  mainAltUrl
                  mainUrl
                  mini2xUrl
                  miniAltUrl
                  miniUrl
                  originalUrl
                  previewUrl
              }
              createdAt
              description
              genres {
                  entryType
                  id
                  kind
                  name
                  russian
              }
              duration
              screenshots {
                  id
                  originalUrl
                  x166Url
                  x332Url
              }
              airedOn {
                  date
                  day
                  month
                  year
              }
              createdAt
            }
          }
      }`,
  };
  const res = await fetch(`https://shikimori.one/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const Bbody = await res.json();
  return Bbody.data.animes;
}

export async function getFavotiresAPI(Login) {
  const res = await fetch(
    `http://localhost:3000/favorites/animes/${Login}?status=watched&page=2&limit=2`,
    {
      credentials: "include",
    }
  );
  if (!res.ok) {
    throw new Error("Requset failed");
  }
  const array = await res.json();
  return array;
}
