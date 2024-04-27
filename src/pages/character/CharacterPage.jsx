import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../App";
import Nav from "../../components/Nav/Nav";
import "./character-page.css";
import { searchCharacterAPI } from "../../api/search-character";

export default function AnimeCharacterPage() {
  const [Loading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState(null);
  const params = useParams();
  const context = useContext(ThemeContext);
  async function main() {
    const data = await searchCharacterAPI(params);
    setCharacter(data);
    setIsLoading(false);
  }

  useEffect(() => {
    main();
  }, []);
  if (Loading) {
    return (
      <>
        <Nav />
        <div
          className={
            context.theme === "dark" ? "container-dark" : "container-light"
          }
        >
          <h2>Loading......</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div
        className={
          context.theme === "dark" ? "container-dark" : "container-light"
        }
      >
        <div>
          <h1 className="CharacterPageH1Name">
            {character.name} / {character.russian}
          </h1>
        </div>
        <div className="CharacterPageMain">
          <div>
            <img
              className="CharacterPagePoster"
              src={character.poster.originalUrl}
              alt=""
            />
          </div>
          <div className="CharacterNameAndVaAndDesc">
            <div className="CharacterNameAndVA">
              <div className="CharacterNamesDiv">
                <div className="CharacterSubHeadline">Имена</div>
                <div>
                  <div className="oneOfTheOptions">
                    <div className="oneOfTheOption">
                      По-Русский: {character.russian}
                    </div>
                    <div className="oneOfTheOption">
                      По-Англиски: {character.name}
                    </div>
                    <div className="oneOfTheOption">
                      По-Японски: {character.japanese}
                    </div>
                  </div>
                </div>
              </div>
              <div className="CharacterVAdiv">
                <div className="CharacterSubHeadline">Сэйю</div>
              </div>
            </div>
            <div className="CharacterPageDescription">
              <div className="CharacterSubHeadDescription">Описание</div>
              <p className="CharacterPageDescriptionP">
                {character.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
