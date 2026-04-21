import React, { useState } from "react";
import MovieDataService from "./movie";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddReview = props => {
  let initialReviewState = "";
  let editing = false;

  // Kiểm tra nếu đang ở chế độ chỉnh sửa (nhận dữ liệu từ trang Movie truyền sang)
  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.review;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      review: review,
      name: props.user.name,
      user_id: props.user.id,
      movie_id: props.match.params.id
    };

    if (editing) {
      data.review_id = props.location.state.currentReview._id;
      MovieDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <div className="container mt-3">
      {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>Review submitted successfully!</h4>
              <Link to={"/movies/" + props.match.params.id} className="btn btn-success">
                Back to Movie
              </Link>
            </div>
          ) : (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>{editing ? "Edit" : "Create"} Review</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button onClick={saveReview} variant="primary">
                Submit
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Vui lòng đăng nhập để thêm đánh giá.</p>
        </div>
      )}
    </div>
  );
};

export default AddReview;