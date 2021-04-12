const mongoose = require("mongoose");

const Image = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  url: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("image", Image);
