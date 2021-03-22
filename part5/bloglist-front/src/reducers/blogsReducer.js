import blogService from "../services/blogs";

export const initializeBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: data,
    });
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    await blogService.create(blog);
    dispatch({
      type: "CREATE_BLOG",
      data: blog,
    });
  };
};

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;

    case "CREATE_BLOG":
      console.log(action.data);
      return state.concat(action.data);
    default:
      return state;
  }
};

export default blogsReducer;
