export class TMDBView {
  // ====================== HOMEPAGE ====================== //
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

  // ====================== HOMEPAGE - SECTION SELECTOR ====================== //
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
    container.innerHTML = `
    <section class="details__hero">
    <div class="container">
    <div class="details__items">
                    <img src="${item.poster}" alt="${title}">
                    <div class="details__info">
                        <div class="details__title">
                            <h1>${title}</h1>
                            <p>${genres}</p>
                            <p>${item.vote_average?.toFixed(1) || "?"}</p>
                            <p>${release_date}</p>
                            <button>Add to Watch List</button>
                        </div>
                        <div class="details__overview">
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
    hero.style.backgroundImage = `url(${item.backdrop})`;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
    hero.style.backgroundRepeat = "no-repeat";
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
        // const genres = item.genres
        //   ? item.genres.map((g) => g.name).join(", ")
        //   : "";

        return `
        <div class="movie-card"
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

  static renderError(message) {
    console.error("Error:", message);
  }
}
// DOM MANIPULATIONS
