export class TMDBView {
  static renderMovies(movies) {
    console.log("Movies:", movies);
  }

  static renderTVShows(tvShows) {
    console.log("TV Shows:", tvShows);
  }

  static renderError(message) {
    console.error("Error:", message);
  }
}

// DOM