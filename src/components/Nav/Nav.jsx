import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { useContext, useState, useEffect } from "react";
import { ThemeContext, UserContext, ReqContext } from "../../App";
import Modal from "../Modal/Modal";
import ReqBar from "../ReqBar/ReqBar";
import { logoutAPI } from "../../api/auth";

export default function Nav() {
  const userContext = useContext(UserContext);
  const context = useContext(ThemeContext);
  const [modalActive, setModalActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const navigate = useNavigate();

  const [searchWord, setSearchWord] = useState("");

  const handleNameChange = (event) => {
    if (event.key === "Enter") {
      navigate("/?search=" + searchWord);
    }
  };

  async function logout() {
    await logoutAPI();
    userContext.setUser(null);
  }

  return (
    <>
      <nav className="MainNav">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to={`/`} reloadDocument>
            <img
              src="https://hsr.keqingmains.com/wp-content/uploads/2023/08/Ability_Twilight_Trill.webp"
              alt=""
              className="logo"
            />
            <div className="name">KAFKA</div>
          </Link>
          <input
            className="SearchInput"
            id="SearchInput"
            placeholder="Search"
            type="text"
            onChange={(e) => setSearchWord(e.target.value)}
            onKeyPress={handleNameChange}
          />
        </div>
        {userContext.user ? (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ReqBar condition={isOpen} />
              <div className="enter">
                <div
                  onClick={() => {
                    if (isOpen2) {
                      setIsOpen2(false);
                    } else {
                      setIsOpen2(true);
                    }
                  }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    className="profileAvatar"
                    src={
                      userContext.user.avatar_url ||
                      "https://static.vecteezy.com/system/resources/thumbnails/023/286/058/small/people-avatar-cartoon-icon-png.png"
                    }
                    alt=""
                  />
                  <span>{userContext.user.login}</span>
                </div>
                <div
                  className={isOpen2 ? "NavDropDown2 active" : "NavDropDown2"}
                >
                  <ul>
                    <li>
                      <Link
                        reloadDocument
                        to={`/profile/${userContext.user.login}`}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>Setting</li>
                    <li
                      onClick={() => {
                        logout(), setIsOpen2(false);
                      }}
                      className="NavLogOut"
                    >
                      Log Out
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="enter" onClick={() => setModalActive(true)}>
            Войти
          </div>
        )}
        {/* <button
          onClick={() => {
            if (context.theme === "dark") {
              context.setTheme("light");
            } else {
              context.setTheme("dark");
            }
          }}
        >
          Change
        </button> */}
      </nav>
      <Modal active={modalActive} setActive={setModalActive} />
    </>
  );
}
