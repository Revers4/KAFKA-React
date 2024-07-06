import Nav from "../../components/Nav/Nav";
import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext, ThemeContext, ReqContext } from "../../App";
import "./profile-page.css";
import { getProfileeAPI, changeProfileAPI } from "../../api/profile";
import { useParams, useNavigate, Link } from "react-router-dom";
import Carousel from "../../components/Skick/Slick";
import axios from "axios";
import { sendARequestsAPI, answerARequestAPI } from "../../api/friend";
import FriendsList from "../../components/FriendsList/FriendsList";
import ProfNavBar from "../../components/ProfNavBar/ProfNavBar";

export default function ProfilePage() {
  const context = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const reqContext = useContext(ReqContext);
  const params = useParams();
  const navigate = useNavigate();
  const page = 1;

  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [changeLogin, setChangeLogin] = useState(false);
  const [login, setLogin] = useState(params.Login);
  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState(null);
  const [isFriend, setIsFriend] = useState("NoOne");


  function isThisYou() {
    if (userContext.user) {
      if (userContext.user.login == params.Login) {
        setEdit(true);
      } else {
        setEdit(false);
      }
    }
  }

  async function getProfff() {
    const getData = await getProfileeAPI(params.Login);
    if (getData) {
      isThisYou();
      setProfileData(getData);
    }
  }

  async function changeLoginnnn() {
    const getData = await changeProfileAPI(login);
    if (getData == "This login has already been taken!") {
    } else {
      userContext.setUser((prev) => ({ ...prev, login }));
      navigate("/profile/" + login);
    }
  }

  async function sendAReqest() {
    const data = await sendARequestsAPI(params);
    setIsFriend("Sended");
  }

  async function answerARequest(login, condition) {
    await answerARequestAPI(login, condition);
    {
      condition ? setIsFriend("Friend") : setIsFriend("NoOne");
    }
  }

  const sendFile = React.useCallback(async () => {
    try {
      const data = new FormData();
      data.append("avatar", img);
      await axios
        .post("http://localhost:3000/api/upload", data, {
          headers: {
            "content-type": "mulpipart/form-data",
          },
          withCredentials: true,
        })
        .then((res) => {
          getProfff();
          userContext.setUser((prev) => ({
            ...prev,
            avatar_url: res.data,
          }));
        });
    } catch (error) { }
  }, [img]);

  useEffect(() => {
    isThisYou();
  }, [userContext]);

  useEffect(() => {
    if (reqContext.requests.sent.length !== 0) {
      reqContext.requests.sent.forEach((e) => {
        if (e.login == params.Login) {
          setIsFriend("Sended");
        }
      });
    }
    if (reqContext.requests.received.length !== 0) {
      reqContext.requests.received.forEach((e) => {
        if (e.login == params.Login) {
          setIsFriend("Waiting");
        }
      });
    }
    if (reqContext.requests.friends.length !== 0) {
      reqContext.requests.friends.forEach((e) => {
        if (e.login == params.Login) {
          setIsFriend("Friend");
        }
      });
    }
  }, [reqContext, params]);

  useEffect(() => {
    getProfff().then(() => {
      setIsLoading(false);
    });
  }, [params]);

  if (!isLoading && profileData == null) {
    return (
      <>
        <Nav />
        <div className="container-dark">
          <div className="main">
            <h1>THIS PROFILE DOESN'T EXIST</h1>
          </div>
        </div>
      </>
    );
  }
  if (!isLoading && profileData)
    return (
      <>
        <Nav />
        <ProfNavBar page={page} params={params} />
        <div
          className={
            context.theme === "dark" ? "container-dark" : "container-light"
          }
        >
          <div className="ProfilePageMain">
            <div className="ProfileAvatarDiv">
              {changeLogin ? (
                <>
                  <input
                    maxLength={10}
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      changeLoginnnn().then(() => {
                        setChangeLogin(false);
                      });
                    }}
                  >
                    Submit
                  </button>
                </>
              ) : (
                <h1 className="ProfileLoginName">{params.Login}</h1>
              )}
              {profileData.avatar_url ? (
                <img
                  className="ProfilePageAvatar"
                  src={profileData.avatar_url}
                  alt="avatar"
                />
              ) : (
                <img
                  className="ProfilePageAvatar"
                  src={
                    "https://static.vecteezy.com/system/resources/thumbnails/023/286/058/small/people-avatar-cartoon-icon-png.png"
                  }
                  alt=""
                />
              )}
              <div className="ProfileChange">
                {edit && !changeLogin ? (
                  <span
                    onClick={() => setChangeLogin(true)}
                    className="ProfileEdit"
                  >
                    Изменить
                  </span>
                ) : null}
                {userContext.user !== null && !edit ? (
                  isFriend == "Sended" ? (
                    <span className="ProfileEdit">Запрос отправлен</span>
                  ) : isFriend == "Waiting" ? (
                    <div className="AddToFriend">
                      <span>Запрос в друзья</span>
                      <div className="NavChoose">
                        <span>
                          <img
                            onClick={() => answerARequest(params.Login, true)}
                            className="NavIconButtonTicket"
                            src="http://localhost:3000/images\icons8-галочка-50.png"
                            alt=""
                          />
                        </span>
                        <img
                          onClick={() => answerARequest(params.Login, false)}
                          className="NavIconButton"
                          src="http://localhost:3000/images\icons8-умножение-48.png"
                          alt=""
                        />
                      </div>
                    </div>
                  ) : isFriend == "Friend" ? (
                    <Link to={`/profile/${userContext.user.login}/messages?chat=${params.Login}`} >Отправить сообщение</Link>
                  ) : (
                    <button onClick={sendAReqest}>Добавить в друзья</button>
                  )
                ) : null}
                {changeLogin ? (
                  <>
                    <input
                      type="file"
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                    <button onClick={sendFile}>Изменить</button>{" "}
                  </>
                ) : null}
              </div>
            </div>
            <div className="ProfileDiv">
              <div className="ProfileFriends">
                <div className="ProfileSubHeadline2">Друзья</div>
                <FriendsList edit={edit} />
              </div>
              <div className="ProfileFavoriteDiv">
                <div className="ProfileSubHeadline">Избранное</div>
                <Carousel />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  return (
    <>
      <Nav />
      <ProfNavBar page={page} params={params} />
      <div className="container-dark">
        <div className="main">
          <h1>Loading.....</h1>
        </div>
      </div>
    </>
  );
}
