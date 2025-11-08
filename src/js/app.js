import { TMDBController } from "./controllers/tmdbControllers.js";
import { AuthController } from "./controllers/authController.js";

document.addEventListener("DOMContentLoaded", () => {
  TMDBController.loadTrending("day");
  TMDBController.loadPopular("movie");
  TMDBController.loadTopRated("movie");
  TMDBController.loadNowPlaying();
  TMDBController.initEventListeners();
  // AuthController.login();
});

// document.getElementById("loginBtn").addEventListener("click", () => {
// });
