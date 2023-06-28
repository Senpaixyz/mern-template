const express = require('express');
const cors = require('cors');
const {run} = require('./mongo-connect');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;



/* ROUTERs */
const UserRouter = require('./routes/users.route');
const AuthRouter = require('./routes/auth.route');

/* MIDDLEWARE  */
app.use(express.json());
app.use(cors());
app.use(UserRouter);
app.use(AuthRouter);

app.get('/', (req, res) => {
  res.json('PING SUCCESS [200]: Connected.');
});

app.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}));

app.listen(port, () => {
  console.log(`Express app running on port ${port}!`);
  console.log('Connecting to database server...');
  run().catch(console.dir);
});