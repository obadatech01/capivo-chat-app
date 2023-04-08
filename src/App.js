import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";
import UsersAPI from "./api/UsersAPI";

function App() {
  const stateUsers = UsersAPI();
  const [token, setToken] = stateUsers.token;

  return (
    <BrowserRouter>
      <Routes>        
        <Route
          exact
          path="/"
          element={
            token ? <Navigate to="/room" /> : <Navigate to="/login" />
          }
        />

        {token ? (
          <>
            <Route exact path="/room" element={<RoomPage />} />
            <Route exact path="/chat/:userId" element={<ChatPage />} />
          </>
        ) : (
          <Route exact path="/login" element={<LoginPage />} />
        )}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
