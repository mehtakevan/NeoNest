const mongoose = require("mongoose");

// Define Aadhaar schema
const AadhaarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  age: { type: Number, required: true, min: 0 },
  email: { type: "String", unique: true, required: true },
  aadharNumber: { type: String, unique: true, required: true },
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

// Create and export Aadhaar model
const Aadhaar = mongoose.model("Aadhaar", AadhaarSchema);

module.exports = Aadhaar;
