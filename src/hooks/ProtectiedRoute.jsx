import { useContext } from "react";
import { UserContext } from "../App"
import { Navigate, useParams } from "react-router-dom";


export const ProtectiedRoute = ({ witchPage }) => {
    const usercontext = useContext(UserContext);
    const params = useParams();
    if (usercontext.user == false) {
        return <Navigate to='/' />
    }
    else if (usercontext.user) {
        if (usercontext.user.login !== params.Login) {
            return <Navigate to={'/profile/' + usercontext.user.login + '/messages'} />
        } else { return witchPage }
    }

}