export class TMDBView {
  // HOMEPAGE
  // NOTES : Bisa ga si ini dijadiin 1 function aja
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
          <p>${date} | ⭐ ${item.vote_count}</p>
        </div>
      `;
      })
      .join("");
  }
  static renderPopular(items) {
    console.log(items)

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
          <p>${date} | ⭐ ${item.vote_count}</p>
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
          <p>${date} | ⭐ ${item.vote_count}</p>
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
          <p>${date} | ⭐ ${item.vote_count}</p>
        </div>
      `;
      })
      .join("");
  }

  static renderDetails(data) {
    console.log(data);
  }

  static renderError(message) {
    console.error("Error:", message);
  }

  // SECTION SELECTORS
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
  static setActivePopularButton(mode) {
    const streamingBtn = document.getElementById("popular-movie")
    const onTvBtn = document.getElementById("popular-tv")

    if (!streamingBtn || !onTvBtn) return;

    if (mode === "movie") {
      streamingBtn.classList.add("active");
      onTvBtn.classList.remove("active");
    } else {
      onTvBtn.classList.add("active");
      streamingBtn.classList.remove("active");
    }
  }
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
}

// DOM
