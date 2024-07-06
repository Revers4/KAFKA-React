import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MessageFriend from "./MessageFriend";
import "./MessageFriendsList.css"
import MessageDialog from "./MessageDialog";
import { friendsListAndLastMessageAPI } from "../../api/messages";

export default function MessageFriendsList() {
  const params = useParams();
  const [friends, setFriends] = useState([]);
  const [chatParams, setChatParams] = useSearchParams();
  let chat = chatParams.get("chat" || "");
  const messageDialogRef = useRef()

  async function friendsListAndLastMessage() {
    const data = await friendsListAndLastMessageAPI();
    setFriends(data);
  }

  function goBack() {
    setChatParams('')
  }

  useEffect(() => {
    if (!chat) { friendsListAndLastMessage() }
    if (messageDialogRef.current) {
      messageDialogRef.current.scrollTop = messageDialogRef.current.scrollHeight
    }
  }, [params])

  return (
    <div className="MessageFriendsMain">
      {chat ? <MessageDialog goBack={goBack} DialogWith={chat} /> :
        <div className="MessageFriendsListDiv">
          <header className="MessageHeader">
            <input className="MessageFriendsSearch" type="text" placeholder="Поиск" />
          </header>
          <ul ref={messageDialogRef} className="MessageFriendsUl">
            {friends.map((friend) => (
              <MessageFriend
                friend={friend}
                key={friend.id}
              />
            ))}
          </ul>
        </div>}
      <div className="MessageFriendsSidePart">
        <div className="MessageFriendsActive">
          Все чаты
        </div>
        <div className="MessageFriendsOff">
          Непрочитанные
        </div>
      </div>
    </div>
  )
}