import { useParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import ProfNavBar from "../../components/ProfNavBar/ProfNavBar";
import MessageFriendsList from "../../components/MessageFriendsList/MessageFriendsList";
import "./MessagesPage.css"

export default function MessagesPage() {
    const page = 4;
    const params = useParams();

    return (
        <>
            <Nav />
            <ProfNavBar page={page} params={params} />
            <div className={page == 4 ? "container-dark special" : "container-dark"}>
                <MessageFriendsList />
            </div>
        </>
    )
}