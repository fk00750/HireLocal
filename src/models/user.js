const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: Number, default: 0, required: true },
  email: { type: String, default: "", unique: true },
  mobile: { type: Number, default: "", unique: true },
  aadharNumber: { type: Number, default: "" },
  password: { type: String, required: true },
  is_email_verified: { type: Boolean, default: false },
  is_mobile_verified: { type: Boolean, default: false },
  is_aadhar_verified: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
