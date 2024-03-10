import express from "express";
import path from "path";
// routes
import songs from "./routers/songs.route";
import auth from "./routers/auth.route";

const app = express();

// set ejs for admin pages
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.json());

// songs api
app.use("/api", songs);
app.use("/api", auth);

export default app;
