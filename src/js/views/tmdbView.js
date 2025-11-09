import { TMDBController } from "../controllers/tmdbControllers.js";
export class TMDBView {
  // ====================== HOMEPAGE ====================== //
  static renderTrending(items) {
    const container = document.getElementById("trending-section");
    if (!container) return;

    container.innerHTML = items
      .map((item) => {
        const title = item.title || item.name;
        const date = item.release_date || item.first_air_date || "Unknown";

        return `
        <div 
          class="section__movie-card"
          data-id="${item.id}"
          data-type="${item.media_type}"
        >
          <img src="${item.poster}" alt="${title}">
          <h2>${title}</h2>
          <p>${date} | ⭐ ${item.vote_average?.toFixed(1) || "?"}</p>
        </div>
      `;
      })
      .join("");
  }
  static renderPopular(items) {
    const container = document.getElementById("popular-section");
    if (!container) return;

    container.innerHTML = items
      .map((item) => {
        const title = item.title || item.name;
        const date = item.release_date || item.first_air_date || "Unknown";

        return `
        <div 
          class="section__movie-card"
          data-id="${item.id}"
          data-type="${item.media_type}"
        >
          <img src="${item.poster}" alt="${title}">
          <h2>${title}</h2>
          <p>${date} | ⭐ ${item.vote_average?.toFixed(1) || "?"}</p>
        </div>
      `;
      })
      .join("");
  }
  static renderTopRated(items) {
    const container = document.getElementById("top-rated-section");
    if (!container) return;

    container.innerHTML = items
      .map((item) => {
        const title = item.title || item.name;
        const date = item.release_date || item.first_air_date || "Unknown";

        return `
        <div 
          class="section__movie-card"
          data-id="${item.id}"
          data-type="${item.media_type}"
        >
          <img src="${item.poster}" alt="${title}">
          <h2>${title}</h2>
          <p>${date} | ⭐ ${item.vote_average?.toFixed(1) || "?"}</p>
        </div>
      `;
      })
      .join("");
  }
  static renderNowPlaying(items) {
    const container = document.getElementById("now-playing-section");
    if (!container) return;

    container.innerHTML = items
      .map((item) => {
        const title = item.title || item.name;
        const date = item.release_date || item.first_air_date || "Unknown";

        return `
        <div 
          class="section__movie-card"
          data-id="${item.id}"
          data-type="${item.media_type}"
        >
          <img src="${item.poster}" alt="${title}">
          <h2>${title}</h2>
          <p>${date} | ⭐ ${item.vote_average?.toFixed(1) || "?"}</p>
        </div>
      `;
      })
      .join("");
  }

  // ====================== SECTION CHIPS ====================== //
  // TRENDING SECTION
  static setActiveTrendingButton(mode) {
    const todayBtn = document.getElementById("trending-today");
    const weekBtn = document.getElementById("trending-week");

    if (!todayBtn || !weekBtn) return;

    if (mode === "day") {
      todayBtn.classList.add("active");
      weekBtn.classList.remove("active");
    } else {
      weekBtn.classList.add("active");
      todayBtn.classList.remove("active");
    }
  }

  // POPULAR SECTION
  static setActivePopularButton(mode) {
    const streamingBtn = document.getElementById("popular-movie");
    const onTvBtn = document.getElementById("popular-tv");

    if (!streamingBtn || !onTvBtn) return;

    if (mode === "movie") {
      streamingBtn.classList.add("active");
      onTvBtn.classList.remove("active");
    } else {
      onTvBtn.classList.add("active");
      streamingBtn.classList.remove("active");
    }
  }

  // TOP RATED SECTION
  static setActiveTopRatedButton(mode) {
    const movieBtn = document.getElementById("top-rated-movie");
    const tvBtn = document.getElementById("top-rated-tv");

    if (!movieBtn || !tvBtn) return;

    if (mode === "movie") {
      movieBtn.classList.add("active");
      tvBtn.classList.remove("active");
    } else {
      tvBtn.classList.add("active");
      movieBtn.classList.remove("active");
    }
  }

  // NOW PLAYING SECTION
  static setActiveNowPlayingButton(mode) {
    const movieBtn = document.getElementById("now-playing-movie");
    const tvBtn = document.getElementById("now-playing-tv");

    if (!movieBtn || !tvBtn) return;

    if (mode === "movie") {
      movieBtn.classList.add("active");
      tvBtn.classList.remove("active");
    } else {
      tvBtn.classList.add("active");
      movieBtn.classList.remove("active");
    }
  }

  // WATCHLIST
  static setActiveWatchListButton(mode) {
    const movieBtn = document.getElementById("watchlist-movies");
    const tvBtn = document.getElementById("watchlist-tv");

    if (!movieBtn || !tvBtn) return;

    if (mode === "movie") {
      movieBtn.classList.add("active");
      tvBtn.classList.remove("active");
    } else {
      tvBtn.classList.add("active");
      movieBtn.classList.remove("active");
    }
  }

  // ====================== DETAILS ====================== //
  static renderDetails(item) {
    console.log(item);
    const container = document.getElementById("details-container");
    if (!container) return;
    const title = item.title || item.name;
    const release_date = item.release_date || item.first_air_date;
    const genres = item.genres
      ? item.genres.map((g) => g.name).join(", ")
      : "Unknown";
    const runtime = item.runtime
      ? `${Math.floor(item.runtime / 60)}h ${item.runtime % 60}m`
      : "";
    const episodes = `${item.seasons} Season, ${item.episodes} Episodes`;
    container.innerHTML = `
    <section class="details__hero">
    <div class="container">
    <div class="details__items">
                    <img src="${item.poster}" alt="${title}">
                    <div class="details__info">
                        <div class="details__title">
                            <h1>${title}</h1>
                            <p>${genres} • ${runtime || episodes}</p>
                            <p>${item.vote_average?.toFixed(1) || "?"}</p>
                            <p>${release_date}</p>
                            <button>Loading...</button>
                        </div>
                        <div class="details__overview">
                          <p class="tagline">${item.tagline}</p>
                            <h2>Overview</h2>
                            <p>${item.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  `;

    const hero = container.querySelector(".details__hero");
    hero.style.backgroundImage = `
  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url(${item.backdrop})
`;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "top";
    hero.style.backgroundRepeat = "no-repeat";
    hero.style.overflow = "auto";
  }

  static renderCredits(cast) {
    const container = document.getElementById("cast-section");
    if (!container) return;

    container.innerHTML = `
      ${cast
        .map(
          (person) => `
          <div class="person-card">
            <img src="${person.profile}" alt="${person.name}">
            <h4>${person.name}</h4>
            <p>${person.character || ""}</p>
          </div>
        `
        )
        .join("")}
    </div>`;
  }

  static renderRecommendation(items) {
    const container = document.getElementById("recommend-section");
    if (!container) return;

    container.innerHTML = items
      .map((item) => {
        const title = item.title || item.name;
        const date = item.release_date || item.first_air_date;
        const releaseYear = date ? new Date(date).getFullYear() : "Unknown";
        return `
        <div class="section__movie-card"
                  data-id="${item.id}"
          data-type="${item.media_type}">
          <img src="${item.poster}" alt="${title}">
          <div class="movie-card__info">
            <h3>${title}</h3>
            <p>${releaseYear} • ⭐ ${
          item.vote_average?.toFixed(1) || "?"
        }/10</p>
          </div>
        </div>
      `;
      })
      .join("");
  }

  // ====================== SEARCH / DISCOVER ====================== //
  static renderSearch(items, append = false) {
    const container = document.getElementById("discover-results");
    if (!container) return;

    if ((!items || items.length === 0) && !append) {
      container.innerHTML = `<p>No results found.</p>`;
      return;
    }

    const html = items
      .map((item) => {
        const title = item.title || item.name;
        const date = item.release_date || item.first_air_date || "Unknown";
        const rating = item.vote_average?.toFixed(1) || "?";

        return `
        <div 
          class="section__movie-card"
          data-id="${item.id}"
          data-type="${item.media_type}"
        >
          <img src="${item.poster}" alt="${title}">
          <h2>${title}</h2>
          <p>${date} | ⭐ ${rating}</p>
        </div>
      `;
      })
      .join("");

    if (append) {
      container.insertAdjacentHTML("beforeend", html);
    } else {
      container.innerHTML = html;
    }
  }

  static renderLoadMoreButton(currentPage, totalPages) {
    let btnContainer = document.getElementById("load-more-container");

    if (!btnContainer) {
      btnContainer = document.createElement("div");
      btnContainer.id = "load-more-container";
      btnContainer.style.textAlign = "center";
      btnContainer.style.margin = "2rem 0";
      document
        .getElementById("discover-results")
        .insertAdjacentElement("afterend", btnContainer);
    }

    if (currentPage < totalPages) {
      btnContainer.innerHTML = `<button id="load-more-btn" class="btn btn--primary">Load More</button>`;
    } else {
      btnContainer.innerHTML = `<p style="color:#888;">No more results</p>`;
    }

    const loadMoreBtn = document.getElementById("load-more-btn");
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", async () => {
        const nextPage = currentPage + 1;

        if (TMDBController.currentMode === "search") {
          await TMDBController.loadSearchResults(nextPage, true);
        } else if (TMDBController.currentMode === "discover") {
          await TMDBController.loadDiscoverResults(
            TMDBController.currentFilters,
            nextPage,
            true
          );
        }
      });
    }
  }

  static renderWatchlist(items) {
    const container = document.getElementById("watchlist-section");
    if (!container) return;

    if (!items || items.length === 0) {
      container.innerHTML = `<p>No items in your watchlist yet.</p>`;
      return;
    }

    container.innerHTML = items
      .map((item) => {
        const title = item.title || item.name;
        const date = item.release_date || item.first_air_date || "Unknown";
        const rating = item.vote_average?.toFixed(1) || "?";

        return `
        <div 
          class="section__movie-card"
          data-id="${item.id}"
          data-type="${item.media_type || (item.title ? "movie" : "tv")}"
        >
          <img src="${item.poster}" alt="${title}">
          <h2>${title}</h2>
          <p>${date} | ⭐ ${rating}</p>
        </div>
      `;
      })
      .join("");
  }

  // ====================== ERROR CATCH ====================== //
  static renderError(message) {
    console.error("Error:", message);
  }
}
