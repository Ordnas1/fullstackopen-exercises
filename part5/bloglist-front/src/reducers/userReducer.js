import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

export const login = ({ username, password }) => {
  return async (dispatch) => {
    let user;
    try {
      user = await loginService.login({ username, password });
      console.log("user", user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setNotification("Failed login", 3));
    }
  };
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    data: user,
  };
};

export const logOutUser = () => {
  window.localStorage.removeItem("loggedUser");
  return {
    type: "LOGOUT",
  };
};
const initialState = null;

const userReducer = (state = initialState, action) => {
  console.log("ACTION", action);
  console.log("action data", action.data);
  console.log("STATE", state);
  switch (action.type) {
    case "SET_USER":
      return action.data;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export default userReducer;
