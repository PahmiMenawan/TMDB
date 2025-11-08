import { TMDBService } from "./services/tmdbService.js";
import { Movie } from "./models/Movie.js";
import { TVShow } from "./models/TVShow.js";
import { TMDBView } from "./views/tmdbView.js";

document.addEventListener("DOMContentLoaded", async () => {
  let sessionId = localStorage.getItem("session_id");
  let accountId = localStorage.getItem("account_id");

  // If returning from TMDB auth redirect
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

  // Load initial watchlist (movies by default)
  loadWatchlist("movies");

  document.getElementById("watchlist-movies").addEventListener("click", (e) => {
    e.preventDefault();
    loadWatchlist("movies");
  });

  document.getElementById("watchlist-tv").addEventListener("click", (e) => {
    e.preventDefault();
    loadWatchlist("tv");
  });

  async function loadWatchlist(type) {
    const data = await TMDBService.getWatchlist(accountId, sessionId, type);
    const results = data.results.map((item) =>
      type === "movies" ? new Movie(item) : new TVShow(item)
    );

    TMDBView.renderWatchlist(results);
  }
});
