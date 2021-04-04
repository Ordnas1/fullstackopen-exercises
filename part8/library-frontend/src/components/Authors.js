import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_AUTHOR_BORN_YEAR } from "../queries";

const Authors = (props) => {
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const result = useQuery(ALL_AUTHORS);
  const [editAuthorYear] = useMutation(EDIT_AUTHOR_BORN_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show || result.loading) {
    return null;
  }
  const authors = result.data.allAuthors;

  const handleAuthorEdit = (e) => {
    e.preventDefault();
    editAuthorYear({ variables: { name: author, setBornTo: Number(year) } });
    setAuthor("");
    setYear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleAuthorEdit}>
        <div>
          Author:
          <select value={author} onChange={(e) => setAuthor(e.target.value)}>
            <option value=""></option>
            {authors.map((a) => (
              <option value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default Authors;
