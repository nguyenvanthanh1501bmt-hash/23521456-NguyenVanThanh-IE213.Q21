import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import AddReview from "./components/add-review";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState({ name: "Thanh", id: "23521456" });

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <Router>
      <Navbar bg="light" expand="lg" className="app-navbar">
        <Navbar.Brand>Movie Reviews</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/movies"}>Movies</Nav.Link>

            {user ? (
              <Nav.Item className="nav-link">
                <span className="nav-user">
                  <span>{user.name}</span>
                  <button type="button" className="nav-logout" onClick={logout}>
                    Logout
                  </button>
                </span>
              </Nav.Item>
            ) : (
              <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path={["/", "/movies"]} component={MoviesList} />

        <Route
          path="/movies/:id/review"
          render={(props) => <AddReview {...props} user={user} />}
        />

        <Route
          path="/movies/:id"
          render={(props) => <Movie {...props} user={user} />}
        />

        <Route
          path="/login"
          render={(props) => <Login {...props} login={login} />}
        />

      </Switch>

    </Router>
  );
}

export default App;
