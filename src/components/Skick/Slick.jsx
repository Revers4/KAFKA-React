import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFavotireAPI, getFavoriteAnimeAPI } from "../../api/favorites";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";
import useSize from "../../hooks/useSize"

export default function Carousel() {
  const params = useParams();
  const [fAnimes, setFAnimes] = useState([]);
  const size = useSize()


  async function getFavorite() {
    const data = await getFavotireAPI(params.Login);
    if (!data) {
      setFAnimes([]);
      return;
    }
    const dataId = data.map((e) => {
      return e.id;
    });
    const fAnime = await getFavoriteAnimeAPI(dataId, 5, 1);
    setFAnimes(fAnime);
  }

  useEffect(() => {
    getFavorite();
  }, [params.Login]);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: size[0] > 1600 ? 3 : 2,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <>
      <div className="slick-loader">
        <div class="lds-dual-ring"></div>
      </div>
      {/* {fAnimes.length > 3 ? (
        <div className="slider-container" style={{ maxWidth: size[0] < 1600 ? '300px' : "500px" }}>
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
      )} */}
    </>
  );
}
