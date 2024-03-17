import {User} from '../models/user.model.js'
import bcrypt from 'bcrypt'
import twilio from 'twilio'
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};
const client =  twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOCKEN);
let generatedOTP;
let verifiedPhoneNumber;

const verifyMobile = async (req, res)=>{
  const {mobile} = req.body
    
    if(!mobile)
    { 
      res.json({"messeage":"mobile no empty"})
      return;  
    }

    generatedOTP = generateOTP();
    verifiedPhoneNumber=mobile;
    try{
       await client.messages
      .create({
      body: `Hello Horse !!!! Your OTP is : ${generatedOTP}`,
      to: mobile, // Text your number
      from: process.env.TWILIO_NUMBER, // From a valid Twilio number
    })
    console.log(OTP)
    } catch(err){
      console.log(err)
    }
    return res
    
    .status(200);
}

const isPasswordCorrected = async function (userPassword,databasePassword){
  try{
    return await bcrypt.compare(userPassword, databasePassword)
  }catch(error){
    throw new Error('Error in Password')
  }
}

const verifyOTP = async(req,res)=>{
  const {userOTP}= req.body;
  if(!userOTP){
    res.send({"message": "please enter OTP!"})
    .status(400);
    return ;
  }
console.log(userOTP,"+",generatedOTP)
  if(generatedOTP === userOTP){
    res.send("user verified")
    .status(200);
    return;
  }else{
    res.send("Wrong OTP!")
    .status(401);
    return ;
  }
}

const registerUser = async(req, res)=>{
  const {username, email, cityname, password, phone} = req.body

  if([username, email, cityname, password].some((field)=> field?.trim()==='') ){
    return res.status(400).json('Please fill all fields');
  }
  console.log(username)
  console.log(email)
  const exixtingUser = await User.findOne({
    $or:[{username}, {email}]
  });
  console.log(exixtingUser)

  if(exixtingUser) {
    return res.status(402).json('user already exit')
  }

  const user = await User.create({
    username:  username.toLowerCase(),
    cityname: cityname,
    email:email.toLowerCase(),
    phone: verifiedPhoneNumber||phone,
    password: password
  })

  const token = user.generateToken()

  const createdUser = await User.findById(user._id)
  createdUser.token = token
  return res.status(201)
  .json({createdUser,token: token})
}

const loginUser = async(req, res)=>{
  const {email, username, password} = req.body;
  if(!(username||email)){
    return res
    .status(401)
    .json({"enter username  or email" : "Oops!"})
  }
  const user = await User.findOne({
    $or: [{username},{email}]
  })
  if(!user){
    res.status(401).json("user not found")
  }
  const databasePassword =  user.password
   const validatePassword = await isPasswordCorrected(password,databasePassword)
  console.log(typeof validatePassword);
  console.log( validatePassword);


  if(!validatePassword ){
    return  res.status(401).json("Wrong Password!")
  }

  const token = user.generateToken();
  const option = {
    httpOnly: true,
    secure: true
}
return  res.status(200)
.cookie('token', token ,option)
.json({
  "message":"Logged in successfully",
  "token" : token
})
}

const logoutUser = async(req, res)=>{


}

export  {
  verifyMobile,
  verifyOTP,
  registerUser,
  loginUser
};




