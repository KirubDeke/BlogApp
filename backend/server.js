require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const blogRoutes = require('./Routes/BlogRoutes');
const authRoutes = require('./Routes/AuthRoutes');
const bodyParser = require('body-parser');
const path = require('path');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(blogRoutes);
app.use(authRoutes);

// Serve the uploaded images statically
app.use('/images', express.static(path.join(__dirname, 'images')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Successfully connected to port', process.env.PORT);
    });
    console.log('Connected to Database');
  })
  .catch((error) => {
    console.log(error);
  });