const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
const {todoRouter}=require("./routes/todo")
app.use("/todo",todoRouter);
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT);
    console.log("connected");
}
main();