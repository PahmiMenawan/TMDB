import { TMDBController } from "./controllers/tmdbControllers.js";
document.addEventListener("DOMContentLoaded", async () => {
  TMDBController.loadDiscover();
  TMDBController.initDetailsEvent();
  TMDBController.initSearchBarEvent();
  TMDBController.initApplyFilterEvent();
});