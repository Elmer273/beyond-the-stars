import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db/models/User';

const register = async (req, res) => {
   try {
      const {
         firstName,
         lastName,
         friends,
         email,
         password,
         picturePath,
         location,
         occupation
      } = req.body;

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const user = new User({
         firstName,
         lastName,
         friends,
         email,
         password: passwordHash,
         picturePath,
         location,
         occupation
      });
      
      const savedUser = await user.save();
      res.status(201).json(savedUser);
   } catch (err) {
      res.status(201).json({error: err.message});
   }
};

const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({email: email});
      if(!user) 
         return res.status(400).json({msg: 'User does not exist'});

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) 
         return res.status(400).json({msg: 'Incorrect password'});

      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({token,user});

   } catch (err) {
      res.status(500).json({error: err.message});
   }
};

export default {
   register,
   login
};