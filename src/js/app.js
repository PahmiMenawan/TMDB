import { TMDBController } from "./controllers/tmdbControllers.js";

document.addEventListener("DOMContentLoaded", () => {
  TMDBController.loadTrending("day");
  TMDBController.loadPopular("movie");
  TMDBController.loadTopRated("movie");
  TMDBController.loadNowPlaying();
  TMDBController.initEventListeners();
});
