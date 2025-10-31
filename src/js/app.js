import { TMDBController } from "./controllers/tmdbControllers.js";

document.addEventListener("DOMContentLoaded", () => {
  TMDBController.loadTrending("day");
  TMDBController.loadDiscoverMovies();
  TMDBController.initEventListeners();
});
