import "./ProfNavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfNavBar({ params, page }) {
  const [profilePage, setProfilePage] = useState(page);

  return (
    <nav className="ProfileNavBar">
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
          className={profilePage == 4 ? "NavBarLI" : ""}
          onClick={() => setProfilePage(4)}
        >
          Сообщения
        </Link>
        <Link
          to={`/profile/${params.Login}/favorites`}
          className={profilePage == 5 ? "NavBarLI" : ""}
          onClick={() => setProfilePage(5)}
        >
          Настройки
        </Link>
      </ul>
    </nav>
  );
}
