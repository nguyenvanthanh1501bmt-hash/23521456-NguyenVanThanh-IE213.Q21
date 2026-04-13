import mongodb from "mongodb";
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
  
  static async getMovieById(id) {
      try {
          return await movies.aggregate([
              { $match: { _id: new mongodb.ObjectId(id) } },
              {
                  $lookup: {
                      from: 'reviews',
                      localField: '_id',
                      foreignField: 'movie_id',
                      as: 'reviews'
                  }
              }
          ]).next();
      } catch (e) {
          console.error(`Something went wrong in getMovieById: ${e}`);
          throw e;
      }
  }

  static async getRatings() {
      let ratings = [];
      try {
          ratings = await movies.distinct("rated");
          return ratings;
      } catch (e) {
          console.error(`Unable to get ratings: ${e}`);
          return ratings;
      }
  }
}