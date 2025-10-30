export class TVShow {
  constructor({
    adult,
    backdrop_path,
    genre_ids,
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
    media_type
  }) {
    this.adult = adult;
    this.backdrop = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
    this.genre_ids = genre_ids;
    this.id = id;
    this.origin_country = origin_country;
    this.original_language = original_language;
    this.original_name = original_name;
    this.overview = overview;
    this.popularity = popularity;
    this.poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
    this.first_air_date = first_air_date;
    this.name = name;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.media_type = media_type
  }
}
