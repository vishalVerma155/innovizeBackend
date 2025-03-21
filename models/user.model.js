const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  referrerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
});

const User = mongoose.model("User", UserSchema)
module.exports = User;
