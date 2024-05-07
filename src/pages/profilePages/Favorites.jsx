import Nav from "../../components/Nav/Nav";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfNavBar from "../../components/ProfNavBar/ProfNavBar";
import {
  getFavotireAPI,
  getFavoriteAnimeAPI,
  getFavotiresAPI,
} from "../../api/favorites";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./Favorite.css";
import { Favorite } from "./Favorite";

function Wait({ isLoading }) {
  return isLoading
    ? Array.from(Array(6).keys()).map((number) => (
        <div key={number}>
          <SkeletonTheme baseColor="pink" highlightColor="purple">
            <Skeleton width={180} height={40} />
            <br />
            <Skeleton width={180} height={200} />
          </SkeletonTheme>
        </div>
      ))
    : null;
}

export default function Favorites() {
  const [isLoading1, setIsLoading1] = useState(true);
  const [type, setType] = useState("Избранное");
  const [fAnimes, setFAnimes] = useState([]);
  const [favoritePage, setFavoritePage] = useState(1);
  const [modal, setModal] = useState(true);
  const params = useParams();
  const page = 2;

  async function getFavorite() {
    setIsLoading1(true);
    const data = await getFavotireAPI(params.Login);
    if (!data) {
      setFAnimes([]);
      return;
    }
    const dataId = data.map((e) => {
      return e.id;
    });
    const fAnime = await getFavoriteAnimeAPI(dataId, 9, favoritePage);
    if (fAnimes.length !== 0) {
      setFAnimes((prevData) => [...prevData, ...fAnime]);
      setIsLoading1(false);
    } else {
      setFAnimes(fAnime);
    }
    setFavoritePage((prevPage) => prevPage + 1);
  }

  async function getFavotires() {
    // const data = await getFavotiresAPI(params.Login);
    // console.log(data, "data");
  }

  useEffect(() => {
    getFavorite().then(() => {
      setIsLoading1(false);
    });
  }, [params.Login]);

  useEffect(() => {
    getFavotires();
  }, []);

  return (
    <>
      <Nav />
      <div className="container-dark">
        <ProfNavBar page={page} params={params} />
        <div className="FavoriteMainDiv">
          <div className="Fdiv">
            <span onClick={() => setModal((prev) => !prev)}>{type}</span>
            <div className={modal ? "FavoriteModal active" : "FavoriteModal"}>
              <ul>
                <li>Избранное</li>
                <li>Смотрю</li>
                <li>Буду смотреть</li>
                <li>Просмотренно</li>
                <li>Забросил</li>
                <li>Мусор</li>
              </ul>
            </div>
          </div>
          <div className="FavouritesDiv">
            {fAnimes.map((anime) => (
              <Favorite key={anime.id} anime={anime} />
            ))}
            {<Wait isLoading={isLoading1} />}
            <div>
              {isLoading1 ? null : <button onClick={getFavorite}>Ещё</button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
