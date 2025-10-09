import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Secret key for JWT signing. Uses environment variable if available.
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

/**
 * Registers a new user.
 *
 * Expects the following fields in req.body:
 * - name: String, user's name
 * - email: String, user's email (must be unique)
 * - password: String, user's password
 * - role: String, user's role (e.g., donor, recipient)
 * - location: String, user's location
 *
 * Workflow:
 * 1. Checks if the email already exists.
 * 2. Hashes the password.
 * 3. Creates and saves the user.
 * 4. Generates a JWT token.
 * 5. Responds with user info and token.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      location,
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1d',
    });

    // Respond with user info and token
    res.json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
      },
      token,
    });
  } catch (err) {
    // Handle server errors
    return res
      .status(500)
      .json({ message: 'Server error', error: err.message });
  }
};

/**
 * Authenticates a user and returns a JWT token.
 *
 * Expects the following fields in req.body:
 * - email: String, user's email
 * - password: String, user's password
 *
 * Workflow:
 * 1. Finds user by email.
 * 2. Compares provided password with stored hash.
 * 3. Generates a JWT token if authentication succeeds.
 * 4. Responds with user info and token.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password with hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1d',
    });

    // Respond with user info and token
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
      },
      token,
    });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
