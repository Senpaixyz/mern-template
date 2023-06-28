const express = require("express");
// const {execute} = require('../mongo-connect');
// const setException = require('../mongo-exception-handler');
// const Users = require("../models/UsersSchema");
const router = express.Router();

const AuthController = require('../controller/auth.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');

router.get('/user', AuthGuard, ErrorHandler(AuthController.getUser));
router.get('/logout', AuthGuard, ErrorHandler(AuthController.logout));

module.exports = router;


// const express = require("express");
// const {execute} = require('../mongo-connect');
// const setException = require('../mongo-exception-handler');
// const Users = require("../models/UsersSchema");
// const app = express();

// app.get("/users", async (req, res) => {
//   try{

//     // add auth token before accesssing the request.

//     const result = await execute( async () => {
//         const users = await Users.find({});
//         return users;
//     });
//     res.send({
//       'message': "Data fetched to database!",
//       'data': result
//     });
//   }
//   catch(e){
//     const message = setException(e);
//     res.status(500).send({
//       'message': message,
//       'data': e
//     });
//   }
// });

// app.get('/user/:id', async function (req, res) {

//       const result = await execute( async () => {
//           const users = await Users.findOne({email: 'test3@gmail.com'})
//           return users;
//       });

//       const token = result.generateToken();

//       console.log([
//         'GENERATED TOKEN',
//         token
//       ])


//       res.send({
//         'message': "Data fetched to database!",
//         'data': result,
//         'token': token
//       });
// });

// // app.use('/user/:id', function (req, res, next) {
// //     console.log(req.params.id);
// //     next();
// // });


// module.exports = app;