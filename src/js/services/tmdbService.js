const API_BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDBiMzE4ZTk3MzY5YTQzNDIyOGY5ZjMyOTVmYWE0MCIsIm5iZiI6MTcyNTM2MTkzOC41NjA5OTk5LCJzdWIiOiI2NmQ2ZWYxMmFhY2M4ODE2MWZmMDFmMzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.F4rf8oju0lhtwb1XrWN3-jRTrzjwepwEoZbbzavXY9Q"; // replace later or import from config

export class TMDBService {
  static async fetchData(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json",
        },
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
  static async getItemCredits(type, id){
    return this.fetchData(`/${type}/${id}/credits`)
  }
}
