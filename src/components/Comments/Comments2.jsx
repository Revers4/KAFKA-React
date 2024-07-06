import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import TextareaAutosize from "react-textarea-autosize";
import Comment from "./Comment";
import {
  deleteACommentAPI,
  editACommentAPI,
  getAllCommentAPI,
  postACommentAPI,
} from "../../api/comments";
import { useParams, Link } from "react-router-dom";
import "./comments.css";
import InfiniteScroll from "react-infinite-scroll-component";

const Comments = () => {
  const [hasMore, setHasMore] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment_message, setComment_message] = useState("");
  const [postComment, setPostComment] = useState("");
  const [comment_id, setComment_id] = useState();
  const [active, setActive] = useState(false);
  const [page, setPage] = useState(1);
  const userContext = useContext(UserContext);
  const params = useParams();

  async function getAllComment() {
    const data = await getAllCommentAPI(params, page);
    // if (comments.length == 2) {
    //   setHasMore(false);
    //   return;
    // }
    if (data.length == 0) {
      setHasMore(false);
      return;
    } else {
      setHasMore(true);
      setComments((prevData) => [...prevData, ...data]);
    }
  }

  useEffect(() => {
    getAllComment();
  }, [page]);

  async function editCommentText(comment_id, newText) {
    const data = await editACommentAPI(comment_id, newText);
    const newComment = comments.map((comment) => {
      if (comment.comment_id == comment_id) {
        comment.comment = newText;
      }
      return comment;
    });
    setComments(newComment);
  }

  function deleteData(comment_id, comment, condition) {
    setComment_id(comment_id);
    setComment_message(comment);
    setActive(condition);
  }

  async function deleteComment() {
    await deleteACommentAPI(comment_id);
    setActive(false);
    const newComments = comments.filter(
      (comment) => comment.comment_id !== comment_id
    );
    setComments(newComments);
    setHasMore(true);
  }

  async function PostComment() {
    const data = await postACommentAPI(params, postComment);
    const newComment = data.map((comment) => {
      comment.avatar_url = "http://localhost:3000/" + comment.avatar_url;
      return comment;
    });
    setComments([newComment[0], ...comments]);
    setPostComment("");
  }
  return (
    <>
      <div
        className={active ? "modal open" : "modal"}
        onClick={() => setActive(false)}
      >
        <div className="delete_modal_box" onClick={(e) => e.stopPropagation()}>
          <div>
            <h2 className="CommentOptionH2">
              Вы уверены что хотите удалить комментарий?
            </h2>
            <div className="CommentOptionM">{comment_message}</div>
            <div className="CommentButtonsDiv">
              <button className="CommentYes" onClick={deleteComment}>
                Да
              </button>
              <button className="CommentNo" onClick={() => setActive(false)}>
                Нет
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="CommentsMain">
        <div className="LeaveUrCommentDiv">
          <header className="CommentHeader">
            {userContext.user ? (
              <div className="CommentLink">
                <Link to={`/profile/${userContext.user.login}`}>
                  <img
                    className="CommentAvatar"
                    src={userContext.user.avatar_url}
                    alt=""
                  />
                </Link>
                <div className="CommentLogin">{userContext.user.login}</div>
              </div>
            ) : (
              null
            )}
          </header>
          <TextareaAutosize
            placeholder="Ваш комментарий"
            required
            minRows={5}
            value={postComment}
            onChange={(e) => setPostComment(e.target.value)}
            className="TextareaSendComment"
          />
          <button className="CommentSend" onClick={PostComment}>
            Отправить
          </button>
        </div>
        <div className="AllComents">
          <InfiniteScroll
            dataLength={comments.length}
            hasMore={hasMore}
            next={() => {
              setPage((prevPage) => prevPage + 1);
            }}
            scrollThreshold="1px"
          >
            {comments.map((comment) => (
              <Comment
                key={comment.comment_id}
                comment={comment}
                updateCommentText={editCommentText}
                deleteData={deleteData}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Comments;
