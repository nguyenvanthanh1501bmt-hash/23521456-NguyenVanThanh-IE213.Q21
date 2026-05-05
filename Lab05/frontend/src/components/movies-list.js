import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";

import MovieDataService from "../services/movies";

const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("All Ratings");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = (page = 0) => {
    setMessage("");

    MovieDataService.getAll(page)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies || []);
      })
      .catch((e) => {
        console.log(e);
        setMessage("Unable to load movies. Please check the backend.");
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        console.log(response.data);
        setRatings(["All Ratings"].concat(response.data || []));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const onChangeSearchRating = (e) => {
    setSearchRating(e.target.value);
  };

  const find = (query, by) => {
    setMessage("");

    MovieDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        const result = response.data.movies || [];
        setMovies(result);

        if (result.length === 0) {
          setMessage("No matching movies found.");
        }
      })
      .catch((e) => {
        console.log(e);
        setMessage("Unable to search movies.");
      });
  };

  const findByTitle = () => {
    const query = searchTitle.trim();

    if (!query) {
      retrieveMovies();
      return;
    }

    find(query, "title");
  };

  const findByRating = () => {
    if (searchRating === "All Ratings") {
      retrieveMovies();
      return;
    }

    find(searchRating, "rated");
  };

  return (
    <div>
      <Container className="page-shell">
        <Row className="search-row">
          <Col>
            <Form.Group>
              <div className="search-control">
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      findByTitle();
                    }
                  }}
                />
                <Button variant="primary" type="button" onClick={findByTitle}>
                  Search
                </Button>
              </div>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <div className="search-control">
                <Form.Control
                  as="select"
                  value={searchRating}
                  onChange={onChangeSearchRating}
                >
                  {ratings.map((rating) => (
                    <option value={rating} key={rating || "empty-rating"}>
                      {rating || "Not Rated"}
                    </option>
                  ))}
                </Form.Control>
                <Button variant="primary" type="button" onClick={findByRating}>
                  Search
                </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>

        {message && <Alert variant="info">{message}</Alert>}

        <Row className="movie-grid">
          {movies.map((movie) => (
            <Col className="pb-3" key={movie._id}>
              <Card className="movie-card" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={movie.poster}
                  alt={movie.title}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>Rating: {movie.rated}</Card.Text>
                  <Card.Text>{movie.plot || "No plot available."}</Card.Text>
                  <Link to={"/movies/" + movie._id}>View Reviews</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MoviesList;
