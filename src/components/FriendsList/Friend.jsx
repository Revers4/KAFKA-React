import "./FriendsList.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { removeAFriendAPI } from "../../api/friend";

export function Friend({ friend, edit, remove }) {
  const [active, setActive] = useState(false);

  async function removeAFriend() {
    remove(friend.id);
    const data = await removeAFriendAPI(friend.id);
    console.log(data);
  }

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
            onClick={() => setActive((prev) => !prev)}
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
            <div>Сообщения</div>
            <div onClick={removeAFriend} className="FriendDeletButton">
              Удалить из друзей
            </div>
          </div>
        ) : null}
      </div>
    </li>
  );
}
