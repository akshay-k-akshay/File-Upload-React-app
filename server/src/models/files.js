const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String },
    path: { type: String },
    uploadedBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Files = mongoose.model("Files", schema);

module.exports = { Files };
