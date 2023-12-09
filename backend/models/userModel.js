const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = mongoose.Schema({
  id: { type: Number },
  userName: { type: String },
  password: { type: "String", required: true },
  age: { type: Number },
  email: { type: "String", unique: true, required: true },
  contact: {
    type: String, // Assuming your contact number is stored as a string
    unique: true,
    required: true,
    validate: {
      validator: function (value) {
        // Check if the value has exactly 10 digits
        return /^\d{10}$/.test(value);
      },
    },
  },
  panNumber: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (value) {
        // PAN card number validation
        // Format: ABCDE1234F (5 uppercase letters, 4 digits, 1 uppercase letter)
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
      },
    },
  },
});

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = mongoose.model("User", userModel);

module.exports = Users;
