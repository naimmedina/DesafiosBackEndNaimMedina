import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true, 
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

userSchema.pre("find", function () {
  this.populate("products.product");
});

export const userModel = mongoose.model(userCollection, userSchema);
