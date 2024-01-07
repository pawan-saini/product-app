import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { AUTH_TOKEN } from "../constants/auth/index";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    if (localStorage.getItem(AUTH_TOKEN)) {
      let tokens = JSON.parse(localStorage.getItem(AUTH_TOKEN));
      if (!tokens) {
        return null;
      }
      const decodedToken = jwt_decode(tokens.token);
      let currentDate = new Date();
      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        return null;
      } else {
        return decodedToken;
      }
    }
    return null;
  });

  const login = async (tokenObj) => {
    localStorage.setItem(AUTH_TOKEN, JSON.stringify({ token: tokenObj.token }));
    setUser(jwt_decode(tokenObj.token));
  };
  const logout = async () => {
    // invoke the logout API call, for our NestJS API no logout API
    localStorage.removeItem(AUTH_TOKEN);
    setUser(null);
    navigate("/");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
