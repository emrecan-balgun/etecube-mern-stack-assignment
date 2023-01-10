const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const userRoute = require('./routes/userRoute.js');
const pageRoute = require('./routes/pageRoute.js');

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mongoose Config
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.abdismo.mongodb.net/etecube-assignment`
  )
  .then(() => console.log('Connected DB!'));

// Routes
app.use('/', pageRoute);
app.use('/users', userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
