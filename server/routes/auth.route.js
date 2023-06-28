const express = require("express");
// const {execute} = require('../mongo-connect');
// const setException = require('../mongo-exception-handler');
// const Users = require("../models/UsersSchema");
const router = express.Router();

const AuthController = require('../controller/auth.controller');
const ErrorHandler = require('../middleware/error.middleware');
const schema = require('../validations/auth.validation');
const validate = require('../utils/validator.utils'); 

router.post('/register', validate(schema.register), ErrorHandler(AuthController.register));
router.post('/login',    validate(schema.login),    ErrorHandler(AuthController.login));



module.exports = router;

// app.post("/login", async (request, response) => {
//   try{
  
//     return await execute( async () => {
//         const findOneQuery = {email: request.body.email}; // do email sanitization here as well as password.
//         const password = request.body.password;
//         const result = await Users.findOne(findOneQuery);

//         console.log([
//           'RESULT',
//           request.body,
//           findOneQuery,
//           result
//         ]);

//         if(result){
//           return result.comparePassword(password, function(err, isMatch) {
//               if (err){
//                 response.status(500).json({
//                   'message': "Theres something wrong!",
//                   'data': err
//                 });
//               }
//               else{
//                 if(isMatch){
//                   response.json({
//                     'message': "Password is match!",
//                     'status': isMatch,
//                     'user': result.toJSON()
//                   });
//                 }
//                 else{
//                   response.json({
//                     'message': "Password is not match!",
//                       'status': isMatch,
//                       'user': {}
//                   });
//                 }
//               }
//               console.log('Auth Password: ', isMatch); // -> Password123: true
//           });
//         }
//         else{
//           response.status(400).json({
//             'message': "Email Not Found",
//             'status': false,
//           });
//         }

//     })
//     .catch((e) => {
//         const message = setException(e);
//         response.status(500).json({
//           'message': message,
//           'data': e
//         });
//     });
//   }
//   catch(e){
//     const message = setException(e);
//     response.status(500).json({
//       'message': message,
//       'data': e
//     });
//   }
// });

// app.post("/register", async (request, response) => {
//   try{
//       const result = await execute( async () => {
//           const user = new Users(request.body);
//           const result = await user.save();
//           return result;
//       });
//       response.json({
//         'message': "Data inserted to database!",
//       });
//     }
//     catch(e){
//       const message = setException(e);
//       response.status(500).json({
//         'message': message,
//         'data': e
//       });
//     }
// });

