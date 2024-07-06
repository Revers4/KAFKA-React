import "./App.css";
import HomePage from "./pages/home/HomePage.jsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AnimePage from "./pages/anime/AnimePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { createContext, useEffect, useState, useRef } from "react";
import AnimeCharacterPage from "./pages/character/CharacterPage.jsx";
import { refreshTokenAPI } from "./api/auth.js";
import { getProfileAPI } from "./api/profile.js";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import { getRequestsAPI } from "./api/friend.js";
import Favorites from "./pages/profilePages/Favorites.jsx";
import MessagesPage from "./pages/messages/MessagesPage.jsx";
import connectAPI from "./api/connection.js";
import { ProtectiedRoute } from "./hooks/ProtectiedRoute.jsx";

export const ThemeContext = createContext(null);
export const UserContext = createContext(null);
export const ReqContext = createContext(null);
export const FriendMessages = createContext(null)

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/anime/:Id",
    element: <AnimePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/character/:Id",
    element: <AnimeCharacterPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profile/:Login",
    element: <ProfilePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profile/:Login/favorites",
    element: <Favorites />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profile/:Login/messages",
    element: <ProtectiedRoute witchPage={<MessagesPage />} />,
    errorElement: <NotFoundPage />,
  }
]);

function App() {
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState({
    sent: [],
    received: [],
    friends: [],
  });
  const ws = useRef(null)
  const [IncomingMessages, setIncomingMessages] = useState([], [])



  async function getProfile() {
    await refreshTokenAPI();
    const profile = await getProfileAPI();
    setUser(profile);
  }

  async function getRequests() {
    if (user) {
      await connectAPI(user.id, ws, setIncomingMessages, setRequests)
      const requests = await getRequestsAPI();
      if (requests) {
        setRequests(requests);
      }
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getRequests();
  }, [user]);

  return (
    <FriendMessages.Provider value={{ IncomingMessages, setIncomingMessages, ws }}>
      <ReqContext.Provider value={{ requests, setRequests }}>
        <UserContext.Provider value={{ user, setUser }}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <RouterProvider router={router} />
          </ThemeContext.Provider>
        </UserContext.Provider>
      </ReqContext.Provider>
    </FriendMessages.Provider>
  );
}

export default App;
