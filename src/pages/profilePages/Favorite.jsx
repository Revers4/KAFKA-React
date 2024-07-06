import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DeleteFromFavoriteAPI, addToFavoriteAPI, addToWAPI } from "../../api/favorites";
import { UserContext } from "../../App";

export function Favorite({ anime, params, type }) {
  const [isAdded, setIsAdded] = useState(true);
  const userContext = useContext(UserContext)
  // console.log(type.endPoint)

  async function AddToFavorite() {
    if (type.endPoint == "favorite") {
      await addToFavoriteAPI(anime.id);
      setIsAdded(true);
    } else {
      setIsAdded(true);
      await addToWAPI(anime.id, type.endPoint)
    }
  }

  async function DeleteFromFavorite() {
    if (type.endPoint == "favorite") {
      await DeleteFromFavoriteAPI(anime.id);
      setIsAdded(false);
    } else {
      setIsAdded(false);
      await addToWAPI(anime.id, "remove")
    }
  }

  return (
    <div className="FavouriteDiv">
      <Link to={`/anime/${anime.id}`}>
        <h2 className="CarouselName">{anime.russian}</h2>
        <img className="CarouselPoster" src={anime.poster.mainUrl} alt="404" />
      </Link>
      {userContext ? (userContext.user.login == params ? <img
        className="ProfilePageAddToFavorite"
        onClick={isAdded ? DeleteFromFavorite : AddToFavorite}
        src={
          isAdded
            ? "http://localhost:3000/images/Ability_Caressing_Moonlight.png"
            : "https://hsr.keqingmains.com/wp-content/uploads/2023/08/Ability_Caressing_Moonlight.webp"
        }
        alt=""
      /> : null) : null}
    </div>
  );
}
