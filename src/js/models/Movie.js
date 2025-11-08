export class Movie {
  constructor({
    backdrop_path,
    genres,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    tagline,
    vote_average,
    vote_count,
  }) {
    this.backdrop = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;
    this.genres = genres;
    this.id = id;
    this.original_language = original_language;
    this.original_title = original_title;
    this.overview = overview;
    this.popularity = popularity;
    this.poster = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : "https://placehold.co/300x450?text=No+Image";
    this.release_date = release_date;
    this.title = title;
    this.tagline = tagline;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.media_type = "movie";
  }
}
