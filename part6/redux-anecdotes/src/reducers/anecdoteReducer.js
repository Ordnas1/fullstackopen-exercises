import anecdoteService from "../services/anecdote";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTE",
      data: anecdotes,
    });
  };
};

export const incrementVote = (anecdote) => {
  return async (dispatch) => {
    dispatch({
      type: "VOTE",
      data: {
        id: anecdote.id,
      },
    });
    await anecdoteService.update(anecdote, anecdote.id);
  };
};

export const newAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.create(asObject(anecdote));
    dispatch({
      type: "NEW_ANECDOTE",
      data: asObject(anecdote),
    });
  };
};

const initialState = [];

const anecdoteReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "INIT_ANECDOTE":
      return action.data;

    case "VOTE":
      const newState = [...state];
      const anecdote = newState.find(
        (anecdote) => anecdote.id === action.data.id
      );
      anecdote.votes++;
      return newState;

    case "NEW_ANECDOTE":
      return [...state, action.data];
    default:
      return state;
  }
};

export default anecdoteReducer;
