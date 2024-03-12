import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new  Schema({
    //username
    //full name
    //mail
    //phone no.
    username:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    cityname: {
        type: String,
        required: true,
        maxlength: 16,
        trim: true
    },
    email: {
        type:String,
        require:true,
        unique: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,       
    },
    token:{
        type: String
    }
    
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password ,10);
    next();
})


userSchema.methods.generateToken = function(){
    return jwt.sign({
        _id: this._id,
        username: this.username
    },
    process.env.TOKEN_SECRET,
    {
        expiresIn: process.env.TOKEN_EXPIRY
    })
}
export const User = mongoose.model('UserDetails',userSchema);