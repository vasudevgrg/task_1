const express= require("express");
const app= express();
const db= require("./models/index");
const cors= require("cors");
const { uploadMiddleware } = require("./middleware/multer");
const userRouter= require("./routes/user");

app.use(cors());
app.use(express.json());
app.use("/image", express.static("uploads"));
app.use("/", userRouter);

app.listen(5002, ()=>console.log("listening to 5002"));