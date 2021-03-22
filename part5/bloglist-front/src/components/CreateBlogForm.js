import React from "react";

const CreateBlogForm = ({
  handleSubmit,
  titleValue,
  authorValue,
  urlValue,
  setTitle,
  setAuthor,
  setUrl,
}) => (
  <div>
    <h2>Add blogs</h2>
    <form id="form" onSubmit={handleSubmit}>
      <div>
        title
        <input
          id="title"
          type="text"
          value={titleValue}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id="author"
          type="text"
          value={authorValue}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id="url"
          type="text"
          value={urlValue}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <input id="submitBtn" type="submit" value="Create Blog" />
    </form>
  </div>
);

export default CreateBlogForm;
