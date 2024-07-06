import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./anime-page.css";
import Nav from "../../components/Nav/Nav";
import { ThemeContext, UserContext } from "../../App";
import { animePageAPi } from "../../api/anime-page";
import Select2 from "../../components/Select/Select2";
import {
  DeleteFromFavoriteAPI,
  addToFavoriteAPI,
  CheckFavoriteAPI,
} from "../../api/favorites";
import Comments2 from "../../components/Comments/Comments2";

export default function AnimePage() {
  const [anime, setAnimes] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(false);
  const [status, setStatus] = useState("");
  const params = useParams();
  const context = useContext(ThemeContext);
  const userContext = useContext(UserContext);

  async function getFavotire() {
    const data = await CheckFavoriteAPI(params);
    setIsAddedToFavorite(data[0].Favorits);
    if (data[1].wathcingCondition) {
      setStatus(data[1].wathcingCondition.status);
    }
  }

  useEffect(() => {
    if (userContext.user == null) {
      setIsAddedToFavorite(false);
      return;
    } else {
      getFavotire();
    }
  }, [userContext]);

  async function getAnimes() {
    const data = await animePageAPi(params);
    setAnimes(data);
    setIsLoading(false);
  }

  async function AddToFavorite() {
    const data = await addToFavoriteAPI(params.Id);
    setIsAddedToFavorite(true);
  }

  async function DeleteFromFavorite() {
    const data = await DeleteFromFavoriteAPI(params.Id);
    setIsAddedToFavorite(false);
  }

  useEffect(() => {
    getAnimes();
  }, []);

  const mainCharacters = anime?.characterRoles.filter((character) => {
    if (character.rolesRu[0] === "Main") {
      return true;
    } else {
      return false;
    }
  });

  if (isLoading)
    return (
      <>
        <Nav />
        <div className="container-dark container-padding-top">
          <div className="main">
            <h1>Loading.....</h1>
          </div>
        </div>
      </>
    );
  return (
    <>
      <Nav />
      <div
        className={
          context.theme === "dark" ? "container-dark container-padding-top" : "container-light container-padding-top"
        }
      >
        <div className="main">
          <div className="AnimePagePosterDiv">
            <img
              className="AnimePagePoster"
              src={anime.poster.mainUrl}
              alt=""
            />
            <div className="AnimeOption">
              <Select2 status={status} />
              <img
                onClick={isAddedToFavorite ? DeleteFromFavorite : AddToFavorite}
                className="AnimePageAddToFavorite"
                src={
                  isAddedToFavorite
                    ? "http://localhost:3000/images\\Ability_Caressing_Moonlight.png"
                    : "https://hsr.keqingmains.com/wp-content/uploads/2023/08/Ability_Caressing_Moonlight.webp"
                }
                alt=""
              />
            </div>
          </div>
          <div className="animePagedescriptionDiv">
            <h1 className="AnimePageName">{anime.russian}</h1>
            <p className="AnimePageDesctiprion">{anime.description}</p>
            <div className="AnimePageGenreList">
              {anime.genres.map((genre) => (
                <Link key={genre.name} id={genre.id} className="AnimePageGenre">
                  {genre.russian}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="AnimePageScreenShoots">
          <img
            className="AnimeScreenShoot"
            src={anime.screenshots[0].originalUrl}
            alt=""
          />
          <img
            className="AnimeScreenShoot"
            src={anime.screenshots[1].originalUrl}
            alt=""
          />
          <img
            className="AnimeScreenShoot"
            src={anime.screenshots[2].originalUrl}
            alt=""
          />
        </div>
        <div className="AnimePageCharacterDiv">
          {mainCharacters.map((character) => (
            <Link
              to={`/character/${character.character.id}`}
              key={character.character.id}
              id={character.character.id}
              className="AnimePageCharacterLink"
            >
              <h2>{character.character.name}</h2>
              <img src={character.character.poster.mainUrl} alt="" />
            </Link>
          ))}
        </div>
        <Comments2 />
      </div>
    </>
  );
}
