import express from 'express';
import MoviesController from './movies.controller.js';
import ReviewsController from '../reviews/reviews.controller.js';

const router = express.Router();

// Lấy danh sách phim
router.route('/').get(MoviesController.apiGetMovies);

// Các thao tác với Review (Thêm, Sửa, Xóa)
router.route('/review')
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview);

// Lấy chi tiết phim và danh sách Ratings
router.route("/id/:id").get(MoviesController.apiGetMovieById);
router.route("/ratings").get(MoviesController.apiGetRatings);

export default router;