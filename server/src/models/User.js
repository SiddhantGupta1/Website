const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your Name"],
      trim: true,
      min: 3,
      max: 30,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },

    mobile_number: {
      type: Number,
    },

    role: {
      type: String,
      enum: ["user", "admin", "super-admin"],
      default: "user",
    },

    hash_password: {
      type: String,
      required: [true, "Please provide your Password"],
    },

    token: {
      type: String,
    },

    address: [
      {
        details: { type: String },
        for: { type: String },
      },
    ],

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const maxAge = 3 * 24 * 60 * 60;
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), role: user.role },
    process.env.SECRET_KEY,
    {
      expiresIn: maxAge, // here maxAge is in milliseconds ie maxAge is 3 hrs
    }
  );
  user.token = token;
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("No User Found");
  }

  const isMatch = await bcrypt.compare(password, user.hash_password);

  if (!isMatch) {
    throw new Error("Unable to Login");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("hash_password")) {
    user.hash_password = await bcrypt.hash(user.hash_password, 8);
  }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
