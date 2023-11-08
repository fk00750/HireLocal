const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, unique: true },
  mobile: { type: Number, unique: true },
  aadharNumber: { type: Number, default: "" },
  password: { type: String, required: true },
  is_email_verified: { type: Boolean, default: false },
  is_mobile_verified: { type: Boolean, default: false },
  is_aadhar_verified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
