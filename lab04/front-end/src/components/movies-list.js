import React, { useState, useEffect } from "react";
import MovieDataService from "./movie";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("All Ratings");
  const [ratings, setRatings] = useState(["All Ratings"]);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => console.log(error));
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        setRatings(["All Ratings", ...response.data]);
      })
      .catch((error) => console.log(error));
  };

  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => console.log(error));
  };

  const findByTitle = () => {
    const keyword = searchTitle.trim();

    if (!keyword) {
      retrieveMovies();
      return;
    }

    find(keyword, "title");
  };

  const findByRating = () => {
    if (
      searchRating === "All Ratings" ||
      searchRating === ""
    ) {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  // FIX: đúng API review theo movie id
  const getMoviesReviews = (id) => {
    MovieDataService.getReview(id)
      .then((response) => {
        console.log("Reviews:", response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container className="mt-4">

      {/* Search */}
      <Row className="mb-4">

        <Col lg={6}>
          <Form.Group className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search by title"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") findByTitle();
              }}
            />

            <Button className="ms-2" onClick={findByTitle}>
              Search
            </Button>
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group className="d-flex">
            <Form.Select
              value={searchRating}
              onChange={(e) => setSearchRating(e.target.value)}
            >
              {ratings.map((rating, index) => (
                <option key={index} value={rating}>
                  {rating}
                </option>
              ))}
            </Form.Select>

            <Button className="ms-2" onClick={findByRating}>
              Filter
            </Button>
          </Form.Group>
        </Col>

      </Row>

      {/* Movies */}
      <Row>
        {movies.map((movie) => (
          <Col
            key={movie._id}
            lg={4}
            md={6}
            sm={12}
            className="mb-4"
          >
            <Card className="h-100 shadow-sm">
              <Card.Body>

                <Card.Title>{movie.title}</Card.Title>

                <Card.Text>
                  <strong>Rating:</strong> {movie.rated}
                </Card.Text>

                <Card.Text>
                  {movie.plot
                    ? movie.plot.substring(0, 120) + "..."
                    : "No description"}
                </Card.Text>

                {/* CHỈ NAVIGATE, KHÔNG CALL API Ở LIST */}
                <Link
                  to={`/movies/${movie._id}`}
                  className="btn btn-outline-primary"
                >
                  View Reviews
                </Link>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </Container>
  );
};

export default MoviesList;