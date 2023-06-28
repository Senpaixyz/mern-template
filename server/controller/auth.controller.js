const AuthService = require('../services/auth.service');
const jwtConfig = require('../jwt.config');
const jwtUtil = require('../utils/jwt.utils');
const {execute} = require('../mongo-connect');
const Users = require("../models/UsersSchema");

exports.register = async (request, response) => { 

    return await execute( async () => {
        const isExist = await AuthService.findUserByEmail(request.body.email);
        if(isExist) {
            return response.status(400).json({ 
                message: 'Email already exists.' 
            });
        }
        const user = new Users(request.body);
        const result = await user.save();
        return response.json({
          'message': "Register Success!",
        });

    });

}


exports.login = async (request, response) => { 
 
    return await execute( async () => {
        const findOneQuery = {email: request.body.email}; // do email sanitization here as well as password.
        const password = request.body.password;
        const result = await AuthService.findUserByEmail(request.body.email);

        console.log([
          'RESULT',
          request.body,
          findOneQuery,
          result
        ]);

        if(result){
          return result.comparePassword(password, async function(err, isMatch) {
              if (err){
                return response.status(500).json({
                  message: "Theres something wrong!",
                  data: err
                });
              }
              else{
                if(isMatch){
                  const token = await jwtUtil.createToken({ _id: result._id });
                  return response.json({
                      message: "Credentials Match!",
                      status: isMatch,
                      user: result.toJSON(),
                      access_token: token,
                      token_type: 'Bearer',
                      expires_in: jwtConfig.ttl
                  });
                }
                else{
                  return response.status(401).json({
                    message: "Password is not match!",
                      status: isMatch,
                      user: {}
                  });
                }
              }
          });
        }
        else{
          return response.status(401).json({
            message: "Email Not Found",
            status: false,
          });
        }

    });

}


exports.logout = async (req, res) => {    
  await AuthService.logoutUser(req.token, req.user.exp);  
  return res.json({ message: 'Logged out successfully.' });
}


exports.getUser = async (req, res) => {
  const user = await AuthService.findUserById(req.user._id);  
  return res.json({
      data: user,
      message: 'Success.'
  });
}
