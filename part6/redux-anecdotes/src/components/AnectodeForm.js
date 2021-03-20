import React from "react";
import { connect } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";


const AnecdoteForm = (props) => {
  

  const createAnecdote = (e) => {
    e.preventDefault();
    if (!e.target.anecdote.value) return;
    const newAnecdoteName = e.target.anecdote.value;
    e.target.anecdote.value = "";
    props.newAnecdote(newAnecdoteName);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  newAnecdote,
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps )(AnecdoteForm)

export default ConnectedAnecdoteForm
