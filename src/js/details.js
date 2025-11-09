import { TMDBController } from "./controllers/tmdbControllers.js";

document.addEventListener("DOMContentLoaded", () => {
  TMDBController.loadDetailsPage();
  TMDBController.loadItemCredits();
  TMDBController.loadItemRecommendation();
  TMDBController.initDetailsEvent();
  TMDBController.initWatchlistButton();
  TMDBController.initSearchBarEvent();
});