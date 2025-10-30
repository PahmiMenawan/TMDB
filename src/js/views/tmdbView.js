export class TMDBView {
  static renderMovies(movies) {
    console.log("Movies:", movies);
  }

  static renderTVShows(tvShows) {
    console.log("TV Shows:", tvShows);
  }

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
          <p>${date} | ⭐ ${item.vote_average}</p>
        </div>
      `;
      })
      .join("");
  }

  static renderError(message) {
    console.error("Error:", message);
  }
}

// DOM
