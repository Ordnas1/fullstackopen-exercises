import usersService from "../services/userList";

export const initUserList = () => {
  return async (dispatch) => {
    const data = await usersService.getAll();
    dispatch({
      type: "INIT_USERLIST",
      data,
    });
  };
};

const userListReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERLIST":
      return action.data;

    default:
      return state;
  }
};

export default userListReducer;
