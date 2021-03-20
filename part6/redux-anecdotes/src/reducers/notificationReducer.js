let timeout;
export const newNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_NOTIFICATION", data: notification });
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = await setTimeout(() => {
      dispatch(resetNotification());
    }, time * 1000);
  };
};

export const resetNotification = () => {
  return { type: "RESET_NOTIFICATION" };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data;

    case "RESET_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export default notificationReducer;
