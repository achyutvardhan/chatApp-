const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id_no: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // role:{
  //   type: String,
  //   default : "user"
  // },
  token: {
    type: String,
  },
  // Add other relevant user fields here
});

//passcode database
const passcode = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    require: true,
  },
  code_type: {
    type: String,
    enum: ["reset", "verify"],
    require: true,
  },
  expiration: {
    type: Number,
    require: true,
  },
});

// UserDetails Schema
const userDetailsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  phone_no: {
    type: Number,
    required: true,
  },
  // Add other relevant user details fields here
});

// Message Schema
const messageSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
const UserDetails = mongoose.model("UserDetails", userDetailsSchema);
const Message = mongoose.model("Message", messageSchema);
const Passcode = mongoose.model("Passcode", passcode);
// Create models based on the schemas
module.exports = {
  User,
  UserDetails,
  Message,
  Passcode,
};
