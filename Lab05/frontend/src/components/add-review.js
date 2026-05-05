import React from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";

import MovieDataService from "../services/movies";

function AddReview(props) {
  const editing = Boolean(props.location.state?.currentReview);
  const currentReview = props.location.state?.currentReview;
  const [review, setReview] = React.useState(currentReview?.review || "");
  const [submitted, setSubmitted] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const onChangeReview = (e) => {
    setReview(e.target.value);
  };

  const saveReview = (e) => {
    e.preventDefault();
    setMessage("");

    if (!review.trim()) {
      setMessage("Please enter a review.");
      return;
    }

    const data = {
      review: review.trim(),
      movie_id: props.match.params.id,
      name: props.user.name,
      user_id: props.user.id,
    };

    const request = editing
      ? MovieDataService.updateReview({
          ...data,
          review_id: currentReview._id,
        })
      : MovieDataService.createReview(data);

    request
      .then(() => {
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
        setMessage("Unable to save review.");
      });
  };

  if (!props.user) {
    return (
      <Container className="page-shell narrow-shell">
        <Alert variant="warning">You need to login to write a review.</Alert>
        <Button as={Link} to="/login" variant="primary">
          Login
        </Button>
      </Container>
    );
  }

  return (
    <Container className="page-shell narrow-shell">
      <Card className="form-card">
        <Card.Body>
          <Card.Title>{editing ? "Edit Review" : "Add Review"}</Card.Title>

          {message && <Alert variant="warning">{message}</Alert>}

          {submitted ? (
            <div className="submitted-state">
              <Alert variant="success">
                Review was {editing ? "updated" : "added"} successfully.
              </Alert>
              <Button
                as={Link}
                to={`/movies/${props.match.params.id}`}
                variant="primary"
              >
                Back to Movie
              </Button>
            </div>
          ) : (
            <Form onSubmit={saveReview}>
              <Form.Group className="mb-3" controlId="review">
                <Form.Label>Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={review}
                  onChange={onChangeReview}
                  placeholder="Write your review"
                />
              </Form.Group>

              <div className="form-actions">
                <Button
                  as={Link}
                  to={`/movies/${props.match.params.id}`}
                  variant="outline-secondary"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddReview;
