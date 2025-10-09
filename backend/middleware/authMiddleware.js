import jwt from 'jsonwebtoken';

// Secret key for JWT verification. Uses environment variable if available.
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

/**
 * Authentication middleware for Express routes.
 *
 * This middleware checks for a JWT token in the Authorization header of the request.
 * If a valid token is provided, it decodes the token and attaches the user information to req.user.
 * If no token is provided or the token is invalid, it responds with a 401 Unauthorized error.
 *
 * Usage:
 *   Add this middleware to any route that requires authentication.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header (format: "Bearer <token>")
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach decoded user info to request object
    req.user = decoded;
    next();
  } catch (err) {
    // Respond with error if token is invalid or expired
    res.status(401).json({ message: 'Invalid token' });
  }
};
