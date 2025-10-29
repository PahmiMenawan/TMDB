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


//   Fetch Movies & TV Shows
  static async getDiscoverMovies(page = 1) {
    return this.fetchData(
      `/discover/movie?page=${page}&sort_by=popularity.desc`
    );
  }

  static async getTrendingDay(page = 1){
   return this.fetchData(
    `/trending/all/day?page=${page}`
   ) 
  }

  static async getDiscoverTVShows(page = 1) {
    return this.fetchData(`/discover/tv?page=${page}&sort_by=popularity.desc`);
  }
}
