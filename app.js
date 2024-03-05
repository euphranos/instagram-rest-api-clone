const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const connectDatabase = require("./config/dbConnection");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
connectDatabase();

app.use("/users", userRouter);
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
