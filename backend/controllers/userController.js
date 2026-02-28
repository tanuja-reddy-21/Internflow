const User = require('../models/User');

// @desc    Get all interns (filtered by admin's domain)
// @route   GET /api/users/interns
// @access  Admin
const getInterns = async (req, res) => {
  try {
    const query = { role: 'intern' };

    // If admin, filter by their domain
    if (req.user.role === 'admin') {
      query.domain = req.user.domain;
    }

    const interns = await User.find(query).select('fullName email domain');
    res.json(interns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getInterns };