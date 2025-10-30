import { TMDBService } from "../services/tmdbService.js";
import { Movie } from "../models/Movie.js";
import { TVShow } from "../models/TVShow.js";
import { TMDBView } from "../views/tmdbView.js";

export class TMDBController {
  static async loadDiscoverMovies(page = 1) {
    try {
      const data = await TMDBService.getDiscoverMovies(page);
      const movies = data.results.map((m) => new Movie(m));
      TMDBView.renderMovies(movies);
    } catch (error) {
      TMDBView.renderError("Failed to load movies.");
    }
  }

  static async loadDiscoverTVShows(page = 1) {
    try {
      const data = await TMDBService.getDiscoverTVShows(page);
      const tvShows = data.results.map((t) => new TVShow(t));
      TMDBView.renderTVShows(tvShows);
    } catch (error) {
      TMDBView.renderError("Failed to load TV shows.");
    }
  }

  static async loadTrendingDay(page = 1) {
    try {
      const data = await TMDBService.getTrendingDay(page);

      const results = data.results
        .map((item) => {
          if (item.media_type === "movie") {
            return new Movie(item);
          } else if (item.media_type === "tv") {
            return new TVShow(item);
          }
          return null;
        })
        .filter(Boolean);

      TMDBView.renderTrending(results);
    } catch (error) {
      TMDBView.renderError("Failed to load trending content.");
    }
  }

  static async loadItemDetails(type, id) {
    try {
      const data = await TMDBService.getItemDetails(type, id);
      TMDBView.renderDetails(data);
    } catch (error) {
      TMDBView.renderError("Failed to load item details.");
    }
  }

}
