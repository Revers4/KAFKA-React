export async function postACommentAPI(params, comment) {
  const response = await fetch("http://localhost:3000/comment/anime", {
    body: JSON.stringify({
      id: params.Id,
      comment: comment,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  }
}

export async function getAllCommentAPI(params, page) {
  const res = await fetch(
    `http://localhost:3000/comments/${params.Id}?page=${page}&limit=1`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Requset failed");
  }
  const animeIds = await res.json();
  return animeIds;
}

export async function deleteACommentAPI(comment_id) {
  const response = await fetch("http://localhost:3000/comment/anime", {
    body: JSON.stringify({
      id: comment_id,
    }),
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  }
}

export async function editACommentAPI(commentId, comment_message) {
  const response = await fetch("http://localhost:3000/comment/anime", {
    body: JSON.stringify({
      id: commentId,
      comment: comment_message,
    }),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  }
}
