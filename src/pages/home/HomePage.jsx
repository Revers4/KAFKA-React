import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./home-page.css";
import Nav from "../../components/Nav/Nav";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Selectt from "../../components/Select/Select";
import { searchAnimesAPI } from "../../api/search-animes";

export default function AnimeHome() {
  const [animes, setAnimes] = useState([]);
  const [params, setParams] = useSearchParams();
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
    const data = await searchAnimesAPI(page, search, genre);

    if (data.length === 0) {
      setHasMore(false);
    } else {
      if (type === "clean") {
        setHasMore(true);
        setAnimes(data);
      } else {
        setHasMore(true);
        setAnimes((prevList) => [...prevList, ...data]);
      }
    }
  }

  return (
    <>
      <Nav />
      <div className="container">
        <Selectt />
        <InfiniteScroll
          dataLength={animes.length}
          hasMore={hasMore}
          next={() => {
            setPage((prevPage) => {
              const newPage = prevPage + 1;
              getAnimes(newPage, "next");
              return newPage;
            });
          }}
          scrollThreshold={"200px"}
          className="animeList"
          loader={Array.from(Array(6).keys()).map((number) => (
            <div key={number}>
              <SkeletonTheme baseColor="pink" highlightColor="purple">
                <Skeleton width={300} height={400} />
                <Skeleton width={300} height={40} />
              </SkeletonTheme>
            </div>
          ))}
        >
          {animes.map((anime) => (
            <Link
              className="HomePageLink"
              key={anime.id}
              to={`/anime/${anime.id}`}
            >
              <h2 className="HomePageName">{anime.english}</h2>
              <img
                className="HomePagePoster"
                src={anime.poster.mainUrl}
                alt="404"
              />
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}
