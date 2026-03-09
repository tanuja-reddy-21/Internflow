const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
dotenv.config();
connectDB();
const app = express();
app.use(cors({
  origin: 'http:
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/invites', require('./routes/inviteRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/performance', require('./routes/performanceRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.get('/', (req, res) => {
  res.json({ message: 'InternFlow API is running' });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
