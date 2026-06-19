import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const AlumniSchema = new Schema({
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true, 
    },
    password:{
        type:String,
        required:true,
    },
    graduationYear: {
        type: Number,
        required: true,
        min: 1900, // Set a reasonable lower bound
        max: new Date().getFullYear(), // Current year as the upper bound
      },
      fieldOfStudy: {
        type: String,
        required: true,
        trim: true,
      },
      degree:{
        type: String,
        trim: true,
      },
      currentJobTitle: {
        type: String,
        trim: true,
      },
      currentLocation: {
        type: String,
        trim: true,
      },
    profilePicture: {
        type:String, // cloudinary url
        required:true
    },
    cloudinaryPublic_id:{
        type:String
    },
    refreshToken:{
        type:String
    }
    
},{timestamps:true})

AlumniSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

AlumniSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

AlumniSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
AlumniSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
AlumniSchema.index({ fullname: "text", email: "text", fieldOfStudy: "text" });


export const Alumni = mongoose.model('Alumni',AlumniSchema)
