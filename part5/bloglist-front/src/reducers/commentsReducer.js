import commentsService, { setBlogId } from "../services/comments";

export const initializeComments = (blogId) => {
  return async (dispatch) => {
    setBlogId(blogId);
    const data = await commentsService.getAll();
    dispatch({
      type: "INIT_COMMENTS",
      data,
    });
  };
};

export const createComment = (blogId, data) => {
  return async (dispatch) => {
    setBlogId(blogId);
    const res = await commentsService.create({ comment: data });
    dispatch({
      type: "CREATE_COMMENTS",
      data: res,
    });
  };
};

const commentsReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_COMMENTS":
      return action.data;
    case "CREATE_COMMENTS":
      return state.concat(action.data);
    default:
      return state;
  }
};

export default commentsReducer;
