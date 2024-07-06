import { useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import "./comments.css";
import { formatDistanceStrict } from "date-fns";
import { ru } from "date-fns/locale/ru";

const Comment = ({ comment, updateCommentText, deleteData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.comment);
  const usercontext = useContext(UserContext);

  const handleEdit = () => {
    setIsEditing(true),
      setEditedText(comment.comment);
  };

  const handleSave = () => {
    updateCommentText(comment.comment_id, editedText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteData(comment.comment_id, comment.comment, true);
  };

  return (
    <>
      <div className="CommentDiv">
        <header className="CommentHeader">
          <Link to={`/profile/${comment.login}`} className="CommentLink">
            <img className="CommentAvatar" src={comment.avatar_url} alt="" />
            <div>
              <div className="CommentLogin">{comment.login}</div>
              <span>
                {formatDistanceStrict(comment.created_at, new Date(), {
                  addSuffix: true,
                  locale: ru,
                })}
              </span>
            </div>
          </Link>
          {isEditing ? (
            <div style={{ display: "flex" }}>
              <div
                className="CommentDelete"
                onClick={() => setIsEditing(false)}
              >
                Отменить
              </div>
              <div className="CommentEdit" onClick={handleSave}>
                Сохранить
              </div>
            </div>
          ) : usercontext.user == null ? null : usercontext.user.login ==
            comment.login ? (
            <div style={{ display: "flex" }}>
              <div className="CommentDelete" onClick={handleDelete}>
                Удалить
              </div>
              <div onClick={() => handleEdit()} className="CommentEdit">
                Изменить
              </div>
            </div>
          ) : null}
        </header>
        {isEditing ? (
          <div style={{ display: "flex" }}>
            <TextareaAutosize
              required
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="CommentTextarea"
            />
          </div>
        ) : (
          <>
            <div className="Comment">{comment.comment}</div>
          </>
        )}
      </div>
    </>
  );
};

export default Comment;