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
  const [type, setType] = useState({
    russian: "Избранное",
    endPoint: "favorite",
  });
  const [fAnimes, setFAnimes] = useState([]);
  const [favoritePage, setFavoritePage] = useState(1);
  const [modal, setModal] = useState(false);
  const params = useParams();
  const page = 2;

  async function getFavorite() {
    setIsLoading1(true);
    if (type.endPoint == "favorite") {
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
    } else {
      const data = await getFavotiresAPI(
        params.Login,
        type.endPoint,
        favoritePage
      );
      if (data.length !== 0) {
        setFAnimes((prevData) => [...prevData, ...data]);
        setIsLoading1(false);
      } else {
        setIsLoading1(false);
      }
    }
    setFavoritePage((prevPage) => prevPage + 1);
  }

  function change(type) {
    setFavoritePage(1);
    setFAnimes([]);
    setType(type);
    setModal(false);
  }

  useEffect(() => {
    getFavorite().then(() => {
      setIsLoading1(false);
    });
  }, [params.Login, type]);

  return (
    <>
      <Nav />
      <ProfNavBar page={page} params={params} />
      <div className="container-dark">
        <div className="FavoriteMainDiv">
          <div className="Fdiv">
            <p onClick={() => setModal((prev) => !prev)}>{type.russian}</p>
            <div className={modal ? "FavoriteModal active" : "FavoriteModal"}>
              <ul>
                <li
                  onClick={() =>
                    change({ russian: "Избранное", endPoint: "favorite" })
                  }
                >
                  Избранное
                </li>
                <li
                  onClick={() =>
                    change({ russian: "Смотрю", endPoint: "watching" })
                  }
                >
                  Смотрю
                </li>
                <li
                  onClick={() =>
                    change({ russian: "Буду смотреть", endPoint: "will_watch" })
                  }
                >
                  Буду смотреть
                </li>
                <li
                  onClick={() =>
                    change({ russian: "Просмотренно", endPoint: "watched" })
                  }
                >
                  Просмотренно
                </li>
                <li
                  onClick={() =>
                    change({ russian: "Забросил", endPoint: "dropped" })
                  }
                >
                  Забросил
                </li>
                <li
                  onClick={() =>
                    change({ russian: "Мусор", endPoint: "trash" })
                  }
                >
                  Мусор
                </li>
              </ul>
            </div>
          </div>
          <div className="FavouritesDiv">
            {fAnimes.map((anime) => (
              <Favorite key={anime.id} anime={anime} params={params.Login} type={type} />
            ))}
            {<Wait isLoading={isLoading1} />}
            <div className="button-28-Div">
              {isLoading1 ? null : <button className="button-28" onClick={getFavorite} role="button">Ещё</button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
