import { AuthService } from "../services/authService.js";
import { AuthView } from "../views/authView.js";

export class AuthController {
  static async login() {
    try {
      const tokenData = await AuthService.getRequestToken();
      const requestToken = tokenData.request_token;

      const redirectURL = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5500/index.html`;
      window.location.href = redirectURL;
    } catch (err) {
      AuthView.renderError("Failed to start login process.");
    }
  }

  static async createSession(requestToken) {
    try {
      const sessionData = await AuthService.createSession(requestToken);
      localStorage.setItem("session_id", sessionData.session_id);

      const accountData = await AuthService.getAccountDetails(
        sessionData.session_id
      );
      localStorage.setItem("account_id", accountData.id);

      AuthView.renderSuccess("Login successful!");
      console.log("Session created:", sessionData.session_id);
      console.log("Account ID:", accountData.id);
    } catch (error) {
      console.error("Session creation failed:", error);
      AuthView.renderError("Failed to create session.");
    }
  }

  static async addToWatchlist(mediaType, mediaId) {
    try {
      const sessionId = localStorage.getItem("session_id");
      const accountId = localStorage.getItem("account_id");

      if (!sessionId || !accountId) {
        AuthView.renderError("Please log in first.");
        return;
      }

      const result = await AuthService.addToWatchlist(
        accountId,
        sessionId,
        mediaType,
        mediaId,
        true
      );
      AuthView.renderSuccess("Added to your watchlist!");
      console.log("Watchlist result:", result);
    } catch (err) {
      console.error(err);
      AuthView.renderError("Failed to add to watchlist.");
    }
  }
  static async loadWatchlist() {
    try {
      const sessionId = localStorage.getItem("session_id");
      const accountId = localStorage.getItem("account_id");

      if (!sessionId || !accountId) {
        AuthView.renderError("You must log in to view your watchlist.");
        return;
      }

      const data = await AuthService.getWatchlist(accountId, sessionId);
      AuthView.renderWatchlist(data.results);
    } catch (err) {
      console.error(err);
      AuthView.renderError("Failed to load watchlist.");
    }
  }
}
