import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
  static async apiGetMovies(req, res) {
    const moviesPerPage = parseInt(req.query.moviesPerPage) || 20;
    const page = parseInt(req.query.page) || 0;

    const filters = {};
    if (req.query.rated) filters.rated = req.query.rated;
    if (req.query.title) filters.title = req.query.title;

    try {
      const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
        filters,
        page,
        moviesPerPage
      });

      return res.json({
        movies: moviesList,
        page,
        filters,
        entries_per_page: moviesPerPage,
        total_results: totalNumMovies,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}