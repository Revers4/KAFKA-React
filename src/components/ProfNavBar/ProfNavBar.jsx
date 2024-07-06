import "./ProfNavBar.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

export default function ProfNavBar({ params, page }) {
  const userContext = useContext(UserContext);
  const [profilePage, setProfilePage] = useState(page);

  return (
    <nav className={page == 4 ? "ProfileNavBar special" : "ProfileNavBar"}>
      <ul className="NavBarUL">
        <Link
          to={`/profile/${params.Login}`}
          className={profilePage == 1 ? "NavBarLI" : ""}
          onClick={() => setProfilePage(1)}
        >
          Профиль
        </Link>
        <Link
          to={`/profile/${params.Login}/favorites`}
          className={profilePage == 2 ? "NavBarLI" : ""}
          onClick={() => setProfilePage(2)}
        >
          Избранное
        </Link>
        <Link
          to={`/profile/${params.Login}/favorites`}
          className={profilePage == 3 ? "NavBarLI" : ""}
          onClick={() => setProfilePage(3)}
        >
          Комментарии
        </Link>
        <Link
          to={`/profile/${params.Login}/favorites`}
          className={profilePage == 3 ? "NavBarLI" : ""}
          onClick={() => setProfilePage(4)}
        >
          Друзья
        </Link>
        {userContext.user ? (userContext.user.login == params.Login ? <Link
          to={`/profile/${params.Login}/messages`}
          className={profilePage == 4 ? "NavBarLI" : ""}
          onClick={() => setProfilePage(5)}
        >
          Сообщения
        </Link> : null) : null}
        {userContext.user ? (userContext.user.login == params.Login ? <Link
          to={`/profile/${params.Login}/favorites`}
          className={profilePage == 5 ? "NavBarLI" : ""}
          onClick={() => setProfilePage(6)}
        >
          Настройки
        </Link> : null) : null}
      </ul>
    </nav>
  );
}
