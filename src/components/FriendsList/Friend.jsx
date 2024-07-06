import "./FriendsList.css";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { removeAFriendAPI } from "../../api/friend";
import { UserContext } from "../../App";

export function Friend({ friend, edit, remove, activePerson, activeCondition }) {
  const [active, setActive] = useState(false);
  const userContext = useContext(UserContext);

  function setOtherActive(login) {
    if (!active) {
      activePerson(login)
    }
  }

  async function removeAFriend() {
    remove(friend.id);
    await removeAFriendAPI(friend.id);
  }

  useEffect(() => {
    if (friend.login !== activeCondition) {
      setActive(false)
    }
  }, [activeCondition])

  return (
    <li className="FriendsListli">
      <Link className="FriendLink" to={`/profile/${friend.login}`}>
        <img
          className="FriendImg"
          src={"http://localhost:3000/" + friend.avatar_url}
          alt=""
        />
        <p>{friend.login}</p>
      </Link>
      <div className="FriendListDiv">
        {edit ? (
          <img
            onClick={() => { setActive((prev) => !prev), setOtherActive(friend.login) }}
            src={
              active
                ? "http://localhost:3000/images/gun_active.png"
                : "http://localhost:3000/images/gun_off.png"
            }
            alt=""
          />
        ) : null}
        {active ? (
          <div className="FriendDropDown">
            <div>
              <Link to={`/profile/${userContext.user.login}/messages?chat=${friend.login}`}>
                Сообщения
              </Link>
            </div>
            <div onClick={removeAFriend} className="FriendDeletButton">
              Удалить из друзей
            </div>
          </div>
        ) : null}
      </div>
    </li>
  );
}
