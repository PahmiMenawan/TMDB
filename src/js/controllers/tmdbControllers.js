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

  // TRENDING
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

  static async loadTrendingWeek(page = 1) {
    try {
      const data = await TMDBService.getTrendingWeek(page);

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

  static async loadTrending(timeWindow = "day", page = 1) {
    try {
      const data = await TMDBService.getTrending(timeWindow, page);

      const results = data.results
        .map((item) => {
          if (item.media_type === "movie") return new Movie(item);
          if (item.media_type === "tv") return new TVShow(item);
          return null;
        })
        .filter(Boolean);

      TMDBView.renderTrending(results);
    } catch (error) {
      TMDBView.renderError("Failed to load trending content.");
    }
  }

  static initEventListeners() {
    // ITEM
    const container = document.getElementById("trending-section");
    if (!container) return;

    container.addEventListener("click", (event) => {
      const card = event.target.closest(".section__movie-card");
      if (!card) return;
      const id = card.dataset.id;
      const type = card.dataset.type;

      TMDBController.loadItemDetails(type, id);
    });

    // TRENDING BUTTONS
    const todayBtn = document.getElementById("trending-today");
    const weekBtn = document.getElementById("trending-week");

    if (!todayBtn || !weekBtn) return;

    todayBtn.addEventListener("click", (e) => {
      e.preventDefault();
      TMDBController.loadTrending("day");
      TMDBView.setActiveTrendingButton("day");
    });
    
    weekBtn.addEventListener("click", (e) => {
      e.preventDefault();
      TMDBController.loadTrending("week");
      TMDBView.setActiveTrendingButton("week");
    });
  }



  static async loadItemDetails(type, id) {
    try {
      const data = await TMDBService.getItemDetails(type, id);
      // let result;
      // if (type === "movie") {
      //   result = new Movie(data);
      // } else if (type === "tv") {
      //   result = new TVShow(data);
      // } else {
      //   throw new Error("Unknown media type");
      // }
      TMDBView.renderDetails(data);
    } catch (error) {
      TMDBView.renderError("Failed to load item details.");
    }
  }
}
