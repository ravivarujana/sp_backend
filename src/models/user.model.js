import mongoose, { Schema } from "mongoose";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      /* If we want to make any field searchable in most optimized way we can make the index of that field true */
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      /* ***** */
      index: true,
    },
    avatar: {
      type: String, //claudinary URL
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      /* Giving custom error along with required field */
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

/* Encrypting password before saving it inside the document */
/* Do not user arrow function here as a callback as we have to maintain the context to the userSchema */
/* A context to the userSchema must have been set explicitly inside the callback function provided to the pre hook, either using call or apply */
userSchema.pre("save", async function (next) {
  /* Checking if the password field has been modified or not, we do not want to call this on any other field update */
  if (!this.isModified("password")) return next();
  /* Setting the encrypted password here - this will be saved in the mongo */
  this.password = await hash(this.password, 10);
  next();
});

/*Will use this method to check password when the user enters it -- checking password */
userSchema.methods.checkPassword = async function (password) {
  return await compare(password, this.password);
};

/* Method to generate the access token */
/* No need to make this method async - as the process in this method works preety fast */
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this_id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this_id,
    },
    process.env.REFRESH_SECRET_SECRET,
    {
      expiresIn: process.env.REFRESH_SECRET_EXPIRY,
    }
  );
};
/* Method to generate the refresh token */

export const User = mongoose.model("User", userSchema);
