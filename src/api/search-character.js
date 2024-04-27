export async function searchCharacterAPI(params) {
  const body = {
    query: `{
          characters(ids: ${params.Id}) {
              createdAt
              description
              descriptionHtml
              descriptionSource
              id
              isAnime
              isManga
              isRanobe
              japanese
              malId
              name
              russian
              synonyms
              updatedAt
              url
              poster {
                  originalUrl
              }
          }
      }`,
  };
  const response = await fetch("https://shikimori.one/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const responseData = await response.json();
  return responseData.data.characters[0];
}
