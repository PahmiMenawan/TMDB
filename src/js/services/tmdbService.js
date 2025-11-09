const API_BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDBiMzE4ZTk3MzY5YTQzNDIyOGY5ZjMyOTVmYWE0MCIsIm5iZiI6MTcyNTM2MTkzOC41NjA5OTk5LCJzdWIiOiI2NmQ2ZWYxMmFhY2M4ODE2MWZmMDFmMzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F4rf8oju0lhtwb1XrWN3-jRTrzjwepwEoZbbzavXY9Q"; // replace later or import from config

export class TMDBService {
  static async fetchData(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: options.method || "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: options.body || null,
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("TMDBService Error:", error);
      throw error;
    }
  }

  // ====================== HOMEPAGE ====================== //
  // TRENDING SECTION
  static async getTrending(timeWindow = "day", page = 1) {
    return this.fetchData(`/trending/all/${timeWindow}?page=${page}`);
  }

  // POPULAR SECTION
  static async getPopular(type = "movie", page = 1) {
    return this.fetchData(`/${type}/popular?page=${page}`);
  }

  // TOP RATED SECTION
  static async getTopRated(type = "movie", page = 1) {
    return this.fetchData(`/${type}/top_rated?page=${page}`);
  }
  // NOW PLAYING SECTION - MOVIES
  static async getNowPlaying(page = 1) {
    return this.fetchData(`/movie/now_playing?page=${page}`);
  }

  // NOW PLAYING SECTION - TV SERIES
  static async getAiringToday(page = 1) {
    return this.fetchData(`/tv/airing_today?page=${page}`);
  }

  // ====================== DETAILS PAGE ====================== //
  // ITEM DETAIL SECTION
  static async getItemDetails(type, id) {
    return this.fetchData(`/${type}/${id}`);
  }

  // ITEM'S CAST SECTION
  static async getItemCredits(type, id) {
    return this.fetchData(`/${type}/${id}/credits`);
  }
  // ITEM'S RECOMMENDATION SECTION
  static async getItemRecommendation(type, id) {
    return this.fetchData(`/${type}/${id}/recommendations`);
  }
  // ====================== SEARCH / DISCOVER ====================== //
  static async searchItems(query, type = "multi", page = 1) {
    if (!query || query.trim() === "") {
      throw new Error("Search query cannot be empty");
    }

    return this.fetchData(
      `/search/${type}?query=${encodeURIComponent(query)}&page=${page}`
    );
  }
  // ====================== FILTER ====================== //
  static async discoverItems({
    type = "movie",
    sortBy = "popularity.desc",
    genre = "",
    releaseFrom = "",
    releaseTo = "",
    language = "",
    page = 1,
  }) {
    let endpoint = `/discover/${type}?sort_by=${sortBy}&page=${page}`;

    if (genre) endpoint += `&with_genres=${genre}`;
    if (releaseFrom) endpoint += `&primary_release_date.gte=${releaseFrom}`;
    if (releaseTo) endpoint += `&primary_release_date.lte=${releaseTo}`;
    if (language) endpoint += `&with_original_language=${language}`;

    return this.fetchData(endpoint);
  }
  static async getGenres(type = "movie") {
    const validType = type === "tv" ? "tv" : "movie";
    return this.fetchData(`/genre/${validType}/list`);
  }

  static async getLanguages() {
    return this.fetchData(`/configuration/languages`);
  }
  // ====================== AUTH / WATCHLIST ====================== //
  static async getRequestToken() {
    return this.fetchData(`/authentication/token/new`);
  }

  static async createSession(requestToken) {
    return this.fetchData(`/authentication/session/new`, {
      method: "POST",
      body: JSON.stringify({ request_token: requestToken }),
    });
  }

  static async getAccountDetails(sessionId) {
    return this.fetchData(`/account?session_id=${sessionId}`);
  }

  static async addToWatchlist(
    accountId,
    sessionId,
    mediaType,
    mediaId,
    watchlist = true
  ) {
    return this.fetchData(
      `/account/${accountId}/watchlist?session_id=${sessionId}`,
      {
        method: "POST",
        body: JSON.stringify({
          media_type: mediaType,
          media_id: mediaId,
          watchlist: watchlist,
        }),
      }
    );
  }

  static async getWatchlist(accountId, sessionId, type = "movies") {
    return this.fetchData(
      `/account/${accountId}/watchlist/${type}?session_id=${sessionId}`
    );
  }
  
  static async isInWatchlist(accountId, sessionId, mediaType, mediaId) {
    return this.fetchData(
      `/${mediaType}/${mediaId}/account_states?session_id=${sessionId}`
    );
  }
}
