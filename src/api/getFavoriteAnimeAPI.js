export async function getFavoriteAnimeAPI(dataId) {
  const body = {
    query: `{
              animes(ids: "${dataId}", limit: 5) {
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
              characterRoles {
                rolesRu
                character {
                id
                isAnime
                isManga
                isRanobe
                malId
                russian
                synonyms
                updatedAt
                url
                japanese
                poster {
                    main2xUrl
                    mainUrl
                    originalUrl
                }
                name
              }
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
