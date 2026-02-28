const express = require('express');
const { getInternAnalytics, getAdminAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

const router = express.Router();

router.get('/intern/:internId', protect, getInternAnalytics);
router.get('/admin/overview', protect, authorize('admin'), getAdminAnalytics);

module.exports = router;
