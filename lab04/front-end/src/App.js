import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";

import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  function login(user = null) {
    setUser(user);
  }

  function logout() {
    setUser(null);
  }

  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/movies">
          Movie Reviews
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">

            <Nav.Link as={Link} to="/movies">
              Movies
            </Nav.Link>

            {user ? (
              <Nav.Link onClick={logout} style={{ cursor: "pointer" }}>
                Logout User
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}

          </Nav>

        </Navbar.Collapse>
      </Navbar>

      <Switch>

        <Route exact path={["/", "/movies"]}>
          <MoviesList />
        </Route>

        <Route path="/movies/:id/review">
          <AddReview user={user} />
        </Route>

        <Route path="/movies/:id">
          <Movie user={user} />
        </Route>

        <Route path="/login">
          <Login login={login} />
        </Route>

      </Switch>

    </div>
  );
}

export default App;