 import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

 const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 3,
            maxLength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLenght: 50,
        }
        
    },
    {timestamps: true}

 )

 //befor saving the user, hash the password
 userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    
});


//method to compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


export const User = mongoose.model("User", userSchema);
