import express from "express";
import path from "path";
import cors from "cors";
import env from "dotenv";
import cookieParser from "cookie-parser";

env.config();

// routes
import songs from "./routers/songs.route";
import auth from "./routers/auth.route";
import users from "./routers/user.route";

const app = express();

// set ejs for admin pages
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", songs);
app.use("/api", auth);
app.use("/api", users);

export default app;
