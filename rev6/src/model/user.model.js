const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "Username is alredy exist"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is alredy exist"],
  },
  password: {
    type: String,
    required: [true, "Password is requires"],
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/qo7rvxny5/default.webp?updatedAt=1787501023310",
  },
});

const userModel = mongoose.model("users",userSchema)

module.exports = userModel
