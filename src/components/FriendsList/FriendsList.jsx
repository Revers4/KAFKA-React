import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { friendsListAPI } from "../../api/friend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Friend } from "./Friend";
import "./FriendsList.css";

export default function FriendsList({ edit }) {
  const params = useParams();
  const [friends, setFriends] = useState([]);
  const [active, setActive] = useState('')
  const [loading, setLoading] = useState(false)

  function removeAFriend(id) {
    setFriends((prev) => {
      return prev.filter((friend) => friend.id !== id);
    });
  }

  function activePerson(login) {
    setActive(login)
  }

  async function getFriends() {
    setLoading(false);
    const data = await friendsListAPI(params, 4);
    setFriends(data);
    setLoading(true);
  }

  useEffect(() => {
    getFriends();
  }, [params]);

  return (
    <div>
      <ul>
        {loading ? friends.map((friendData) => (
          <Friend
            remove={removeAFriend}
            edit={edit}
            key={friendData.login}
            friend={friendData}
            activePerson={activePerson}
            activeCondition={active}
            loading={loading}
          />
        )) : Array.from(Array(4).keys()).map((number) => (
          <div style={{ display: "flex", alignItems: "center", marginBottom: "11px" }} key={number}>
            <SkeletonTheme baseColor="pink" highlightColor="purple">
              <Skeleton width={50} height={50} circle style={{ marginRight: "6px" }} />
              <Skeleton width={244} height={42} />
            </SkeletonTheme>
          </div>
        ))}
      </ul>
    </div>
  );
}
