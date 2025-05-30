
import jwt from "jsonwebtoken"

export const authenticateToken=(req,res,next)=>{
console.log(req);

const token =req.cookies.access_token

  if(!token){
    return next(errorHandler(401,"Unauthorized"))
  }
  jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{

    if(err){
      return next(errorHandler(403,"Forbidden"))
    } 
    req.user=user;
    next();
  });

}

export const errorHandler=(statusCode, Message)=>{
  const error = new Error();
  error.statusCode=statusCode
  error.message=Message
  return error
}



