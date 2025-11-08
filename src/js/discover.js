import { TMDBController } from "./controllers/tmdbControllers.js";
document.addEventListener("DOMContentLoaded", async () => {
  TMDBController.initEventListeners();

  const params = new URLSearchParams(window.location.search);
  const query = params.get("query");
  const type = params.get("type") || "movie";
  const header = document.getElementById("discoverHeader");
  if(type == "movie"){
    header.innerHTML = "Discover Movies"
  }else{
    header.innerHTML = "Discover Tv Shows"
  }
  await TMDBController.populateGenresAndLanguages(type);

  if (query) {
    TMDBController.loadSearchResults();
  } else {
    TMDBController.loadDiscoverResults({ type });
  }
});

document.getElementById("apply-filters").addEventListener("click", () => {
  const filters = {
    type: "movie",
    sortBy: document.getElementById("sort-by").value,
    genre: document.getElementById("genre-select").value,
    releaseFrom: document.getElementById("release-from").value,
    releaseTo: document.getElementById("release-to").value,
    language: document.getElementById("languages-select").value,
  };

  TMDBController.loadDiscoverResults(filters);
});
