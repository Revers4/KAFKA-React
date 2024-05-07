import "./FriendsList.css";
import { friendsListAPI } from "../../api/friend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Friend } from "./Friend";

export default function FriendsList({ edit }) {
  const params = useParams();
  const [friends, setFriends] = useState([]);

  function removeAFriend(id) {
    setFriends((prev) => {
      return prev.filter((friend) => friend.id !== id);
    });
  }

  async function getFriends() {
    const data = await friendsListAPI(params);
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
          />
        ))}
      </ul>
    </div>
  );
}
