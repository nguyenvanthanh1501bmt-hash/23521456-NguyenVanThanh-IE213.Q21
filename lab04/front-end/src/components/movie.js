import axios from "axios";

class MovieDataService {
  getAll(page = 0) {
    return axios.get(`http://localhost:8000/api/v1/movies?page=${page}`);
  }

  get(id) {
    return axios.get(`http://localhost:8000/api/v1/movies/id/${id}`);
  }

  find(query, by = "title", page = 0) {
    return axios.get(
      `http://localhost:8000/api/v1/movies?${by}=${query}&page=${page}`
    );
  }

  getRatings() {
    return axios.get(`http://localhost:8000/api/v1/movies/ratings`);
  }

  // FIX: lấy review theo movie id
  getReview(id) {
    return axios.get(
      `http://localhost:8000/api/v1/movies/review/${id}`
    );
  }
}

export default new MovieDataService();