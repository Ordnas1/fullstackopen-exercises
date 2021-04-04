import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const Login = ({ show, setToken, setPage }) => {
  // State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Apollo Mutations
  const [login, result] = useMutation(LOGIN);

  // Event Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      console.log(token);
      setToken(token);
      localStorage.setItem("library-session-token", token);
      setPage("authors");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data, setToken]); 
  return show ? (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Log In</button>
      </form>
    </div>
  ) : null;
};

export default Login;
