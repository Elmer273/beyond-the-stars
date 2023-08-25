import mongoose from "mongoose";

const URL = 'mongodb://localhost:27017/db';

async function connectDB () {
   try {
      mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB using Mongoose');
   } catch (err) {
      console.error('Error connecting to MongoDB using Mongoose', err);
      process.exit(1);
   }
}

export default connectDB;