import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
   firstName: {
      type: String,
      required: true,
      min: 2,
      max: 30
   },

   lastName: {
      type: String,
      required: true,
      min: 2,
      max: 30
   },

   friends: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
   }],

   email: {
      type: String,
      required: true,
      unique: true
   },

   password: {
      type: String,
      required: true,
      min: 5
   },

   picturePath: {
      type: String,
      default: '',
   },

   location: String,
   occupation: String,
}, 
{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
