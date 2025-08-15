import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface User {
    name: string;
    _id?:mongoose.Types.ObjectId;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}


const UserSchema = new mongoose.Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},{
    timestamps:true
});

UserSchema.pre("save",async function(next){
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

const User = mongoose.models?.UserSchema || mongoose.model<User>("User", UserSchema);

export default User;
