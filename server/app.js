const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Mongoose Config
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.abdismo.mongodb.net/etecube-assignment`
  )
  .then(() => console.log('Connected DB!'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
