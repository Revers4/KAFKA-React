import { useContext, useEffect, useState } from "react";
import { FriendMessages, UserContext } from "../../App";
import { friendDataAPI } from "../../api/friend";
import { Link } from "react-router-dom";
import { formatDistanceStrict } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { getMessagesAPI } from "../../api/messages";
import InfiniteScroll from "react-infinite-scroll-component";

function ShowNewMessages({ NewMessages }) {
    return (NewMessages.map((message, i) =>
        <li key={i}>
            <Link>
                <img className="MessageDialogAvatar" src={message.avatar_url} alt="" />
            </Link>
            <div>
                <div><Link>{message.login}</Link>
                    <span>{formatDistanceStrict(message.created_at, new Date(), {
                        addSuffix: true,
                        locale: ru,
                    })}</span>
                </div>
                <p>{message.message}</p>
            </div>
        </li>
    ))
}

function ShowOldMessages({ OldMessages, YourData, friendData }) {
    return OldMessages.map((message, i) =>
        <li key={i}>
            <Link>
                <img className="MessageDialogAvatar" src={YourData.id == message.sender_id ? YourData.avatar_url : 'http://localhost:3000/' + friendData.avatar_url} alt="" />
            </Link>
            <div>
                <div><Link>{YourData.id == message.sender_id ? YourData.login : friendData.login}</Link>
                    <span>{formatDistanceStrict(message.created_at, new Date(), {
                        addSuffix: true,
                        locale: ru,
                    })}</span>
                </div>
                <p>{message.message}</p>
            </div>
        </li>
    )
}

export default function MessageDialog({ DialogWith, goBack }) {
    const [dialogPage, setDialogPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [friend, setFriend] = useState([])
    const [dialog, setDialog] = useState([])
    const [receiverId, setReceiverId] = useState()
    const [message, setMessage] = useState('')
    const messageContext = useContext(FriendMessages);
    const userContext = useContext(UserContext)

    async function getFriendData() {
        const data = await friendDataAPI(DialogWith)
        setFriend(data)
        setReceiverId(data.id)
    }

    console.log(dialog)

    async function getDialog() {
        if (dialog.length == 0) {
            const data = await getMessagesAPI(DialogWith, dialogPage)
            if (data.length == 0) {
                console.log("has more false")
                setHasMore(false)
            }
            setDialogPage((prev) => prev + 1)
            setDialog(data)
        } else {
            console.log("more", hasMore)
            setDialogPage((prev) => prev + 1)
            const data = await getMessagesAPI(DialogWith, dialogPage)
            setDialog((prev) => [...prev, ...data])
            if (data.length == 0) {
                console.log("end")
                setHasMore(false)
            }
        }
    }

    function sendAMessage() {
        if (messageContext.ws.current) {
            const data = {
                receiver_id: receiverId,
                message,
                login: userContext.user.login,
                avatar_url: userContext.user.avatar_url,
                created_at: new Date()
            }
            messageContext.ws.current.send(JSON.stringify(data))
        }
    }


    useEffect(() => {
        getFriendData()
        getDialog()
    }, [])

    return (
        <>
            <div className="MessageDialog">
                <header className="MessageHeader">
                    <div onClick={() => goBack()} className="MessageDialogQuit">
                        <img src="http://localhost:3000/images/icons8-arrow-50.png" alt="" />
                        <p>Назад</p>
                    </div>
                    <div>
                        <p>{friend.login}</p>
                        <img className="MessageDialogAvatar" src={'http://localhost:3000/' + friend.avatar_url} alt="" />
                    </div>
                </header>
                {userContext.user ?
                    <div id="scrollableDiv">
                        <InfiniteScroll
                            dataLength={dialog.length}
                            hasMore={hasMore}
                            next={getDialog}
                            inverse={true}
                            scrollableTarget="scrollableDiv"
                            style={{ display: 'flex', flexDirection: 'column-reverse' }}
                        >
                            <div className="MessagesUL">
                                <ShowNewMessages NewMessages={messageContext.IncomingMessages} />
                                <ShowOldMessages OldMessages={dialog} friendData={friend} YourData={userContext.user} />
                            </div>
                        </InfiniteScroll>
                    </div> : null}
                <div className="MessageSender">
                    <input type="text" placeholder="Сообщение" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button style={{ display: "flex" }} onClick={sendAMessage}>Отправить</button>
                </div>
            </div>
        </>
    )
}