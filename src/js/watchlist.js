import { TMDBController } from "./controllers/tmdbControllers.js";

document.addEventListener("DOMContentLoaded", async () => {
  TMDBController.loadWatchlist("movies");
  TMDBController.initWatchlistEvent();
  TMDBController.initDetailsEvent();
  TMDBController.initSearchBarEvent();
});