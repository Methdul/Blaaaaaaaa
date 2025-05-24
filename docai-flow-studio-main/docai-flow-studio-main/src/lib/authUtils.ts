// src/lib/authUtils.ts

/**
 * Retrieves the authentication token from localStorage.
 * @returns {string | null} The auth token or null if not found.
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

/**
 * Checks if the user is authenticated.
 * Relies on 'isAuthenticated' being 'true' and an authToken existing.
 * @returns {boolean} True if authenticated, false otherwise.
 */
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true' && !!getAuthToken();
};

/**
 * Retrieves the user's role (userType) from localStorage.
 * @returns {string | null} The user role (e.g., "user", "creator", "admin") or null if not found or not authenticated.
 */
export const getUserRole = (): string | null => {
  if (!isAuthenticated()) {
    return null;
  }
  return localStorage.getItem('userType');
};

/**
 * Checks if the current user has the "user" role.
 * @returns {boolean} True if the user role is "user", false otherwise.
 */
export const isUser = (): boolean => {
  return getUserRole() === 'user';
};

/**
 * Checks if the current user has the "creator" role.
 * @returns {boolean} True if the user role is "creator", false otherwise.
 */
export const isCreator = (): boolean => {
  return getUserRole() === 'creator';
};

/**
 * Checks if the current user has the "admin" role.
 * @returns {boolean} True if the user role is "admin", false otherwise.
 */
export const isAdmin = (): boolean => {
  return getUserRole() === 'admin';
};

/**
 * Retrieves the user's name from localStorage.
 * @returns {string | null} The user's name or null if not found.
 */
export const getUserName = (): string | null => {
    if (!isAuthenticated()) {
        return null;
    }
    return localStorage.getItem('userName');
};

/**
 * Retrieves the user's email from localStorage.
 * @returns {string | null} The user's email or null if not found.
 */
export const getUserEmail = (): string | null => {
    if (!isAuthenticated()) {
        return null;
    }
    return localStorage.getItem('userEmail');
};

/**
 * Logs the user out by clearing authentication-related items from localStorage
 * and redirecting to the login page.
 */
export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userType');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail'); // Clear userEmail on logout
  // Redirect to login page.
  // This assumes the function is called in a context where window navigation is appropriate.
  // If used within React components, navigation should be handled via useNavigate hook.
  window.location.href = '/login'; 
};
