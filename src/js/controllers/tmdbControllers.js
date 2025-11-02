import { TMDBService } from "../services/tmdbService.js";
import { Movie } from "../models/Movie.js";
import { TVShow } from "../models/TVShow.js";
import { TMDBView } from "../views/tmdbView.js";

export class TMDBController {
  // TRENDING
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
  // POPULAR
  static async loadPopular(type = "movie", page = 1) {
    try {
      const data = await TMDBService.getPopular(type, page);

      const results = data.results
        .map((item) => {
          if (type === "movie") return new Movie(item);
          if (type === "tv") return new TVShow(item);
          return null;
        })
        .filter(Boolean);

      TMDBView.renderPopular(results);
    } catch (error) {
      TMDBView.renderError("Failed to load trending content.");
    }
  }
  // TOP RATED
  static async loadTopRated(type = "movie", page = 1) {
    try {
      const data = await TMDBService.getTopRated(type, page);

      const results = data.results
        .map((item) => {
          if (type === "movie") return new Movie(item);
          if (type === "tv") return new TVShow(item);
          return null;
        })
        .filter(Boolean);

      TMDBView.renderTopRated(results);
    } catch (error) {
      TMDBView.renderError("Failed to load trending content.");
    }
  }
  // NOW PLAYING
  static async loadNowPlaying(page = 1) {
    try {
      const data = await TMDBService.getNowPlaying(page);
      const movies = data.results.map((t) => new Movie(t));

      TMDBView.renderNowPlaying(movies);
    } catch (error) {
      TMDBView.renderError("Failed to load trending content.");
    }
  }

  static async loadAiringToday(page = 1) {
    try {
      const data = await TMDBService.getAiringToday(page);
      const tv = data.results.map((t) => new TVShow(t));

      TMDBView.renderNowPlaying(tv);
    } catch (error) {
      TMDBView.renderError("Failed to load trending content.");
    }
  }

  static initEventListeners() {
    // ITEM DETAILS
    const container = document.querySelectorAll(".section__items");
    if (!container) return;

    container.forEach((container) => {
      container.addEventListener("click", (event) => {
        const card = event.target.closest(".section__movie-card");
        if (!card) return;
        const id = card.dataset.id;
        const type = card.dataset.type;

        TMDBController.loadItemDetails(type, id);
      });
    });

    // SECTION SELECTORS
    // TRENDING CHIPS
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

    // POPULAR CHIPS
    const streamingBtn = document.getElementById("popular-movie");
    const onTvBtn = document.getElementById("popular-tv");
    streamingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      TMDBController.loadPopular("movie");
      TMDBView.setActivePopularButton("movie");
    });

    onTvBtn.addEventListener("click", (e) => {
      e.preventDefault();
      TMDBController.loadPopular("tv");
      TMDBView.setActivePopularButton("tv");
    });
    // POPULAR CHIPS
    const popularMovieBtn = document.getElementById("popular-movie");
    const popularTvBtn = document.getElementById("popular-tv");
    popularMovieBtn.addEventListener("click", (e) => {
      e.preventDefault();
      TMDBController.loadTopRated("movie");
      TMDBView.setActiveTopRatedButton("movie");
    });

    popularTvBtn.addEventListener("click", (e) => {
      e.preventDefault();
      TMDBController.loadTopRated("tv");
      TMDBView.setActiveTopRatedButton("tv");
    });

    // TOP RATED
    const movieRatedBtn = document.getElementById("top-rated-movie");
    const tvRatedBtn = document.getElementById("top-rated-tv");
    movieRatedBtn.addEventListener("click", (e) => {
      e.preventDefault();
      TMDBController.loadTopRated("movie");
      TMDBView.setActiveTopRatedButton("movie");
    });

    tvRatedBtn.addEventListener("click", (e) => {
      e.preventDefault();
      TMDBController.loadTopRated("tv");
      TMDBView.setActiveTopRatedButton("tv");
    });
    
    // NOW PLAYING
    const nowPlayingBtn = document.getElementById("now-playing-movie");
    const airTodayBtn = document.getElementById("now-playing-tv");
    nowPlayingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      TMDBController.loadNowPlaying();
      TMDBView.setActiveNowPlayingButton("movie");
    });

    airTodayBtn.addEventListener("click", (e) => {
      e.preventDefault();
      TMDBController.loadAiringToday();
      TMDBView.setActiveNowPlayingButton("tv");
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
