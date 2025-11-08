export class AuthView {
  static renderSuccess(message) {
    console.log("✅", message);
  }

  static renderError(message) {
    console.error("❌", message);
  }
  static renderWatchlist(items) {
    const container = document.getElementById("watchlist-section");
    if (!container) return;

    if (!items || items.length === 0) {
      container.innerHTML = "<p>Your watchlist is empty.</p>";
      return;
    }

    container.innerHTML = items
      .map(
        (item) => `
        <div class="section__movie-card">
          <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${
          item.title || item.name
        }">
          <h2>${item.title || item.name}</h2>
          <p>⭐ ${item.vote_average}</p>
        </div>
      `
      )
      .join("");
  }
}
