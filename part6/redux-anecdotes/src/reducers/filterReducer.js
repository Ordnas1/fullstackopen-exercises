export const changeFilter = (value) => {
  return {
    type: "FILTER_CHANGE",
    data: value,
  };
};

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER_CHANGE":
      return action.data;

    default:
      return state;
  }
};

export default filterReducer;
