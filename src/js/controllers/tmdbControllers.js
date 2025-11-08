import { TMDBService } from "../services/tmdbService.js";
import { Movie } from "../models/Movie.js";
import { TVShow } from "../models/TVShow.js";
import { Person } from "../models/Person.js";
import { TMDBView } from "../views/tmdbView.js";

export class TMDBController {
  // ====================== HOMEPAGE SECTIONS ====================== //
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

  // ====================== DETAILS SECTIONS ====================== //
  // ITEM DETAILS
  static async loadDetailsPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const type = params.get("type");

    if (!id || !type) {
      TMDBView.renderError("Invalid URL parameters");
      return;
    }

    try {
      console.log("Fetching details for:", { type, id });
      const data = await TMDBService.getItemDetails(type, id);
      console.log("Details fetched:", data);

      let result;
      if (type === "movie") {
        result = new Movie(data);
      } else if (type === "tv") {
        result = new TVShow(data);
      } else {
        throw new Error("Unknown media type");
      }

      console.log("Model created:", result);
      TMDBView.renderDetails(result);
      TMDBController.initWatchlistButton(type, id);
    } catch (error) {
      console.error("Details loading error:", error);
      TMDBView.renderError("Failed to load item details.");
    }
  }
  // ITEM'S CAST
  static async loadItemCredits() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const type = params.get("type");

    if (!id || !type) {
      TMDBView.renderError("Invalid URL parameters");
      return;
    }

    try {
      const data = await TMDBService.getItemCredits(type, id);

      const cast = data.cast.map((c) => new Person(c));

      TMDBView.renderCredits(cast);
    } catch (error) {
      TMDBView.renderError("Failed to load credits.");
    }
  }
  // ITEM'S RECOMENDTAION
  static async loadItemRecommendation() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const type = params.get("type");

    if (!id || !type) {
      TMDBView.renderError("Invalid URL parameters");
      return;
    }

    try {
      const data = await TMDBService.getItemRecommendation(type, id);

      const result = data.results
        .map((item) => {
          if (type === "movie") return new Movie(item);
          if (type === "tv") return new TVShow(item);
          return null;
        })
        .filter(Boolean);

      TMDBView.renderRecommendation(result);
    } catch (error) {
      TMDBView.renderError("Failed to load recommend.");
    }
  }

  // ====================== SEARCH / DISCOVER ====================== //
  static async loadSearchResults() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    const type = params.get("type") || "multi";

    if (!query) {
      TMDBView.renderError("No search query provided.");
      return;
    }

    try {
      const data = await TMDBService.searchItems(query, type);
      const results = data.results
        .map((item) => {
          if (item.media_type === "movie") return new Movie(item);
          if (item.media_type === "tv") return new TVShow(item);
          return null;
        })
        .filter(Boolean);

      TMDBView.renderSearch(results);
    } catch (error) {
      TMDBView.renderError("Failed to load search results.");
    }
  }

  // ====================== FILTERED ====================== //

  static async loadDiscoverResults(filters = {}) {
    try {
      const data = await TMDBService.discoverItems(filters);
      const results = data.results
        .map((item) => {
          if (filters.type === "movie") return new Movie(item);
          if (filters.type === "tv") return new TVShow(item);
          return null;
        })
        .filter(Boolean);

      TMDBView.renderSearch(results);
    } catch (error) {
      TMDBView.renderError("Failed to load discover results.");
    }
  }

  static async populateGenresAndLanguages(type = "movie") {
    try {
      // GENRES
      const genreData = await TMDBService.getGenres(type);
      const genreSelect = document.getElementById("genre-select");
      if (genreSelect && genreData.genres) {
        genreSelect.innerHTML =
          `<option value="">All Genres</option>` +
          genreData.genres
            .map((g) => `<option value="${g.id}">${g.name}</option>`)
            .join("");
      }

      // LANGUAGES
      const langData = await TMDBService.getLanguages();
      const langSelect = document.getElementById("languages-select");
      if (langSelect && langData) {
        langSelect.innerHTML =
          `<option value="">All Languages</option>` +
          langData
            .map(
              (l) => `<option value="${l.iso_639_1}">${l.english_name}</option>`
            )
            .join("");
      }
    } catch (error) {
      TMDBView.renderError("Failed to load genres or languages.");
    }
  }

  // ====================== EVENT LISTENER ====================== //
  static initEventListeners() {
    const container = document.querySelectorAll(
      ".section__items, #discover-results, #recommend-section"
    );
    if (!container) return;

    container.forEach((container) => {
      container.addEventListener("click", (event) => {
        const card = event.target.closest(".section__movie-card");
        if (!card) return;
        const id = card.dataset.id;
        const type = card.dataset.type;

        window.location.href = `details.html?type=${type}&id=${id}`;
      });
    });

    // ====================== EVENT LISTENER - SECTION SELECTORS ====================== //
    // TRENDING CHIPS
    const todayBtn = document.getElementById("trending-today");
    const weekBtn = document.getElementById("trending-week");
    if (todayBtn && weekBtn) {
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

    // POPULAR CHIPS
    const streamingBtn = document.getElementById("popular-movie");
    const onTvBtn = document.getElementById("popular-tv");
    if (streamingBtn && onTvBtn) {
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
    }

    // TOP RATED CHIPS
    const movieRatedBtn = document.getElementById("top-rated-movie");
    const tvRatedBtn = document.getElementById("top-rated-tv");
    if (movieRatedBtn && tvRatedBtn) {
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
    }

    // NOW PLAYING
    const nowPlayingBtn = document.getElementById("now-playing-movie");
    const airTodayBtn = document.getElementById("now-playing-tv");
    if (nowPlayingBtn && airTodayBtn) {
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
    // ====================== SEARCH BARS ====================== //
    const searchInputs = document.querySelectorAll(
      ".navbar__search input, .hero__search input"
    );

    searchInputs.forEach((input) => {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const query = input.value.trim();
          if (query) {
            window.location.href = `discover.html?query=${encodeURIComponent(
              query
            )}&type=multi`;
          }
        }
      });
    });
  }
  static async initWatchlistButton(type, id) {
    const btn = document.querySelector(".details__title button");
    if (!btn) return;

    btn.addEventListener("click", async () => {
      const { sessionId, accountId } = await this.authenticateUser();
      if (!sessionId || !accountId) return;

      await TMDBService.addToWatchlist(accountId, sessionId, type, id, true);
      alert("Added to your Watchlist!");
    });
  }

  static async authenticateUser() {
    const sessionId = localStorage.getItem("session_id");
    const accountId = localStorage.getItem("account_id");
    if (sessionId && accountId) return { sessionId, accountId };

    const tokenData = await TMDBService.getRequestToken();
    const requestToken = tokenData.request_token;

    alert("You will be redirected to TMDB to approve this app.");
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/watchlist.html`;
  }
}
