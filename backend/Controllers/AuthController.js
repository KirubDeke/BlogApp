const User = require('../Models/UserModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already Exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', {
      expiresIn: '1h',
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check the user's role
    if (user.role === 'author') {
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, role: user.role }, 'your_secret_key', {
        expiresIn: '1h',
      });

      // Return the token and user role
      return res.json({ token, role: user.role });
    } else if (user.role === 'admin') {
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, role: user.role }, 'your_secret_key', {
        expiresIn: '1h',
      });

      // Return the token and user role
      return res.json({ token, role: user.role });
    } else {
      // For other user roles, return an error
      return res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a new admin (only accessible to existing admins)
exports.adminRegistration = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { name, email, password } = req.body;
    const user = new User({ name, email, password, role: 'admin' });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetching admin only
exports.findAdmin = async (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const users = await User.find({ role: 'admin' });
  res.json(users);
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findById(req.user.id);
  if (user && user.role === 'admin') {
    req.user.role = 'admin';
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};
exports.usersList = async(req, res)=>{
  try{
    const users = await User.find({}, {_id:1, username:1, email:1, role:1});
    res.json(users);
  }catch(error){
    res.status(500).json({message: error.message});
  }
};

exports.deleteUser = async(req, res)=>{
  try{
      const user = await User.findByIdAndDelete(req.params.id);
      if(!user){
        return res.status(404).json({message: 'User not found'})
      }
      res.json({message: 'User Deleted'});
  }catch(error){
     res.status(500).json({message:err.message});

  }
};

exports.updateUserRole = async(req, res)=>{
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Find the user by ID and update the role
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Error updating user role' });
  }
};
// fetching username and role
exports.UserNameAndRole = async(req, res)=>{
  try{
    const userId = req.params.userId;
    const user = await User.findById(userId, {username: 1, role: 1});
    if(!user){
      return res.status(404).json({error: 'User not found'});
    }
    res.json({ name: user.username, role: user.role });
  }catch(error){
    console.error('Error fetching username and role:', error);
    res.status(500).json({ error: 'Error fetching username and role' });
  }
};