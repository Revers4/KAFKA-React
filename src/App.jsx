import "./App.css";
import HomePage from "./pages/home/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AnimePage from "./pages/anime/AnimePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { createContext, useEffect, useState } from "react";
import AnimeCharacterPage from "./pages/character/CharacterPage.jsx";
import { refreshTokenAPI } from "./api/auth.js";
import { getProfileAPI } from "./api/profile.js";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import { getRequestsAPI } from "./api/friend.js";

export const ThemeContext = createContext(null);
export const UserContext = createContext(null);
export const ReqContext = createContext(null);

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
]);

function App() {
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState({
    sent: [],
    received: [],
    friends: [],
  });

  async function getProfile() {
    await refreshTokenAPI();
    const profile = await getProfileAPI();
    setUser(profile);
  }

  async function getRequests() {
    if (user !== null) {
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
    <ReqContext.Provider value={{ requests, setRequests }}>
      <UserContext.Provider value={{ user, setUser }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <RouterProvider router={router} />
        </ThemeContext.Provider>
      </UserContext.Provider>
    </ReqContext.Provider>
  );
}

export default App;
