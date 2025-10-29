import { TMDBController } from "./controllers/tmdbControllers.js";

document.addEventListener("DOMContentLoaded", () => {
  TMDBController.loadDiscoverMovies();
  TMDBController.loadDiscoverTVShows();
});