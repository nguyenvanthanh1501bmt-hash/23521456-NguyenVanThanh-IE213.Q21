import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "../reviews/reviews.controller.js";

const router = express.Router();

// Lấy danh sách phim
router.route("/")
  .get(MoviesController.apiGetMovies);

// Thêm / sửa / xóa review
router.route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

// Lấy danh sách review theo movie id
router.route("/review/:id")
  .get(ReviewsController.apiGetReviews);

// Lấy chi tiết phim
router.route("/id/:id")
  .get(MoviesController.apiGetMovieById);

// Lấy danh sách rating
router.route("/ratings")
  .get(MoviesController.apiGetRatings);

export default router;