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
}

// DOM
