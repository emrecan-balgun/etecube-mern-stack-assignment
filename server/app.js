const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoute = require('./routes/userRoute.js');
const pageRoute = require('./routes/pageRoute.js');
const companyRoute = require('./routes/companyRoute.js');
const productRoute = require('./routes/productRoute.js');

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

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
app.use('/companies', companyRoute);
app.use('/products', productRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
