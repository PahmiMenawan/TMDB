import { AuthService } from "../services/authService.js";
import { AuthView } from "../views/authView.js";

export class AuthController {
  static async login() {
    try {
      const tokenData = await AuthService.getRequestToken();
      const requestToken = tokenData.request_token;

      const redirectURL = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5500/approved.html`;
      window.location.href = redirectURL;

    } catch (err) {
      AuthView.renderError("Failed to start login process.");
    }
  }

  static async createSession(requestToken) {
    try {
      const sessionData = await AuthService.createSession(requestToken);
      const sessionId = sessionData.session_id;
      localStorage.setItem("session_id", sessionId);

      // Optionally fetch user details
      const account = await AuthService.getAccountDetails(sessionId);
      localStorage.setItem("account_id", account.id);

      AuthView.renderSuccess(`Logged in as ${account.username}`);
    } catch (err) {
      AuthView.renderError("Failed to create session.");
    }
  }
}
