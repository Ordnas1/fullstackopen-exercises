import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnectodeForm";
import ConnectedNotification from "./components/Notification";
import Filter from "./components/Filter";

import { initAnecdotes } from "./reducers/anecdoteReducer";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <ConnectedNotification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
