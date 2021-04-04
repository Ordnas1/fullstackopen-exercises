import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS, ALL_GENRES } from "../queries";

const Books = (props) => {
  // State
  const [genre, setGenre] = useState(null);

  // Apollo Queries
  const result = useQuery(ALL_BOOKS);
  const genres = useQuery(ALL_GENRES); 

  if (!props.show) {
    return null;
  }

  const books = genre
    ? result.data.allBooks.filter((book) => book.genres.includes(genre))
    : result.data.allBooks;
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.data.allGenres.map((a) => (
          <button key={a} onClick={() => setGenre(a)}>
            {a}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
