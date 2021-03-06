//MongoDB connection

const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("Database Connected...");
  } catch (err) {
    console.error(err.message);
    //Exit Process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
