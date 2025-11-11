import { TMDBService } from "../services/tmdbService.js";
import { Movie } from "../models/Movie.js";
import { TVShow } from "../models/TVShow.js";
import { Person } from "../models/Person.js";
import { TMDBView } from "../views/tmdbView.js";

export class TMDBController {
  static currentPage = 1;
  static totalPages = 1;
  static currentQuery = "";
  static currentType = "movie";
  static currentMode = "search";
  static isLocked = false;

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
      // console.log("Fetching details for:", { type, id });
      const data = await TMDBService.getItemDetails(type, id);
      // console.log("Details fetched:", data);

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
  static async loadDiscover() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    const type = params.get("type") || "movie";
    const header = document.getElementById("discoverHeader");
    if (type == "movie") {
      header.innerHTML = "Discover Movies";
      document.title = "Discover Movies";
    } else if (type == "tv") {
      header.innerHTML = "Discover Tv Shows";
      document.title = "Discover Tv Shows";
    } else {
      header.innerHTML = "Discover";
    }
    await TMDBController.populateGenresAndLanguages(type);

    if (query) {
      header.innerHTML = `Discover "${query}"`;
      document.title = `Discover "${query}"`;
      TMDBController.loadSearchResults();
    } else {
      TMDBController.loadDiscoverResults({ type });
    }
  }
  static async loadSearchResults(page = 1, append = false) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    const type = params.get("type") || "multi";

    if (!query) {
      TMDBView.renderError("No search query provided.");
      return;
    }

    try {
      this.isLocked = true;
      const data = await TMDBService.searchItems(query, type, page);
      const results = data.results
        .map((item) => {
          if (item.media_type === "movie") return new Movie(item);
          if (item.media_type === "tv") return new TVShow(item);
          return null;
        })
        .filter(Boolean);

      TMDBController.currentPage = data.page;
      TMDBController.totalPages = data.total_pages;
      TMDBController.currentQuery = query;
      TMDBController.currentType = type;
      TMDBController.currentMode = "search";

      TMDBView.renderSearch(results, append);
      TMDBView.renderLoadMoreButton(
        TMDBController.currentPage,
        TMDBController.totalPages
      );
    } catch (error) {
      TMDBView.renderError("Failed to load search results.");
    } finally {
      this.isLocked = false;
    }
  }

  // FILTERS
  static async loadDiscoverResults(filters = {}, page = 1, append = false) {
    try {
      const data = await TMDBService.discoverItems({ ...filters, page });
      const results = data.results
        .map((item) => {
          if (filters.type === "movie") return new Movie(item);
          if (filters.type === "tv") return new TVShow(item);
          return null;
        })
        .filter(Boolean);

      TMDBController.currentPage = data.page;
      TMDBController.totalPages = data.total_pages;
      TMDBController.currentFilters = filters;
      TMDBController.currentMode = "discover";

      TMDBView.renderSearch(results, append);
      TMDBView.renderLoadMoreButton(
        TMDBController.currentPage,
        TMDBController.totalPages
      );
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
  // ====================== WATCHLIST ====================== //
  static async loadWatchlist(type) {
    let sessionId = localStorage.getItem("session_id");
    let accountId = localStorage.getItem("account_id");

    const params = new URLSearchParams(window.location.search);
    const approvedToken = params.get("request_token");

    if (approvedToken && !sessionId) {
      const sessionData = await TMDBService.createSession(approvedToken);
      sessionId = sessionData.session_id;
      localStorage.setItem("session_id", sessionId);

      const accountData = await TMDBService.getAccountDetails(sessionId);
      accountId = accountData.id;
      localStorage.setItem("account_id", accountId);
    }
    const data = await TMDBService.getWatchlist(accountId, sessionId, type);
    const results = data.results.map((item) =>
      type === "movies" ? new Movie(item) : new TVShow(item)
    );
    TMDBView.renderWatchlist(results);
  }

  // ====================== EVENT LISTENERS ====================== //
  // Homepage chips
  static initHomePageEvent() {
    // TRENDING CHIPS
    const todayBtn = document.getElementById("trending-today");
    const weekBtn = document.getElementById("trending-week");
    if (todayBtn && weekBtn) {
      todayBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.isLocked) return;
        TMDBController.loadTrending("day");
        TMDBView.setActiveTrendingButton("day");
      });
      weekBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.isLocked) return;
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
        if (this.isLocked) return;
        TMDBController.loadPopular("movie");
        TMDBView.setActivePopularButton("movie");
      });

      onTvBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.isLocked) return;
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

    // NOW PLAYING CHIPS
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
  }

  // Watchlist chips
  static initWatchlistEvent() {
    // WATCHLIST CHIPS
    const watchListMovieBtn = document.getElementById("watchlist-movies");
    const watchListTvBtn = document.getElementById("watchlist-tv");
    if (watchListMovieBtn && watchListTvBtn) {
      watchListMovieBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.isLocked) return;
        TMDBController.loadWatchlist("movies");
        TMDBView.setActiveWatchListButton("movie");
      });

      watchListTvBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.isLocked) return;
        TMDBController.loadWatchlist("tv");
        TMDBView.setActiveWatchListButton("tv");
      });
    }
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (this.isLocked) return;
        await TMDBController.logoutUser();
      });
    }
  }

  // Searchbar
  static initSearchBarEvent() {
    // ====================== SEARCH BARS ====================== //
    const searchInputs = document.querySelectorAll(
      ".navbar__search input, .hero__search input"
    );
    const searchBtn = document.getElementById("searchBtn");

    searchInputs.forEach((input) => {
      searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.isLocked) return;
        const query = input.value.trim();
        if (query) {
          window.location.href = `discover.html?query=${encodeURIComponent(
            query
          )}&type=multi`;
        }
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          if (this.isLocked) return;
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
  static initDetailsEvent() {
    const container = document.querySelectorAll(
      ".section__items, #discover-results, #recommend-section"
    );
    if (!container) return;

    container.forEach((container) => {
      container.addEventListener("click", (event) => {
        if (this.isLocked) return;
        const card = event.target.closest(".section__movie-card");
        if (!card) return;
        const id = card.dataset.id;
        const type = card.dataset.type;

        window.location.href = `details.html?type=${type}&id=${id}`;
      });
    });
  }
  static async initWatchlistButton(type, id) {
    const btn = document.querySelector(".details__title button");
    if (!btn) return;

    const { sessionId, accountId } = await this.authenticateUser();
    if (!sessionId || !accountId) return;

    const state = await TMDBService.isInWatchlist(
      accountId,
      sessionId,
      type,
      id
    );
    let isInWatchlist = state.watchlist;

    btn.textContent = isInWatchlist
      ? "Remove from Watchlist"
      : "Add to Watchlist";

    btn.addEventListener("click", async () => {
      if (this.isLocked) return;
      try {
        const newState = !isInWatchlist;
        await TMDBService.addToWatchlist(
          accountId,
          sessionId,
          type,
          id,
          newState
        );
        isInWatchlist = newState;

        btn.textContent = isInWatchlist
          ? "Remove from Watchlist"
          : "Add to Watchlist";

        alert(
          isInWatchlist
            ? "Added to your Watchlist!"
            : "Removed from your Watchlist!"
        );
      } catch (error) {
        alert("Something went wrong while updating your watchlist.");
        console.error(error);
      }
    });
  }

  // Filter
  static initApplyFilterEvent() {
    document.getElementById("apply-filters").addEventListener("click", () => {
      if (this.isLocked) return;
      const params = new URLSearchParams(window.location.search);
      const type = params.get("type") || "movie";
      const filters = {
        type: type,
        sortBy: document.getElementById("sort-by").value,
        genre: document.getElementById("genre-select").value,
        releaseFrom: document.getElementById("release-from").value,
        releaseTo: document.getElementById("release-to").value,
        language: document.getElementById("languages-select").value,
      };

      TMDBController.loadDiscoverResults(filters);
    });
  }

  // ====================== AUTH ====================== //
  static async authenticateUser() {
    const sessionId = localStorage.getItem("session_id");
    const accountId = localStorage.getItem("account_id");
    if (sessionId && accountId) return { sessionId, accountId };

    const tokenData = await TMDBService.getRequestToken();
    const requestToken = tokenData.request_token;

    alert("You will be redirected to TMDB to approve this app.");
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/watchlist.html`;
  }

  static async logoutUser() {
    const sessionId = localStorage.getItem("session_id");

    if (!sessionId) {
      alert("You're not logged in.");
      return;
    }

    try {
      await TMDBService.deleteSession(sessionId);

      localStorage.removeItem("session_id");
      localStorage.removeItem("account_id");

      alert("You’ve been logged out successfully.");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  }
}
