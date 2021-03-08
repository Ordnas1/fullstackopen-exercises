import React from "react";

const Like = ({ likes, handleLike }) => {
  return (
    <span>
      likes {likes} <button onClick={handleLike}>like</button>
    </span>
  );
};

export default Like;
