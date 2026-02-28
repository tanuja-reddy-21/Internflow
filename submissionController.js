const Submission = require('../models/Submission');
const Task = require('../models/Task');

// @desc    Submit task
// @route   POST /api/submissions
// @access  Intern
const submitTask = async (req, res) => {
  try {
    const { taskId, submissionLink, remarks } = req.body;

    // Check if task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if already submitted
    const existingSubmission = await Submission.findOne({
      taskId,
      internId: req.user._id
    });

    if (existingSubmission) {
      return res.status(400).json({ message: 'Task already submitted' });
    }

    const submission = await Submission.create({
      taskId,
      internId: req.user._id,
      submissionLink,
      remarks
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my submissions
// @route   GET /api/submissions/my-submissions
// @access  Intern
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ internId: req.user._id })
      .populate('taskId', 'title description deadline priority')
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all submissions
// @route   GET /api/submissions
// @access  Admin
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('taskId', 'title description')
      .populate('internId', 'fullName email')
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Review submission
// @route   PUT /api/submissions/:id/review
// @access  Admin
const reviewSubmission = async (req, res) => {
  try {
    const { status, feedback } = req.body;

    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      {
        status,
        feedback,
        reviewedBy: req.user._id
      },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitTask,
  getMySubmissions,
  getAllSubmissions,
  reviewSubmission
};