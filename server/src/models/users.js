const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    isAdmin: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Users = mongoose.model("Users", schema);

module.exports = { Users };
