export class TVShow {
  constructor({
    backdrop_path,
    genres,
    id,
    origin_country,
    original_language,
    original_name,
    overview,
    popularity,
    poster_path,
    first_air_date,
    name,
    vote_average,
    vote_count,
  }) {
    this.backdrop = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;
    this.genres = genres;
    this.id = id;
    this.origin_country = origin_country;
    this.original_language = original_language;
    this.original_name = original_name;
    this.overview = overview;
    this.popularity = popularity;
    this.poster = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : "https://placehold.co/300x450?text=No+Image";
    this.first_air_date = first_air_date;
    this.name = name;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.media_type = "tv";
  }
}
