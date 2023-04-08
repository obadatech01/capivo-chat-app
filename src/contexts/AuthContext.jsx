import React, { createContext, useContext } from "react";
import baseURL from "../api/baseURL";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // const [isLogged, setIsLogged] = useState(false);

  async function login(phoneNumber, password) {
    // TODO: Implement login logic here
    const url = "/api/v1/auth/login";
    await baseURL.post(url, { phoneNumber, password }).then((res) => {
      localStorage.setItem("tokenCapivo", JSON.stringify(res.data.token));
      // console.log(res.data);
    });

    // setIsLogged(true);
  }

  // function logout() {
  // Perform logout logic
  // setIsLogged(false);
  // }

  const value = {
    // currentUser,
    login,
    // logout,
    // isLogged
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
