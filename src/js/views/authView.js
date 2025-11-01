export class AuthView {
  static renderSuccess(message) {
    console.log("✅", message);
  }

  static renderError(message) {
    console.error("❌", message);
  }
}
