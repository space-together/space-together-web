/**
 * the default auth router
 * @type {string}
 */
export const AuthDefault = "/api/auth";

/**
 * An Array of routes that are accessible  to the public
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/new-verification",
];

/**
 * An Array of routes that are accessible for authentication
 * these routes will redirect logged in users to /home
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
]

/**
 * An Array of routes that are accessible for routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";


/**
 * the default redirect path after login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/home";