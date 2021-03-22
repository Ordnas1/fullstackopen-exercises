// Timeout para controlar tiempo de reseteo
let timeout;

export const resetNotification = () => {
  return {
    type: "RESET_NOTIFICATION",
  };
};

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: notification,
    });

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = await setTimeout(() => {
      dispatch(resetNotification());
    }, time * 1000);
  };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "RESET_NOTIFICATION":
      return "";
    case "SET_NOTIFICATION":
      return action.data;
    default:
      return state;
  }
};

export default notificationReducer;
