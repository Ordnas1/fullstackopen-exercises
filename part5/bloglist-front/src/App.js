import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initUserList } from "./reducers/userListReducer";
import { setUser, logOutUser, login } from "./reducers/userReducer";

//Services
import blogService from "./services/blogs";

//Components
import Notification from "./components/Notification";

//Views
import BlogListView from "./views/BlogListView";
import UserInfoView from "./views/UserInfoView";
import UserDetailView from "./views/UserDetailView";
import BlogDetailView from "./views/BlogDetailView";

// Material UI
/* import { makeStyles } from "@material-ui/core/styles"; */

import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

/* const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
})); */

const App = () => {
  /* const classes = useStyles; */
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);

  /* const [blogs, setBlogs] = useState([]); */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logOut = () => {
    dispatch(logOutUser());
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      dispatch(setUser(JSON.parse(loggedUser)));
      blogService.setToken(loggedUser.token);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initUserList());
  }, [dispatch]);

  if (user === null) {
    return (
      <Container container>
        <Notification content={notification} />
        <Typography variant="h1">Log In</Typography>
        <Grid
          style={{
            height: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          container
          justify="center"
          alignItems="center"
        >
          <Paper style={{ width: "50%" }} elevation={3}>
            <form id="loginForm" onSubmit={handleLogin}>
              <div>
                username
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div>
                password
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>

              <input type="submit" value="LOG IN" />
            </form>
          </Paper>
        </Grid>
      </Container>
    );
  }

  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/users">Users info</Link>
        <span>Logged in as {user.name}</span>
        <button onClick={logOut}>Log out</button>
      </div>
      <Container>
        <Switch>
          <Route path="/users/:id">
            <UserDetailView />
          </Route>
          <Route path="/users">
            <UserInfoView />
          </Route>
          <Route path="/blogs/:id">
            <BlogDetailView />
          </Route>
          <Route path="/">
            <BlogListView />
          </Route>
        </Switch>

        <h4>Logged in as {user.name}</h4>
        <button onClick={logOut}>Log out</button>
      </Container>
    </Router>
  );
};

export default App;
