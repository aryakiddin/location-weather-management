
const express = require('express');
const app = express();
const logger = require("./controllers/utils/logger")
const locationRoutes = require('./routes/locationRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const historyRoutes = require('./routes/historyRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/api/locations', locationRoutes);
app.use('/weather', weatherRoutes);
app.use('/history', historyRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is up and running successfully on port ${PORT}`)
  console.log(`Server is running on port ${PORT}`);
});
