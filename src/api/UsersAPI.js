import { useState, useEffect } from "react";
import baseURL from "./baseURL";

function UsersAPI() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const res = await baseURL.get("/api/v1/auth/users", {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("tokenCapivo")
          )}`,
        },
      });
      setUsers(res.data.data);
      setToken(JSON.parse(localStorage.getItem("tokenCapivo")));
    };
    getUsers();
  }, [users, token]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await baseURL.get("/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("tokenCapivo")
          )}`,
        },
      });
      setCurrentUser(res.data.data);
    };
    getCurrentUser();
  }, [currentUser, token]);
  
  const stateUsers = {
    users: [users, setUsers],
    currentUser: [currentUser, setCurrentUser],
    token: [token, setToken],
  };

  return stateUsers;
}

export default UsersAPI;
