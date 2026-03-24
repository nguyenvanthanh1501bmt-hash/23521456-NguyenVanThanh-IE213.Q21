let movies;

export default class MoviesDAO {
  static async injectDB(conn) {
    if (movies) return;

    try {
      movies = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("movies");
    } catch (e) {
      console.error(`Unable to connect in MoviesDAO: ${e}`);
    }
  }

  static async getMovies({ filters = {}, page = 0, moviesPerPage = 20 } = {}) {
    let query = {};

    // Build query
    if (filters.title) {
      query = { $text: { $search: filters.title } };
    } 
    
    if (filters.rated) {
      query = { rated: filters.rated };
    }

    try {
      const cursor = movies
        .find(query)
        .limit(moviesPerPage)
        .skip(page * moviesPerPage);

      const moviesList = await cursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);

      return { moviesList, totalNumMovies };
    } catch (e) {
      console.error(`Error in getMovies: ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }
}