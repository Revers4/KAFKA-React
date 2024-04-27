import React, { useState, useEffect, useContext } from "react";
import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./AnimeHome.css";
import Nav from "../Nav/Nav";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { genres } from "../../genre-list";
import Select from "./SelectGenre";
import { ThemeContext } from "../../App";

export default function AnimeHome() {
  const context = useContext(ThemeContext);
  const [animes, setAnimes] = useState([]);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getAnimes(1, "clean");
  }, [params]);
  // @parameter1 {page} - page number
  // @parameter2 {type} - 1 clean (clear animes array and insert new data in setAnime)
  //                    - 2 next (add to the existing animes array in setAnime)

  async function getAnimes(page, type) {
    const genre = params.get("genre") || "";
    const search = params.get("search") || "";
    if (type == "clean") {
      setAnimes([]);
    }
    const body = {
      query: `{
        animes(page: ${page}, limit: 12, order: popularity, search: "${search}") {
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
    if (resBody?.data.animes.length === 0) {
      setHasMore(false);
      return;
    }

    if (type === "clean") {
      setAnimes(resBody.data.animes);
    } else {
      setAnimes((prevList) => [...prevList, ...resBody.data.animes]);
    }
  }

  return (
    <>
      <Nav />
      <div className="container">
        <h1>Anime list</h1>
        <div>
          {/* <Select
            genreProp={filter.genre}
            setGenreProp={(val) => setFilter((prev) => ({ ...prev, genre: val }))}
          /> */}
        </div>
        <InfiniteScroll
          dataLength={animes.length}
          next={() => {
            setPage((prevPage) => {
              const newPage = prevPage + 1;
              getAnimes(newPage, "next");
              return newPage;
            });
          }}
          hasMore={hasMore}
          scrollThreshold={"200px"}
          className="animeList"
          loader={Array.from(Array(6).keys()).map((number) => (
            <div key={number}>
              <SkeletonTheme baseColor="pink" highlightColor="purple">
                <Skeleton
                  style={{ marginBottom: "10px" }}
                  width={225}
                  height={25}
                />
                <Skeleton width={225} height={320} />
              </SkeletonTheme>
            </div>
          ))}
        >
          {animes.map((anime) => (
            <Link key={anime.id} to={`/anime/${anime.id}`}>
              <h2>{anime.english}</h2>
              <img loading="eager" src={anime.poster.mainUrl} alt="404" />
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
