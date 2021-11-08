require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const mainServer = require('./routes/main');
const connectDB = require('./db/connect');
const User = require('./schema/usersSchema');

// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1',mainServer)

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

// app.use('/add', async (req, res) => {

//   const { username, password } = req.body;
//   const user = await User.create({username,password})
//   res.send('created');

// });

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();

app.use(notFoundMiddleware);