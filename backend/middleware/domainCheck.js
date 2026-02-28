const User = require('../models/User');

// Enforce domain isolation for admins
const enforceDomain = async (req, res, next) => {
  try {
    // Only enforce for admins
    if (req.user.role !== 'admin') {
      return next();
    }

    const adminDomain = req.user.domain;

    // Validate domain exists
    if (!adminDomain) {
      return res.status(403).json({ 
        message: 'Admin must have a domain assigned' 
      });
    }

    // Attach domain to request for downstream use
    req.adminDomain = adminDomain;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Validate intern access based on domain
const validateInternAccess = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return next();
    }

    const { internId, assignedTo } = req.body;
    const adminDomain = req.user.domain;

    // Get intern IDs to validate
    const internIds = internId ? [internId] : (assignedTo || []);

    if (internIds.length === 0) {
      return next();
    }

    // Fetch interns and validate domain match
    const interns = await User.find({
      _id: { $in: internIds },
      role: 'intern'
    }).select('domain');

    // Check if all interns exist
    if (interns.length !== internIds.length) {
      return res.status(404).json({ 
        message: 'One or more interns not found' 
      });
    }

    // Validate domain match
    const invalidInterns = interns.filter(intern => intern.domain !== adminDomain);

    if (invalidInterns.length > 0) {
      return res.status(403).json({ 
        message: `Access denied: You can only assign tasks to ${adminDomain} interns`,
        violation: 'DOMAIN_MISMATCH'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Validate task domain matches admin domain
const validateTaskDomain = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next();
  }

  const adminDomain = req.user.domain;
  const taskDomain = req.body.domain;

  // Auto-set domain if not provided
  if (!taskDomain) {
    req.body.domain = adminDomain;
    return next();
  }

  // Validate domain match
  if (taskDomain !== adminDomain) {
    return res.status(403).json({ 
      message: `Access denied: You can only create ${adminDomain} tasks`,
      violation: 'DOMAIN_MISMATCH'
    });
  }

  next();
};

module.exports = {
  enforceDomain,
  validateInternAccess,
  validateTaskDomain
};