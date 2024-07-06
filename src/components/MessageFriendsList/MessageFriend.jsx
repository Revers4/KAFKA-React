import { useContext } from "react";
import { UserContext } from "../../App";
import { Link, useSearchParams } from "react-router-dom";
import { formatDistanceStrict } from "date-fns";
import { ru } from "date-fns/locale/ru";

export default function MessageFriend({ friend }) {
    const [params, setParams] = useSearchParams();
    const usercontext = useContext(UserContext);
    function EnterTheDialog(login) {
        setParams("chat=" + login)
    }

    return (
        <li className="MessageFriendli" onClick={() => EnterTheDialog(friend.login)}>
            <Link to={`/profile/${friend.login}`}>
                <img src={'http://localhost:3000/' + friend.avatar_url} alt="" />
            </Link>
            <div>
                <header>
                    <p>{friend.login}</p>
                    <span>
                        {formatDistanceStrict(friend.last_message_date, new Date(), {
                            addSuffix: true,
                            locale: ru,
                        })}
                    </span>
                </header>
                <span>
                    {usercontext.user ? (friend.who_wrote_last_message == usercontext.user.id ? <img src={usercontext.user.avatar_url} alt="" /> : null) : null}
                    <p className="MessageP">{friend.last_message}</p>
                </span>
            </div>
        </li>
    )
}