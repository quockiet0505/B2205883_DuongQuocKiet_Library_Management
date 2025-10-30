const jwt = require("jsonwebtoken");
const ApiError = require("../utils/api-error");

function authMiddleware(requiredType, requiredRole){
     return (req, res, next) => {
          const authHeader = req.header.authorization;
          if(!authHeader) 
               return next(ApiError.unauthorized("No token provided!"));

          const token = authHeader.split(" ")[1];
          try{
               const decoded = jwt.verify(token, process.env.JWT_SECRET);
               req.user = decoded;

               if(requiredType && decoded.type !== requiredType){
                    return next(ApiError.forbidden("Wrong user type!"));
               }

               if(requiredRole && decoded.role !== requiredRole){
                    return next(ApiError.forbidden("Insufficient permission!"));
               }

               next();
          }catch(err){
               next(ApiError.unauthorized("Invalid token!"));
          }

     };
}

module.exports = authMiddleware;