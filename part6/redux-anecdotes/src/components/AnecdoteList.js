import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";
import {
  newNotification,
  resetNotification,
} from "../reducers/notificationReducer";


const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(incrementVote(anecdote));
    dispatch(
      newNotification(`You succesfully voted for '${anecdote.content}'`, 5)
    );
  };

  // Data preprocess
  const preprocessedAnecdotes = anecdotes.sort(
    (prev, next) => next.votes - prev.votes
  ).filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()));



  return (
    <div>
      {preprocessedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
