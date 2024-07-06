export async function friendsListAndLastMessageAPI() {
    const res = await fetch(
      `http://localhost:3000/get/friends/message/`,
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
    const data = await res.json();
    return data;
  }

export async function getMessagesAPI(person, page) {
  const res = await fetch(
    `http://localhost:3000/get/messages/${person}?page=${page}`,
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
  const data = await res.json();
  return data;
}