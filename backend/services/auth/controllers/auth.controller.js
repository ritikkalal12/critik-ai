import { app } from '../config/firebase.js';
import { getAuth } from 'firebase-admin/auth';

export const login = async (req, res) => {
  try {
    // Get the token from the request body
    const { token } = req.body;

    // Verify the token using Firebase Admin SDK
    const decoded = await getAuth(app).verifyIdToken(token);

    // Check if the user exists in your database
    const user = await User.findOne({ firebaseUid: decoded.uid });

    // If the user doesn't exist, create a new user in your database
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });
    }

    // Generate a session ID for the user
    const sessionId = crypto.randomUUID();

    // Store the sessionId in your database or in-memory store with the user information
    res.cookie('session', sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    });

    // Return the user information and session ID to the client
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    return res.status(500).json({ message: `Login failed: ${error.message}` });
  }
};
