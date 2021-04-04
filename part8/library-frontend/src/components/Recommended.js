import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { GET_USER_FAVORITEGENRE, GET_ALLBOOKS_BY_GENRE } from "../queries";

const Recommended = ({ show }) => {
  const [getFavorite, resultFavorite] = useLazyQuery(GET_USER_FAVORITEGENRE);
  const [getRecommended, resultRecommended] = useLazyQuery(
    GET_ALLBOOKS_BY_GENRE, {pollInterval:5000}
  );
  const [favorite, setFavorite] = useState(null);
  const [books, setBooks] = useState(null);

  useEffect(() => {
    getFavorite({});
    if (resultFavorite.data) {
      getFavorite({});
      setFavorite(resultFavorite.data.me);
      console.log("favorite", favorite);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    if (resultFavorite.data && favorite) {
      getRecommended({ variables: { genre: favorite.favoriteGenre } });
      setBooks(resultRecommended.data);
      console.log("[RECOMMENDED] Books", books);
    }
  }, [
    show,
    favorite,
    books,
    resultFavorite.data,
    getRecommended,
    resultRecommended.data,
  ]);

  if (resultFavorite.loading | resultRecommended.loading) {
    return null;
  }

  return show ? (
    <div>
      <h1>Recommendations</h1>
      <p>
        Books in your favorite genre <em>{favorite?.favoriteGenre}</em>{" "}
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default Recommended;
