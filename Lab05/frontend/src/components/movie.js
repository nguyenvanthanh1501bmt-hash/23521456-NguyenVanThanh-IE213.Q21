import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";

import MovieDataService from "../services/movies";

const posterFallback =
  "https://placehold.co/300x450/1f2937/f8fafc?text=No+Poster";

const Movie = (props) => {
  const [movie, setMovie] = useState({
    _id: null,
    title: "",
    rated: "",
    plot: "",
    poster: "",
    reviews: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getMovie = (id) => {
    setLoading(true);
    setMessage("");

    MovieDataService.get(id)
      .then((response) => {
        console.log(response.data);
        setMovie({
          reviews: [],
          ...response.data,
        });
      })
      .catch((e) => {
        console.log(e);
        setMessage("Unable to load movie details.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId) => {
    MovieDataService.deleteReview(reviewId, props.user.id)
      .then(() => {
        setMovie((currentMovie) => ({
          ...currentMovie,
          reviews: currentMovie.reviews.filter(
            (review) => review._id !== reviewId
          ),
        }));
      })
      .catch((e) => {
        console.log(e);
        setMessage("Unable to delete this review.");
      });
  };

  if (loading) {
    return (
      <Container className="page-shell">
        <div className="loading-state">
          <Spinner animation="border" role="status" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="page-shell">
      {message && <Alert variant="warning">{message}</Alert>}

      <Row className="movie-detail g-4">
        <Col md={4} lg={3}>
          <Image
            src={movie.poster || posterFallback}
            alt={movie.title}
            fluid
            className="movie-poster"
            onError={(e) => {
              e.currentTarget.src = posterFallback;
            }}
          />
        </Col>

        <Col md={8} lg={9}>
          <Card className="movie-info">
            <Card.Header>
              <div>
                <h1>{movie.title}</h1>
                {movie.rated && <Badge bg="secondary">{movie.rated}</Badge>}
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>{movie.plot || "No plot available."}</Card.Text>
              {props.user ? (
                <Button
                  as={Link}
                  to={`/movies/${props.match.params.id}/review`}
                  variant="primary"
                  size="sm"
                >
                  Add Review
                </Button>
              ) : (
                <Button as={Link} to="/login" variant="outline-primary" size="sm">
                  Login to Review
                </Button>
              )}
            </Card.Body>
          </Card>

          <section className="reviews-section">
            <h2>Reviews</h2>

            {movie.reviews.length === 0 ? (
              <Alert variant="light">No reviews yet for this movie.</Alert>
            ) : (
              movie.reviews.map((review) => (
                <Card className="review-item" key={review._id}>
                  <Card.Body>
                    <div className="review-header">
                      <div>
                        <h3>{review.name}</h3>
                        <span>
                          reviewed on {moment(review.date).format("Do MMMM YYYY")}
                        </span>
                      </div>
                    </div>
                    <p>{review.review}</p>

                    {props.user && props.user.id === review.user_id && (
                      <div className="review-actions">
                        <Button
                          as={Link}
                          to={{
                            pathname: `/movies/${props.match.params.id}/review`,
                            state: { currentReview: review },
                          }}
                          variant="outline-primary"
                          size="sm"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteReview(review._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))
            )}
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Movie;
