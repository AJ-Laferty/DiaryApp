/**
 * Get the stored authentication token (JWT).
 *
 * @returns {string|null} - The JWT token or null if it does not exist.
 */
export function getAuthToken() {
  // Retrieve the token from localStorage under the "jwt" key
  return localStorage.getItem("jwt");
}

/**
 * Store the JWT token after a successful login.
 *
 * @param {string} token - The JWT token received from the server after login.
 */
export function setAuthToken(token) {
  // Store the token in localStorage under the "jwt" key
  localStorage.setItem("jwt", token);
}

/**
 * Remove JWT token when the user logs out.
 */
export function removeAuthToken() {
  // Remove the token from localStorage under the "jwt" key
  localStorage.removeItem("jwt");
}

/**
 * Get the stored user data.
 *
 * @returns {Object|null} - The user data or null if it does not exist.
 */
export function getUserData() {
  // Retrieve user data from localStorage under the "user" key
  return JSON.parse(localStorage.getItem("user"));
}

/**
 * Store the user data after login.
 *
 * @param {Object} user - The user object to be saved.
 */
export function setUserData(user) {
  // Store the user data in localStorage under the "user" key
  localStorage.setItem("user", JSON.stringify(user));
}

/**
 * Remove user data when the user logs out.
 */
export function removeUserData() {
  // Remove user data from localStorage under the "user" key
  localStorage.removeItem("user");
}
