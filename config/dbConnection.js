const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.CONNECTION_STRING,
      {}
    );
    console.log(`Database connected on ${connection.connection.name}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
