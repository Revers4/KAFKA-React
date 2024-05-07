import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteFromFavoriteAPI, addToFavoriteAPI } from "../../api/favorites";

export function Favorite({ anime }) {
  const [isAdded, setIsAdded] = useState(true);

  async function AddToFavorite() {
    const data = await addToFavoriteAPI(anime.id);
    setIsAdded(true);
  }

  async function DeleteFromFavorite() {
    const data = await DeleteFromFavoriteAPI(anime.id);
    setIsAdded(false);
  }

  return (
    <div className="FavouriteDiv">
      <Link to={`/anime/${anime.id}`}>
        <h2 className="CarouselName">{anime.russian}</h2>
        <img className="CarouselPoster" src={anime.poster.mainUrl} alt="404" />
      </Link>
      <img
        className="ProfilePageAddToFavorite"
        onClick={isAdded ? DeleteFromFavorite : AddToFavorite}
        src={
          isAdded
            ? "http://localhost:3000/images/Ability_Caressing_Moonlight.png"
            : "https://hsr.keqingmains.com/wp-content/uploads/2023/08/Ability_Caressing_Moonlight.webp"
        }
        alt=""
      />
    </div>
  );
}
