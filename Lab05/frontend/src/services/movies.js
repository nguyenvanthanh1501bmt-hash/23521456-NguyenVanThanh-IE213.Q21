import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/v1/movies";

class MovieDataService {
  getAll(page = 0) {
    return axios.get(API_BASE_URL, {
      params: { page },
    });
  }

  get(id) {
    return axios.get(`${API_BASE_URL}/id/${id}`);
  }

  find(query, by = "title", page = 0) {
    return axios.get(API_BASE_URL, {
      params: { [by]: query, page },
    });
  }

  createReview(data) {
    return axios.post(`${API_BASE_URL}/review`, data);
  }

  updateReview(data) {
    return axios.put(`${API_BASE_URL}/review`, data);
  }

  deleteReview(id, userId) {
    return axios.delete(`${API_BASE_URL}/review`, {
      data: {
        review_id: id,
        user_id: userId,
      },
    });
  }

  getRatings() {
    return axios.get(`${API_BASE_URL}/ratings`);
  }
}

const movieDataService = new MovieDataService();

export default movieDataService;
