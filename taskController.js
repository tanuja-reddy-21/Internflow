const Task = require('../models/Task');

// @desc    Create task
// @route   POST /api/tasks
// @access  Admin
const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, deadline, priority, domain } = req.body;

    // Domain is auto-set by middleware, but validate it exists
    if (!domain) {
      return res.status(400).json({ message: 'Domain is required' });
    }

    // Validate assigned interns belong to same domain
    if (assignedTo && assignedTo.length > 0) {
      const User = require('../models/User');
      const interns = await User.find({
        _id: { $in: assignedTo },
        role: 'intern',
        domain: domain
      });

      if (interns.length !== assignedTo.length) {
        return res.status(403).json({ 
          message: `All assigned interns must be from ${domain} domain`,
          violation: 'DOMAIN_MISMATCH'
        });
      }
    }

    const task = await Task.create({
      title,
      description,
      domain,
      assignedTo: assignedTo || [],
      deadline,
      priority,
      createdBy: req.user._id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    let query = {};

    // If intern, show only assigned tasks
    if (req.user.role === 'intern') {
      query.assignedTo = req.user._id;
    }

    // If admin, show only tasks from their domain
    if (req.user.role === 'admin') {
      query.domain = req.user.domain;
    }

    const tasks = await Task.find(query)
      .populate('assignedTo', 'fullName email domain')
      .populate('createdBy', 'fullName')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'fullName email')
      .populate('createdBy', 'fullName');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Admin
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Validate admin can only update tasks from their domain
    if (req.user.role === 'admin' && task.domain !== req.user.domain) {
      return res.status(403).json({ 
        message: 'Access denied: Task belongs to different domain',
        violation: 'DOMAIN_MISMATCH'
      });
    }

    // Prevent domain modification
    if (req.body.domain && req.body.domain !== task.domain) {
      return res.status(403).json({ 
        message: 'Domain cannot be modified after task creation',
        violation: 'IMMUTABLE_FIELD'
      });
    }

    // Validate new assignees belong to same domain
    if (req.body.assignedTo) {
      const User = require('../models/User');
      const interns = await User.find({
        _id: { $in: req.body.assignedTo },
        role: 'intern',
        domain: task.domain
      });

      if (interns.length !== req.body.assignedTo.length) {
        return res.status(403).json({ 
          message: `All assigned interns must be from ${task.domain} domain`,
          violation: 'DOMAIN_MISMATCH'
        });
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Admin
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};