import express from "express";
import cors from "cors";
import "dotenv/config";
import * as dbconnection from "./config/connectDB.js";
import AuthRouter from "./routes/v1/auth.routes.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Server running successfully!");
});
app.use("/api/v1/auth", AuthRouter);
app.use("*", (req, res) => {
    res.status(404).send("404! Page not found");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
