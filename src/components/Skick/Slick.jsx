import { getFavoriteAnimeAPI } from "../../api/getFavoriteAnimeAPI";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFavotireAPI } from "../../api/favorites";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";

export default function Carousel() {
  const params = useParams();
  const [loginParams, setLoginparams] = useState(params.Login || "");
  const [fAnimes, setFAnimes] = useState([]);

  async function getFavorite() {
    const data = await getFavotireAPI(loginParams);
    if (!data) {
      return;
    }
    const dataId = data.map((e) => {
      return e.id;
    });
    const fAnime = await getFavoriteAnimeAPI(dataId);
    setFAnimes(fAnime);
  }

  useEffect(() => {
    getFavorite();
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <>
      {fAnimes.length > 3 ? (
        <div className="slider-container">
          <Slider {...settings}>
            {fAnimes.map((anime) => (
              <Link className="Plate" key={anime.id} to={`/anime/${anime.id}`}>
                <h2 className="CarouselName">{anime.russian}</h2>
                <img
                  className="CarouselPoster"
                  src={anime.poster.mainUrl}
                  alt="404"
                />
              </Link>
            ))}
          </Slider>
        </div>
      ) : fAnimes == false ? (
        <div>There is no anime yet!</div>
      ) : (
        <div className="favoriteAnime-contaiter">
          {fAnimes.map((anime) => (
            <Link className="Plate" key={anime.id} to={`/anime/${anime.id}`}>
              <h2 className="CarouselName">{anime.russian}</h2>
              <img
                className="CarouselPoster"
                src={anime.poster.mainUrl}
                alt="404"
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
