import Nav from "../../components/Nav/Nav";
import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext, ThemeContext, ReqContext } from "../../App";
import "./profile-page.css";
import { getProfileeAPI, changeProfileAPI } from "../../api/profile";
import { useParams, useNavigate } from "react-router-dom";
import Carousel from "../../components/Skick/Slick";
import axios from "axios";
import { sendARequestsAPI, answerARequestAPI } from "../../api/friend";

export default function ProfilePage() {
  const context = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const reqContext = useContext(ReqContext);
  const params = useParams();
  const navigate = useNavigate();

  const [loginParams, setLoginparams] = useState(params.Login || "");
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [changeLogin, setChangeLogin] = useState(false);
  const [login, setLogin] = useState(loginParams);
  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState(null);
  const [isFriend, setIsFriend] = useState("NoOne");

  async function getProfff() {
    const getData = await getProfileeAPI(loginParams);
    if (getData) {
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
    } catch (error) {}
  }, [img]);

  useEffect(() => {
    if (userContext.user) {
      if (userContext.user.login == loginParams) {
        setEdit(true);
      }
    }
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
  }, [reqContext]);

  useEffect(() => {
    getProfff().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (!isLoading && profileData == null) {
    return (
      <>
        <Nav />
        <div className="container">
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
        <div
          className={
            context.theme === "dark" ? "container-dark" : "container-light"
          }
        >
          {/* <nav className="ProfileNavBar">
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
            <div>123</div>
          </nav> */}
          <div className="ProfilePageEdit">
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
              <h1 className="ProfileLoginName">{login}</h1>
            )}
          </div>
          <div className="ProfilePageMain">
            <div className="ProfileAvatarDiv">
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
                    <div>Вы друзьяшки</div>
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
            <div className="ProfileInfo">
              <div className="ProfileDiv">
                <div className="ProfileFriends">
                  <div className="CharacterSubHeadline">Друзья</div>
                  <div>
                    <div className="oneOfTheOptions"></div>
                  </div>
                </div>
                <div className="CharacterVAdiv">
                  <div className="ProfileSubHeadline">Избранное</div>
                  <Carousel />
                </div>
              </div>
              <div className="CharacterPageDescription">
                <div className="CharacterSubHeadDescription">Обо мне</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  return (
    <>
      <Nav />
      <div className="container">
        <div className="main">
          <h1>Loading.....</h1>
        </div>
      </div>
    </>
  );
}
