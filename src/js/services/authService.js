const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "dd0b318e97369a434228f9f3295faa40";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDBiMzE4ZTk3MzY5YTQzNDIyOGY5ZjMyOTVmYWE0MCIsIm5iZiI6MTcyNTM2MTkzOC41NjA5OTk5LCJzdWIiOiI2NmQ2ZWYxMmFhY2M4ODE2MWZmMDFmMzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0";

export class AuthService {
  static async getRequestToken() {
    const res = await fetch(
      `${API_BASE_URL}/authentication/token/new?api_key=${API_KEY}`
    );
    if (!res.ok) throw new Error("Failed to get request token");
    return res.json();
  }

  static async createSession(requestToken) {
    const res = await fetch(
      `${API_BASE_URL}/authentication/session/new?api_key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ request_token: requestToken }),
      }
    );
    if (!res.ok) throw new Error("Failed to create session");
    return res.json();
  }

  static async getAccountDetails(sessionId) {
    const res = await fetch(
      `${API_BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch account details");
    return res.json();
  }
  static async addToWatchlist(
    accountId,
    sessionId,
    mediaType,
    mediaId,
    watchlist = true
  ) {
    const res = await fetch(
      `${API_BASE_URL}/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          media_type: mediaType,
          media_id: mediaId,
          watchlist,
        }),
      }
    );

    if (!res.ok) throw new Error("Failed to update watchlist");
    return res.json();
  }
  static async getWatchlist(accountId, sessionId, type = "movies", page = 1) {
    const res = await fetch(
      `${API_BASE_URL}/account/${accountId}/watchlist/${type}?api_key=${API_KEY}&session_id=${sessionId}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch watchlist");
    return res.json();
  }
}
