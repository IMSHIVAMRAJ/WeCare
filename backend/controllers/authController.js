import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Login or Register
export const loginOrRegister = async (req, res) => {
  const { email, password, phone } = req.body;

  if (!email || !password || !phone) {
    return res.status(400).json({ message: 'Email, password, and phone are required' });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // New User → Create account
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        email,
        phone,
        password: hashedPassword,
        isVerified: true, // Optional since no OTP
      });

      await user.save();
    } else {
      // Existing User → Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Update phone if it changed (optional)
      if (user.phone !== phone) {
        user.phone = phone;
        await user.save();
      }
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: user.isNew ? 'Account created' : 'Login successful',
      token,
      user,
    });
  } catch (err) {
    console.error('Auth Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
