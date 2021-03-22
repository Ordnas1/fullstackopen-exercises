import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { initializeBlogs } from "../reducers/blogsReducer";
import { initializeComments, createComment } from "../reducers/commentsReducer";

const BlogDetailView = () => {
  const id = useParams().id;
  const dispatch = useDispatch();

  const blog = useSelector(
    (state) => state.blogs.filter((blog) => blog.id === id)[0]
  );
  const comments = useSelector((state) => state.comments);

  const handleLike = async (e) => {
    const newBlog = { ...blog };
    newBlog.likes++;
    await blogService.update(newBlog, newBlog.id);
    dispatch(initializeBlogs());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    console.log(comment);
    dispatch(createComment(id, comment));
  };

  useEffect(() => {
    dispatch(initializeComments(id));
  }, [dispatch, id]);

  return blog ? (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </p>
      <p>Added by {blog.user?.name}</p>

      {comments?.length !== 0 ? (
        <div>
          <h3>Comments</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="comment" />
            <button>Add Comment</button>
          </form>
          <ul>
            {comments?.map((c) => (
              <li key={c.id}>{c.comment}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h4>no comments</h4>
          <form onSubmit={handleSubmit}>
            <input type="text" name="comment" />
            <button>Add Comment</button>
          </form>
        </div>
      )}
    </div>
  ) : null;
};

export default BlogDetailView;
