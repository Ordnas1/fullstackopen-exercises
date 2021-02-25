import React from "react";

const Userform = ({handleSubmit, handleNameChange, handleNumberChange, nameValue, numberValue}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={nameValue} onChange={handleNameChange} required />
    </div>
    <div>
      number: <input value={numberValue} onChange={handleNumberChange} required />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default Userform
