import "./FriendsList.css";
import { friendsListAPI } from "../../api/friend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Friend } from "./Friend";

export default function FriendsList({ edit }) {
  const params = useParams();
  const [friends, setFriends] = useState([]);
  const [active, setActive] = useState('')

  function removeAFriend(id) {
    setFriends((prev) => {
      return prev.filter((friend) => friend.id !== id);
    });
  }

  function activePerson(login) {
    setActive(login)
  }

  async function getFriends() {
    const data = await friendsListAPI(params, 5);
    setFriends(data);
  }

  useEffect(() => {
    getFriends();
  }, [params]);

  return (
    <div>
      <ul>
        {friends.map((friendData) => (
          <Friend
            remove={removeAFriend}
            edit={edit}
            key={friendData.login}
            friend={friendData}
            activePerson={activePerson}
            activeCondition={active}
          />
        ))}
      </ul>
    </div>
  );
}
