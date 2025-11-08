import { TMDBController } from "./controllers/tmdbControllers.js";

document.addEventListener("DOMContentLoaded", () => {
  TMDBController.loadDetailsPage();
  TMDBController.loadItemCredits()
});
