export async function searchAnimesAPI(page, search, genre) {
  const body = {
    query: `{
        animes(page: ${page}, limit: 12, order: ranked, search: "${search}", genre: "${genre}") {
          createdAt
          description
          descriptionHtml
          descriptionSource
          duration
          english
          episodes
          episodesAired
          fandubbers
          fansubbers
          franchise
          id
          isCensored
          japanese
          kind
          licenseNameRu
          licensors
          malId
          name
          nextEpisodeAt
          rating
          russian
          score
          season
          status
          synonyms
          updatedAt
          url
          
          poster {
            id
            main2xUrl
            mainAlt2xUrl
            mainAltUrl
            mainUrl
            mini2xUrl
            miniAlt2xUrl
            miniAltUrl
            miniUrl
            originalUrl
            preview2xUrl
            previewAlt2xUrl
            previewAltUrl
            previewUrl
          }
            screenshots {
              id
              originalUrl
              x166Url
              x332Url
            }
            videos {
              id
              kind
              name
              url
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
  const resBody = await res.json();
  return resBody.data.animes;
}
