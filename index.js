import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import userRouter from "./src/routes/user.route.js";
import { DatabaseConnect } from "./src/configs/db.config.js";
import cookieParser from "cookie-parser";
 
//environment viriable setup
dotenv.config({ path: "./config.env" });

//database connction
DatabaseConnect();

//middlewares
app.use(cors());
app.use(cookieParser());

//static file serve
app.use(express.static(dirname(fileURLToPath(import.meta.url)) + "/public"));
//app.use(express.static("public"));

//router code here
app.use("/user", userRouter);

//create server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is running on.." + PORT);
});
