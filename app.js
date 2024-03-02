const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const connectDatabase = require("./config/dbConnection");
const userRouter = require("./routes/userRouter");

const PORT = process.env.PORT || 3000; // PORT değişkenini tanımla

app.use(morgan("dev"));
app.use(express.json());
connectDatabase();

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
