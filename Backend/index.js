import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
import cors from 'cors'
import express from 'express'
import authRouter from "./routes/auth.route.js"
import markRoutes    from "./routes/mark.route.js"
import quizRoutes from "./routes/quiz.route.js";
import cookieParser from 'cookie-parser';
import { authenticateToken } from './utilities.js';

const app=express();
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
   
  }));
app.use("/api", quizRoutes);
app.use("/api/auth", authRouter)

app.use("/api/marks", markRoutes);
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected To MongoDB");
})
.catch((err)=>{
    console.log(err)
})







// const {authenticateToken} =require("./utilities");

// app.use(express.json());

// app.use(
//     cors({
//         origin:["http://localhost:5173"],credentials:true
//     })
// );


// app.get("/",(req,res)=>{

//     res.json({data: "hello"});
// });


// app.post("/create-account",async(req,res)=>{
//     const {fullName, email,password} =req.body;

//     if(!fullName){
//         return res.status(400).json({error: true, message: "Full Name is required"});
//     }
//     if(!email){
//         return res.status(400).json({error: true, message: "Email is required"});
//     }
//     if(!password){
//         return res.status(400).json({error: true, message: "Password is required"});
//     }

//     const isUser = await User.findOne({email:email});
//     if(isUser){
//         return res.json({
//             error:true, message:"User Already Exist"
//         })
//     }

// const user= new User({
//     fullName,email,password,
// });

// await user.save();

// const accessToken=jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,{

//     expiresIn:'36000m',
// });
// return res.json({
//     error:false , user, accessToken,message: "Registration Successfull",
// })

// })

// app.post("/login",async(req,res)=>{

// const {email,password}=req.body;

// if(!email){
//     return res.status(400).json({message:"Email is required"})
// }

// if(!password){
//     return res.status(400).json({message:"Password is required"})
// }

// const userInfo = await User.findOne({email:email});
// if(!userInfo){
//     return res.status(400).json({message: "User not Found"});
// }


// if(userInfo.email == email && userInfo.password == password){
//     const user ={user: userInfo};
//     const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
//         expiresIn:"36000m",
//     })
//     return res.json({
//         error:false,
//         message: "Login Successfull",
//         email,
//         accessToken,
//     })
// }
// else{
//     return res.status(400).json({
//         error:true,
//         message: "Invalid Credentials",
//     })
// }



// })


// app.post("/add-note",authenticateToken,async(req,res)=>{

// const{title,content,tag}=req.body;
// if(!title){
//     return res.status(400).json({message:"Title is required"})
// }
// if(!content){
//     return res.status(400).json({message:"Content is required"})
// }

// try{
//     const note= new Note({title,content,tags: tags || [], userId:user._id,

//     });
//     await note.save();
//     return res.json({
//         error:false,
//         note,
//         message:"Added Note"
//     });
// } catch(error){
//     return res.status(500).json({
//         error:true,
//         message:"Internal error",
//     })

// }



// })


// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin:["http://localhost:5173"],credentials:true}))
// app.use("/api/auth", authRouter)


app.listen(8000,()=>{
    console.log("Server is running on port 8000");
});

app.use((err,req,res,next)=>{

    const statusCode=err.statusCode || 500
    const message=err.message || "Internal server Error"

return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
})

})
