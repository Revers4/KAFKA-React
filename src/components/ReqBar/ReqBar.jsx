import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext, ReqContext } from "../../App";
import { answerARequestAPI } from "../../api/friend";
import { seeTheReqAPI } from "../../api/friend";

export default function ReqBar() {
  const [isOpen, setIsOpen] = useState(false);
  const userContext = useContext(UserContext);
  const reqContext = useContext(ReqContext);
  const navigate = useNavigate();
  const [notSeenReqCount, setNotSeenReqCount] = useState([]);

  function CountNotSeenReq() {
    const notSeenReqs = reqContext.requests.received.filter(
      (req) => req.have_seen === false
    );
    const id = notSeenReqs.map((id) => {
      return id.id;
    });
    setNotSeenReqCount(id);
  }

  async function seeTheReq() {
    await seeTheReqAPI(notSeenReqCount);
  }

  useEffect(() => {
    CountNotSeenReq();
  }, [reqContext]);

  async function answerARequest(req, condition) {
    const reqLogin = req.login;
    const newReqs = reqContext.requests.received.filter(
      (req) => req.login !== reqLogin
    );
    reqContext.setRequests({
      sent: reqContext.requests.sent,
      received: newReqs,
      friends: reqContext.requests.friends,
    });
    await answerARequestAPI(req.login, condition);
  }

  return (
    <>
      {userContext.user ? (
        <>
          <div className={isOpen ? "NavDropDown active" : "NavDropDown"}>
            {reqContext.requests.received == 0 ? (
              <div style={{ color: "white" }}>
                Пока что тут как-то пустовато...
              </div>
            ) : (
              <div className="NavDivvv">
                {reqContext.requests.received.map((req) => (
                  <div
                    className={
                      req.have_seen
                        ? "NavNotificationDiv"
                        : "NavNotificationDiv NotSeen"
                    }
                    key={req.login}
                  >
                    <Link
                      reloadDocument
                      to={`/profile/${req.login}`}
                      className="NavAvatarReq"
                    >
                      <img
                        className="NavReqAvatar"
                        src={"http://localhost:3000/" + req.avatar_url}
                        alt=""
                      />
                      <span className="NavLoginReq">{req.login}</span>
                    </Link>
                    <div style={{ color: "#fefaf8" }}>Запрос в друзья!</div>
                    <div className="NavChoose">
                      <span>
                        <img
                          onClick={() => answerARequest(req, true)}
                          className="NavIconButtonTicket"
                          src="http://localhost:3000/images\icons8-галочка-50.png"
                          alt=""
                        />
                      </span>
                      <img
                        onClick={() => answerARequest(req, false)}
                        className="NavIconButton"
                        src="http://localhost:3000/images\icons8-умножение-48.png"
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            style={{ display: "flex", position: "relative", cursor: "pointer" }}
          >
            <span className="NavСount">
              {notSeenReqCount == 0
                ? null
                : notSeenReqCount.length >= 10
                ? "9.."
                : notSeenReqCount.length}
            </span>
            <img
              onClick={() => {
                if (isOpen) {
                  setIsOpen(false);
                } else {
                  if (notSeenReqCount.length > 0) {
                    seeTheReq();
                  }
                  setIsOpen(true);
                }
              }}
              className="bell"
              src="https://hsr.keqingmains.com/wp-content/uploads/2023/08/Ability_Midnight_Tumult.webp"
              alt=""
            />
          </div>
        </>
      ) : null}
    </>
  );
}
