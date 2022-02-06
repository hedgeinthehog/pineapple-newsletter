require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { router } = require('./routes/api');

// const PORT = process.env.PORT || 8080;
const PORT = 8080;

const app = express();

// Middlewares
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Routing
app.use('/api/', router);
app.use((_, res) => {
  res.status(404).json({ status: 'error', code: '404', message: 'Not found' });
});

// Error handler
app.use((err, _, res, __) => {
  err.status = err.status || 500;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
  });
});

// Starting server
app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
});

// On app termination from command line
process.on('SIGINT', () => {
  console.log('Server terminated');
  process.exit(1);
});
